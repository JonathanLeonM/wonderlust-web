"use client";

// Wonderlust · Formulario Visa Estados Unidos
// Ubicación sugerida en tu app Next.js: app/visa-usa/page.tsx
// Requiere: geo-datos.js (o .ts) en la misma carpeta y /logo-wonderlust.png en /public
// Configura SHEETS_WEBHOOK con la URL /exec de tu Apps Script.

import { useMemo, useRef, useState } from "react";
import { COLOMBIA_GEO, WORLD_COUNTRIES } from "./geo-datos";

const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbwF4RVzXTe-rmAz54sue5kvbLUESVGBuVe6RZY7Si0zIZy6ys8ILuyxy7P8HrTPRrq8/exec";
const WOMPI = "https://checkout.wompi.co/l/WadHBw";
const WA = "https://wa.me/573134883629";
const LOGO = "/logo-wonderlust.png";

const NAVY = "#12325c";
const BLUE = "#2f6fb0";
const GOLD = "#e8b323";
const INK = "#16283f";
const MUTED = "#5d7189";
const ERR = "#c0392b";

const EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "outlook.es", "yahoo.com", "yahoo.es", "icloud.com", "live.com", "hotmail.es"];
const ESTADO_CIVIL = ["Soltero(a)", "Casado(a)", "Unión libre", "Separado(a)", "Divorciado(a)", "Viudo(a)"];
const REDES = ["Instagram", "Facebook", "X (Twitter)", "TikTok", "LinkedIn", "YouTube", "Snapchat", "Pinterest", "Otra", "No tengo"];
const REDES_PH: Record<string, string> = {
  Facebook: "Nombre y apellido tal como apareces",
  LinkedIn: "Nombre y apellido o enlace de tu perfil",
  YouTube: "Nombre del canal",
  Otra: "Red y usuario",
  "No tengo": "—",
};

type Data = Record<string, any>;
type Sub = { k: string; l: string; t?: string; ph?: string; span?: string; alpha?: boolean };
type Field = {
  k: string; l?: string; t?: string; req?: boolean; ph?: string; help?: string; span?: string;
  opts?: string[]; optsKind?: string; def?: string; resets?: string[]; alpha?: boolean; none?: boolean;
  sub?: any; max?: number; addLabel?: string; itemLabel?: string;
  geo?: { level: "depto" | "ciudad"; pais: string; depto?: string };
  showIf?: (d: Data) => boolean;
};

const esSepDiv = (d: Data) => d.estadoCivil === "Separado(a)" || d.estadoCivil === "Divorciado(a)";
const esViudo = (d: Data) => d.estadoCivil === "Viudo(a)";
const tienePareja = (d: Data) => d.estadoCivil === "Casado(a)" || d.estadoCivil === "Unión libre";

const SECTIONS: { tab: string; title: string; sub: string; fields: Field[] }[] = [
  {
    tab: "Datos",
    title: "Datos personales",
    sub: "Escríbelos exactamente como aparecen en tu pasaporte.",
    fields: [
      { k: "correo", l: "Correo electrónico", t: "email", req: true, ph: "tunombre@gmail.com", span: "1/-1" },
      { k: "nombres", l: "Nombres", req: true, alpha: true, ph: "Como en el pasaporte" },
      { k: "apellidos", l: "Apellidos", req: true, alpha: true, ph: "Como en el pasaporte" },
      { k: "otrosNombres", l: "Otros nombres o apellidos usados antes", help: "Apellido de soltera, correcciones de registro. Si no aplica, toca “Ninguno”.", req: true, none: true, alpha: true, ph: "Escribe el nombre o apellido", span: "1/-1" },
      { k: "documento", l: "Número de documento", help: "Cédula de ciudadanía o tarjeta de identidad.", req: true, t: "num", ph: "1023456789" },
      { k: "fechaNacimiento", l: "Fecha de nacimiento", req: true, t: "date" },
      { k: "paisNacimiento", l: "País de nacimiento", req: true, t: "select", optsKind: "paises", def: "Colombia", resets: ["deptoNacimiento", "ciudadNacimiento"] },
      { k: "deptoNacimiento", l: "Departamento / Estado de nacimiento", req: true, t: "geo", geo: { level: "depto", pais: "paisNacimiento" }, resets: ["ciudadNacimiento"], ph: "Departamento / Estado" },
      { k: "ciudadNacimiento", l: "Ciudad de nacimiento", req: true, t: "geo", geo: { level: "ciudad", pais: "paisNacimiento", depto: "deptoNacimiento" }, ph: "Ciudad" },
      { k: "estadoCivil", l: "Estado civil", req: true, t: "choice", opts: ESTADO_CIVIL, span: "1/-1" },

      { k: "_hExp", t: "head", l: "Sobre tu ex pareja", help: "Solo porque marcaste separado(a) o divorciado(a).", span: "1/-1", showIf: esSepDiv },
      { k: "exNombre", l: "Nombres y apellidos de la ex pareja", req: true, alpha: true, showIf: esSepDiv, span: "1/-1" },
      { k: "exFechaNac", l: "Fecha de nacimiento de la ex pareja", t: "date", req: true, showIf: esSepDiv },
      { k: "exLugarNac", l: "Lugar de nacimiento de la ex pareja", req: true, ph: "Ciudad, país", showIf: esSepDiv },
      { k: "exNotaria", l: "Notaría o juzgado del divorcio", req: true, ph: "Notaría 5 de Cali", showIf: esSepDiv, span: "1/-1" },
      { k: "exFechaMatrimonio", l: "Fecha del matrimonio", t: "date", req: true, showIf: esSepDiv },
      { k: "exFechaSeparacion", l: "Fecha de la separación legal", t: "date", req: true, showIf: esSepDiv },

      { k: "_hViudo", t: "head", l: "Sobre tu cónyuge fallecido(a)", help: "Solo porque marcaste viudo(a).", span: "1/-1", showIf: esViudo },
      { k: "falNombre", l: "Nombres y apellidos", req: true, alpha: true, showIf: esViudo, span: "1/-1" },
      { k: "falFechaNac", l: "Fecha de nacimiento del cónyuge fallecido", t: "date", req: true, showIf: esViudo },
      { k: "falLugarNac", l: "Lugar de nacimiento del cónyuge fallecido", req: true, ph: "Ciudad, país", showIf: esViudo },
    ],
  },
  {
    tab: "Contacto",
    title: "Contacto y residencia",
    sub: "El consulado revisa tu huella digital de los últimos 5 años. Sé lo más completo posible.",
    fields: [
      { k: "paisResidencia", l: "País de residencia", req: true, t: "select", optsKind: "paises", def: "Colombia", resets: ["deptoResidencia", "ciudadResidencia"] },
      { k: "deptoResidencia", l: "Departamento / Estado", req: true, t: "geo", geo: { level: "depto", pais: "paisResidencia" }, resets: ["ciudadResidencia"], ph: "Departamento / Estado" },
      { k: "ciudadResidencia", l: "Ciudad", req: true, t: "geo", geo: { level: "ciudad", pais: "paisResidencia", depto: "deptoResidencia" }, ph: "Ciudad" },
      { k: "direccionResidencia", l: "Dirección de residencia", req: true, ph: "Cra 45 #12-34, apto 302" },
      { k: "barrio", l: "Barrio", req: true, ph: "Granada" },
      { k: "telefonoResidencia", l: "Teléfono de residencia", req: true, t: "tel", ph: "6025551234" },
      { k: "celulares", l: "Números de celular de los últimos 5 años", help: "Empieza por el actual. Puedes agregar hasta 5.", req: true, t: "multi", sub: "tel", max: 5, addLabel: "Agregar otro número", ph: "3101234567", span: "1/-1" },
      { k: "correosPrevios", l: "Correos electrónicos de los últimos 5 años", help: "Todos los que hayan estado a tu nombre. Hasta 5.", req: true, t: "multi", sub: "email", max: 5, addLabel: "Agregar otro correo", ph: "tunombre@gmail.com", span: "1/-1" },
      { k: "redesSociales", l: "Redes sociales", help: "Elige la red y escribe tu usuario tal como apareces registrado. Hasta 5.", req: true, t: "social", max: 5, addLabel: "Agregar otra red", span: "1/-1" },
    ],
  },
  {
    tab: "Tu viaje",
    title: "Tu viaje a Estados Unidos",
    sub: "Si aún no tienes fechas definitivas, pon una estimación: el formulario la exige y luego se puede ajustar.",
    fields: [
      { k: "fechaViaje", l: "Fecha aproximada de viaje", req: true, t: "date" },
      { k: "duracionDias", l: "Duración del viaje (en días)", req: true, t: "num", ph: "15" },
      { k: "_hAloj", t: "head", l: "¿Dónde te vas a alojar?", help: "Casa de amigos o familiares, o un hotel acorde a tu capacidad económica. No necesitas reservar — solo tener los datos del lugar.", span: "1/-1" },
      { k: "alojNombre", l: "Nombre del alojamiento", req: true, ph: "Hampton Inn Miami / Casa de mi hermana", span: "1/-1" },
      { k: "alojDireccion", l: "Dirección con código postal", req: true, t: "area", ph: "1121 SW 1st Ave, Miami, FL 33130", span: "1/-1" },
      { k: "alojCiudad", l: "Ciudad del alojamiento", req: true, ph: "Miami" },
      { k: "alojTelefono", l: "Teléfono del alojamiento", req: true, t: "tel", ph: "+1 305 555 0100" },
      { k: "alojCorreo", l: "Correo del alojamiento", req: true, t: "email", ph: "info@hotel.com", span: "1/-1" },
      { k: "_hComp", t: "head", l: "Quién viaja y quién paga", span: "1/-1" },
      { k: "quienPaga", l: "¿Quién pagará el viaje?", req: true, t: "choice", opts: ["Yo", "Mi empresa", "Un familiar", "Otra persona"], def: "Yo", span: "1/-1" },
      { k: "quienPagaDatos", l: "Datos de quien paga tu viaje", help: "Nombres y apellidos, parentesco o empresa, celular y correo.", req: true, t: "area", span: "1/-1", showIf: (d) => d.quienPaga && d.quienPaga !== "Yo" },
      { k: "viajaSolo", l: "¿Viajas solo(a)?", req: true, t: "choice", opts: ["Sí", "No"], def: "Sí", span: "1/-1" },
      { k: "acompanantesNombres", l: "Personas con las que viajarás", help: "Nombres y apellidos completos, uno por línea.", req: true, t: "area", span: "1/-1", showIf: (d) => d.viajaSolo === "No" },
      { k: "acompanantesParentesco", l: "Parentesco con esas personas", req: true, ph: "Esposa e hijos", span: "1/-1", showIf: (d) => d.viajaSolo === "No" },
    ],
  },
  {
    tab: "Historial",
    title: "Historial con Estados Unidos",
    sub: "Responde con honestidad: el consulado ya tiene estos registros y las inconsistencias son la causa número uno de negación.",
    fields: [
      { k: "haVivido", l: "¿Has vivido en Estados Unidos?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "ssn", l: "Número de seguridad social (SSN)", req: true, span: "1/-1", showIf: (d) => d.haVivido === "Sí" },
      { k: "itin", l: "Número asignado para pago de impuestos (ITIN)", req: true, span: "1/-1", showIf: (d) => d.haVivido === "Sí" },
      { k: "licenciaUsa", l: "¿Has tenido licencia de conducción de Estados Unidos?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "licenciaNumero", l: "Número de la licencia y estado que la emitió", req: true, ph: "A123-456-78-901-0 · Florida", span: "1/-1", showIf: (d) => d.licenciaUsa === "Sí" },
      { k: "haViajado", l: "¿Has viajado antes a Estados Unidos?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "ultimosViajes", l: "Fecha y duración de tus últimos 5 viajes", help: "Uno por línea.", req: true, t: "area", ph: "Junio 2023 — 20 días", span: "1/-1", showIf: (d) => d.haViajado === "Sí" },
      { k: "visaPrevia", l: "¿Has tenido visa americana antes?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "visaNumero", l: "Número de la visa anterior", help: "Los 8 dígitos rojos en la parte inferior derecha de la visa.", req: true, t: "num", span: "1/-1", showIf: (d) => d.visaPrevia === "Sí" },
      { k: "visaFechaEmision", l: "Fecha de emisión de la visa anterior", t: "date", req: true, showIf: (d) => d.visaPrevia === "Sí" },
      { k: "visaFechaVencimiento", l: "Fecha de vencimiento de la visa anterior", t: "date", req: true, showIf: (d) => d.visaPrevia === "Sí" },
      { k: "leNegaron", l: "¿Alguna vez te han negado una visa?", req: true, t: "choice", opts: ["Sí", "No"], span: "1/-1" },
      { k: "visaNegadaDetalle", l: "Fecha de la negación y tipo de visa negada", req: true, ph: "Marzo 2018 · Visa B1/B2", span: "1/-1", showIf: (d) => d.leNegaron === "Sí" },
      { k: "procesoResidencia", l: "¿Alguien ha iniciado un proceso de residencia a tu nombre?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "procesoResidenciaDetalle", l: "Nombres, apellidos, parentesco y número del proceso", req: true, t: "area", span: "1/-1", showIf: (d) => d.procesoResidencia === "Sí" },
      { k: "roboPasaporte", l: "¿Alguna vez te robaron o perdiste un pasaporte?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "roboPasaporteDetalle", l: "Fecha y lugar del robo o pérdida", req: true, ph: "Mayo 2021, Bogotá", span: "1/-1", showIf: (d) => d.roboPasaporte === "Sí" },
      { k: "tieneContactosUsa", l: "¿Tienes familiares o amigos en Estados Unidos?", req: true, t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "contactosUsa", l: "Datos de esos familiares o amigos", help: "Nombres y apellidos, estatus migratorio, dirección, ciudad, teléfono y correo. Uno por línea.", req: true, t: "area", span: "1/-1", showIf: (d) => d.tieneContactosUsa === "Sí" },
    ],
  },
  {
    tab: "Familia",
    title: "Tu familia",
    sub: "Datos de tus padres y, si aplica, de tu cónyuge.",
    fields: [
      { k: "_hPadre", t: "head", l: "Padre", span: "1/-1" },
      { k: "padreNombres", l: "Nombres del padre", req: true, alpha: true },
      { k: "padreApellidos", l: "Apellidos del padre", req: true, alpha: true },
      { k: "padreFechaNac", l: "Fecha de nacimiento del padre", t: "date", req: true },
      { k: "padreNacionalidad", l: "Nacionalidad del padre", req: true, alpha: true, def: "Colombiana", ph: "Colombiana" },
      { k: "_hMadre", t: "head", l: "Madre", span: "1/-1" },
      { k: "madreNombres", l: "Nombres de la madre", req: true, alpha: true },
      { k: "madreApellidos", l: "Apellidos de la madre", req: true, alpha: true },
      { k: "madreFechaNac", l: "Fecha de nacimiento de la madre", t: "date", req: true },
      { k: "madreNacionalidad", l: "Nacionalidad de la madre", req: true, alpha: true, def: "Colombiana", ph: "Colombiana" },
      { k: "_hConyuge", t: "head", l: "Cónyuge", help: "Solo porque indicaste que estás casado(a) o en unión libre.", span: "1/-1", showIf: tienePareja },
      { k: "conyugeNombre", l: "Nombres y apellidos del cónyuge", req: true, alpha: true, span: "1/-1", showIf: tienePareja },
      { k: "conyugeLugarNac", l: "Lugar de nacimiento del cónyuge", req: true, ph: "Ciudad, país", showIf: tienePareja },
      { k: "conyugeFechaNac", l: "Fecha de nacimiento del cónyuge", t: "date", req: true, showIf: tienePareja },
    ],
  },
  {
    tab: "Trabajo",
    title: "Trabajo y estudios",
    sub: "Tu arraigo laboral y académico es lo que más peso tiene en la entrevista.",
    fields: [
      { k: "profesion", l: "Profesión u ocupación", req: true, alpha: true, ph: "Ingeniera civil", span: "1/-1" },
      { k: "_hEmpresa", t: "head", l: "Empresa donde trabajas actualmente", help: "Si eres independiente, pon los datos de tu negocio o actividad.", span: "1/-1" },
      { k: "empresaNombre", l: "Nombre de la empresa", req: true, span: "1/-1" },
      { k: "empresaDireccion", l: "Dirección de la empresa", req: true, t: "area", span: "1/-1" },
      { k: "empresaTelefono", l: "Teléfono de la empresa", req: true, t: "tel", ph: "6025551234" },
      { k: "empresaFechaIngreso", l: "Fecha de ingreso a la empresa", t: "date", req: true },
      { k: "empresaCargo", l: "Cargo que ocupas", req: true, ph: "Directora de proyectos" },
      { k: "empresaIngreso", l: "Ingreso mensual", req: true, t: "num", ph: "6500000" },
      { k: "empresaLabores", l: "Labores que realizas", req: true, t: "area", ph: "Supervisión de obra, control de presupuesto y manejo de proveedores", span: "1/-1" },
      { k: "_hAnteriores", t: "head", l: "Experiencia de los últimos 5 años", help: "Debes dejar los trabajos, negocios o pensión de los últimos 5 años, además del actual. Agrega hasta 5. Si tu trabajo actual es el único de estos 5 años, déjalo vacío.", span: "1/-1" },
      {
        k: "empleosPrevios", l: "Trabajos anteriores", t: "group", max: 5, itemLabel: "Experiencia", addLabel: "¿Quieres agregar otra experiencia?", span: "1/-1",
        sub: [
          { k: "nombre", l: "Empresa o negocio", span: "1/-1" },
          { k: "direccion", l: "Dirección", span: "1/-1" },
          { k: "telefono", l: "Teléfono", t: "tel" },
          { k: "cargo", l: "Cargo que ocupaste" },
          { k: "jefe", l: "Jefe inmediato", alpha: true },
          { k: "ingreso", l: "Fecha de ingreso", t: "date" },
          { k: "retiro", l: "Fecha de retiro", t: "date" },
          { k: "labores", l: "Labores que realizabas", t: "area", span: "1/-1" },
        ] as Sub[],
      },
      { k: "_hEstudios", t: "head", l: "Estudios", help: "Universidad o instituto. Si no terminaste estudios superiores, pon el colegio donde hiciste secundaria.", span: "1/-1" },
      { k: "institucionNombre", l: "Nombre de la institución", req: true, span: "1/-1" },
      { k: "institucionDireccion", l: "Dirección de la institución", req: true, t: "area", span: "1/-1" },
      { k: "institucionTelefono", l: "Teléfono de la institución", req: true, t: "tel" },
      { k: "carrera", l: "Carrera o curso realizado", req: true, ph: "Ingeniería civil" },
      { k: "estudioFechaIngreso", l: "Fecha de ingreso a la institución", t: "date", req: true },
      { k: "estudioFechaGrado", l: "Fecha de graduación", t: "date", req: true },
      { k: "_hOtros", t: "head", l: "Otros datos", span: "1/-1" },
      { k: "paisesVisitados", l: "Países que has visitado en los últimos 5 años", req: true, t: "chips", span: "1/-1" },
      { k: "idiomas", l: "Idiomas que hablas y escribes, con tu nivel", req: true, t: "area", ph: "Español nativo · Inglés B1", span: "1/-1" },
      { k: "prestoMilitar", l: "¿Prestaste servicio militar?", t: "choice", opts: ["Sí", "No"], def: "No", span: "1/-1" },
      { k: "militarDetalle", l: "Institución, fechas de ingreso y terminación, y rango", req: true, t: "area", ph: "Ejército Nacional, 2010–2011, soldado regular", span: "1/-1", showIf: (d) => d.prestoMilitar === "Sí" },
    ],
  },
];

const allFields = () => SECTIONS.reduce<Field[]>((a, s) => a.concat(s.fields), []);

const ALPHA_RE = /[^A-Za-zÁÉÍÓÚáéíóúÜüÑñÀ-ÿ'’.\-\s]/g;
const cleanVal = (t: string | undefined, alpha: boolean | undefined, v: string) => {
  if (t === "num") return v.replace(/[^0-9]/g, "");
  if (t === "tel") return v.replace(/[^0-9+\-\s()]/g, "");
  if (alpha) return v.replace(ALPHA_RE, "");
  return v;
};

function defaultData(): Data {
  const d: Data = {};
  allFields().forEach((f) => {
    if (f.t === "note" || f.t === "head") return;
    if (f.t === "chips") d[f.k] = [];
    else if (f.t === "multi") d[f.k] = [""];
    else if (f.t === "social") d[f.k] = [{ red: "", usuario: "" }];
    else if (f.t === "group") d[f.k] = [];
    else d[f.k] = f.def || "";
  });
  return d;
}

const PAISES = ["Colombia", ...WORLD_COUNTRIES.filter((p: string) => p !== "Colombia")];
const DEPTOS = ["Bogotá D.C.", ...Object.keys(COLOMBIA_GEO).filter((k) => k !== "Bogotá D.C.")];

const inputStyle = (err?: boolean): React.CSSProperties => ({
  padding: "10px 13px", borderRadius: 10, border: `1.5px solid ${err ? ERR : "rgba(22,40,63,.2)"}`,
  background: "#fff", fontSize: 14, height: 44, width: "100%", fontFamily: "inherit", color: INK,
});
const areaStyle = (err?: boolean): React.CSSProperties => ({
  padding: "10px 13px", borderRadius: 10, border: `1.5px solid ${err ? ERR : "rgba(22,40,63,.2)"}`,
  background: "#fff", fontSize: 14, lineHeight: 1.45, minHeight: 44, resize: "vertical",
  overflow: "hidden", fontFamily: "inherit", color: INK, width: "100%",
});
const addBtn: React.CSSProperties = {
  alignSelf: "flex-start", padding: "8px 15px", borderRadius: 999, border: `1.5px dashed rgba(47,111,176,.5)`,
  background: "#fff", color: BLUE, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
};
const xBtn: React.CSSProperties = {
  flex: "0 0 auto", width: 34, height: 34, borderRadius: 999, border: "1px solid rgba(22,40,63,.18)",
  background: "#fff", color: "#8496a9", fontSize: 16, lineHeight: 1, cursor: "pointer",
};

export default function VisaUsaPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(defaultData);
  const [showError, setShowError] = useState(false);
  const [emailFocus, setEmailFocus] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [radicado, setRadicado] = useState("");
  const topRef = useRef<HTMLDivElement | null>(null);
  const blurT = useRef<any>(null);

  const isReview = step === SECTIONS.length;

  const visibleFields = (i: number) => (SECTIONS[i]?.fields || []).filter((f) => !f.showIf || f.showIf(data));

  const missing = useMemo(() => {
    if (isReview) return [] as string[];
    return visibleFields(step).filter((f) => {
      if (!f.req) return false;
      const v = data[f.k];
      if (f.t === "multi") return !(v || []).some((x: string) => String(x || "").trim());
      if (f.t === "social") return !(v || []).some((r: any) => r && r.red && (r.red === "No tengo" || String(r.usuario || "").trim()));
      return Array.isArray(v) ? v.length === 0 : !String(v || "").trim();
    }).map((f) => f.k);
  }, [data, step, isReview]);

  const bad = (k: string) => showError && missing.indexOf(k) !== -1;

  const scrollTop = () => {
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 24;
    window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
  };

  const go = (n: number) => { setStep(n); setShowError(false); setTimeout(scrollTop, 20); };
  const next = () => {
    if (!isReview && missing.length) { setShowError(true); setTimeout(scrollTop, 20); return; }
    go(Math.min(step + 1, SECTIONS.length));
  };

  const set = (k: string, v: any, resets?: string[]) =>
    setData((d) => { const nd = { ...d, [k]: v }; (resets || []).forEach((r) => (nd[r] = "")); return nd; });
  const setAt = (k: string, i: number, v: any) =>
    setData((d) => { const list = (d[k] || []).slice(); list[i] = v; return { ...d, [k]: list }; });
  const setSub = (k: string, i: number, sk: string, v: any) =>
    setData((d) => { const list = (d[k] || []).slice(); list[i] = { ...(list[i] || {}), [sk]: v }; return { ...d, [k]: list }; });
  const addRow = (k: string, blank: any, max: number) =>
    setData((d) => ((d[k] || []).length >= max ? d : { ...d, [k]: (d[k] || []).concat([blank]) }));
  const removeRow = (k: string, i: number, blank?: any) =>
    setData((d) => {
      const list = (d[k] || []).filter((_: any, j: number) => j !== i);
      return { ...d, [k]: list.length ? list : blank === undefined ? [] : [blank] };
    });
  const addChip = (k: string, v: string) =>
    setData((d) => {
      const list = (d[k] || []).filter((x: string) => x !== "Ninguno");
      return list.indexOf(v) !== -1 ? d : { ...d, [k]: list.concat([v]) };
    });

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.min(Math.max(el.scrollHeight, 44), 240) + "px";
  };

  const emailSuggest = (fk: string, raw: string, apply: (v: string) => void) => {
    if (emailFocus !== fk) return [];
    const val = String(raw || "").trim();
    if (!val) return [];
    const at = val.indexOf("@");
    const local = at === -1 ? val : val.slice(0, at);
    if (!local) return [];
    const typed = at === -1 ? "" : val.slice(at + 1).toLowerCase();
    return EMAIL_DOMAINS.filter((dm) => dm.indexOf(typed) === 0 && dm !== typed).slice(0, 5)
      .map((dm) => ({ label: `${local}@${dm}`, apply: () => apply(`${local}@${dm}`) }));
  };
  const focusProps = (fk: string) => ({
    onFocus: () => { clearTimeout(blurT.current); setEmailFocus(fk); },
    onBlur: () => { clearTimeout(blurT.current); blurT.current = setTimeout(() => setEmailFocus((c) => (c === fk ? "" : c)), 180); },
  });

  const geoOpts = (f: Field) => {
    const g = f.geo!;
    if (data[g.pais] !== "Colombia") return null;
    if (g.level === "depto") return DEPTOS;
    return (COLOMBIA_GEO as any)[data[g.depto!]] || [];
  };

  const buildPayload = (rad: string) => {
    const out: Data = { Marca: "Wonderlust", Tramite: "Visa Estados Unidos", Radicado: rad, FechaEnvio: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }) };
    // Nunca dejar que dos campos con la misma etiqueta compartan columna:
    // el segundo (normalmente vacío) borraría el valor del primero.
    const put = (label: string, val: any) => {
      let key = label;
      if (Object.prototype.hasOwnProperty.call(out, key)) {
        let n = 2;
        while (Object.prototype.hasOwnProperty.call(out, `${label} (${n})`)) n++;
        key = `${label} (${n})`;
      }
      out[key] = val;
    };
    allFields().forEach((f) => {
      if (f.t === "note" || f.t === "head") return;
      const v = data[f.k];
      const max = f.max || 5;
      if (f.t === "multi") {
        for (let i = 0; i < max; i++) put(`${f.l} ${i + 1}`, (v && v[i]) || "");
        return;
      }
      if (f.t === "social") {
        for (let i = 0; i < max; i++) {
          const r = (v || [])[i];
          put(`Red social ${i + 1}`, r && r.red ? r.red + (r.usuario ? `: ${r.usuario}` : "") : "");
        }
        return;
      }
      if (f.t === "group") {
        for (let i = 0; i < max; i++) {
          const it = (v || [])[i] || {};
          (f.sub as Sub[]).forEach((sf) => { put(`${f.itemLabel} ${i + 1} — ${sf.l}`, it[sf.k] || ""); });
        }
        return;
      }
      put(f.l as string, Array.isArray(v) ? v.join(", ") : v || "");
    });
    out.Dispositivo = typeof navigator !== "undefined" ? navigator.userAgent : "";
    return out;
  };

  const submit = () => {
    if (!consent) { setConsentError(true); return; }
    const rad = "WL-USA-" + Date.now().toString(36).slice(-5).toUpperCase();
    setRadicado(rad);
    setSubmitting(true);
    const done = () => { setSubmitting(false); setSubmitted(true); setTimeout(scrollTop, 20); };
    if (!SHEETS_WEBHOOK) { done(); return; }
    // XHR y no fetch: Apps Script /exec responde con 302 y fetch en no-cors pierde el body.
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", SHEETS_WEBHOOK, true);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
      xhr.onload = done;
      xhr.onerror = done;
      xhr.send(JSON.stringify(buildPayload(rad)));
    } catch { done(); }
  };

  const waSent = `${WA}?text=${encodeURIComponent(
    `Hola Wonderlust, soy ${`${(data.nombres || "").trim()} ${(data.apellidos || "").trim()}`.trim()}. Acabo de enviar mi formulario de visa a Estados Unidos (radicado ${radicado}).`
  )}`;

  const renderField = (f: Field) => {
    const t = f.t || "text";
    const err = bad(f.k);
    if (t === "head")
      return (
        <div key={f.k} style={{ gridColumn: f.span || "auto", marginTop: 10, paddingTop: 16, borderTop: "1px solid rgba(22,40,63,.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={LOGO} alt="" style={{ width: 17, height: "auto", opacity: 0.85, display: "block" }} />
            <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: BLUE }}>{f.l}</div>
          </div>
          {f.help && <div style={{ fontSize: 12.5, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{f.help}</div>}
        </div>
      );

    const geo = t === "geo" ? geoOpts(f) : null;
    const asSelect = t === "select" || (t === "geo" && geo !== null);
    const selOptions = t === "select" ? PAISES : geo || [];

    let control: React.ReactNode = null;

    if (asSelect) {
      control = (
        <select value={data[f.k] || ""} onChange={(e) => set(f.k, e.target.value, f.resets)}
          style={{ ...inputStyle(err), color: data[f.k] ? INK : "#9db0c4" }}>
          <option value="">{t === "geo" && geo && geo.length === 0 ? "Elige primero el departamento" : "Selecciona…"}</option>
          {selOptions.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    } else if (t === "area") {
      control = (
        <textarea rows={2} value={data[f.k] || ""} placeholder={f.ph}
          onChange={(e) => { autoGrow(e.target); set(f.k, e.target.value); }} style={areaStyle(err)} />
      );
    } else if (t === "choice") {
      control = (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(f.opts || []).map((o) => {
            const on = data[f.k] === o;
            return (
              <button key={o} type="button" onClick={() => set(f.k, o)}
                style={{ padding: "9px 17px", borderRadius: 999, border: `1.5px solid ${on ? NAVY : err ? ERR : "rgba(22,40,63,.2)"}`, background: on ? NAVY : "#fff", color: on ? "#fff" : "#44586e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {o}
              </button>
            );
          })}
        </div>
      );
    } else if (t === "chips") {
      const list: string[] = data[f.k] || [];
      control = (
        <div>
          {list.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 9 }}>
              {list.map((v) => (
                <span key={v} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999, background: NAVY, color: "#fff", fontSize: 12.5, fontWeight: 600 }}>
                  {v}
                  <button type="button" onClick={() => set(f.k, list.filter((x) => x !== v))}
                    style={{ border: "none", background: "none", color: "#7fb0dd", fontSize: 15, lineHeight: 1, cursor: "pointer", padding: 0 }}>×</button>
                </span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select value="" onChange={(e) => { if (e.target.value) addChip(f.k, e.target.value); }}
              style={{ ...inputStyle(err), flex: 1, minWidth: 170 }}>
              <option value="">+ Agregar país…</option>
              {PAISES.filter((p) => list.indexOf(p) === -1).map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button type="button" onClick={() => set(f.k, ["Ninguno"])}
              style={{ padding: "0 18px", height: 44, borderRadius: 10, border: "1.5px solid rgba(22,40,63,.2)", background: "#fff", color: "#44586e", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Ninguno</button>
          </div>
        </div>
      );
    } else if (t === "multi") {
      const list: string[] = data[f.k]?.length ? data[f.k] : [""];
      control = (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((val, i) => {
            const fk = `${f.k}:${i}`;
            const sug = f.sub === "email" ? emailSuggest(fk, val, (nv) => setAt(f.k, i, nv)) : [];
            return (
              <div key={i} style={{ position: "relative", display: "flex", gap: 8, alignItems: "center" }}>
                <input type={f.sub === "email" ? "email" : f.sub === "tel" ? "tel" : "text"}
                  inputMode={f.sub === "email" ? "email" : f.sub === "tel" ? "tel" : "text"}
                  value={val} placeholder={f.ph} autoComplete="off"
                  onChange={(e) => setAt(f.k, i, cleanVal(f.sub === "tel" ? "tel" : "text", false, e.target.value))}
                  {...(f.sub === "email" ? focusProps(fk) : {})}
                  style={{ ...inputStyle(err), height: 42 }} />
                {list.length > 1 && <button type="button" onClick={() => removeRow(f.k, i, "")} style={xBtn}>×</button>}
                {sug.length > 0 && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid rgba(22,40,63,.15)", borderRadius: 10, boxShadow: "0 8px 24px rgba(18,50,92,.16)", zIndex: 30, overflow: "hidden" }}>
                    {sug.map((s) => (
                      <div key={s.label} onMouseDown={(e) => { e.preventDefault(); s.apply(); setEmailFocus(""); }}
                        style={{ padding: "10px 13px", fontSize: 13.5, cursor: "pointer", borderBottom: "1px solid rgba(22,40,63,.06)" }}>{s.label}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {list.length < (f.max || 5) && (
            <button type="button" onClick={() => addRow(f.k, "", f.max || 5)} style={addBtn}>+ {f.addLabel}</button>
          )}
        </div>
      );
    } else if (t === "social") {
      const list: any[] = data[f.k]?.length ? data[f.k] : [{ red: "", usuario: "" }];
      control = (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <select value={r.red || ""} onChange={(e) => setSub(f.k, i, "red", e.target.value)}
                style={{ ...inputStyle(err), flex: "0 0 150px", height: 42, fontSize: 13.5, color: r.red ? INK : "#9db0c4" }}>
                <option value="">Red social…</option>
                {REDES.map((rd) => <option key={rd} value={rd}>{rd}</option>)}
              </select>
              <input type="text" value={r.usuario || ""} autoComplete="off"
                placeholder={REDES_PH[r.red] || "@tuusuario"}
                onChange={(e) => setSub(f.k, i, "usuario", e.target.value)}
                style={{ ...inputStyle(err), flex: 1, minWidth: 150, height: 42 }} />
              {list.length > 1 && <button type="button" onClick={() => removeRow(f.k, i, { red: "", usuario: "" })} style={xBtn}>×</button>}
            </div>
          ))}
          {list.length < (f.max || 5) && (
            <button type="button" onClick={() => addRow(f.k, { red: "", usuario: "" }, f.max || 5)} style={addBtn}>+ {f.addLabel}</button>
          )}
        </div>
      );
    } else if (t === "group") {
      const list: any[] = data[f.k] || [];
      control = (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.map((it, i) => (
            <div key={i} style={{ border: "1px solid rgba(22,40,63,.14)", borderRadius: "2px 18px 2px 18px", padding: "14px 15px", background: "#fbfcfe" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14, color: BLUE }}>{f.itemLabel} {i + 1}</div>
                <button type="button" onClick={() => removeRow(f.k, i)}
                  style={{ border: "1px solid rgba(22,40,63,.18)", background: "#fff", color: "#8496a9", fontSize: 11.5, fontWeight: 700, borderRadius: 999, padding: "5px 11px", cursor: "pointer" }}>Quitar</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "11px 13px" }}>
                {(f.sub as Sub[]).map((sf) => (
                  <div key={sf.k} style={{ gridColumn: sf.span || "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11.5, fontWeight: 700, color: "#44586e" }}>{sf.l}</label>
                    {sf.t === "area" ? (
                      <textarea rows={2} value={it[sf.k] || ""}
                        onChange={(e) => { autoGrow(e.target); setSub(f.k, i, sf.k, e.target.value); }}
                        style={{ ...areaStyle(), fontSize: 13.5, minHeight: 40, padding: "9px 12px" }} />
                    ) : (
                      <input type={sf.t === "date" ? "date" : sf.t === "tel" ? "tel" : "text"}
                        inputMode={sf.t === "tel" ? "tel" : "text"} value={it[sf.k] || ""} placeholder={sf.ph}
                        onChange={(e) => setSub(f.k, i, sf.k, cleanVal(sf.t || "text", sf.alpha, e.target.value))}
                        style={{ ...inputStyle(), height: 40, fontSize: 13.5, padding: "9px 12px" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {list.length < (f.max || 5) && (
            <button type="button" onClick={() => addRow(f.k, {}, f.max || 5)} style={{ ...addBtn, padding: "9px 17px" }}>+ {f.addLabel}</button>
          )}
        </div>
      );
    } else {
      const sug = t === "email" ? emailSuggest(f.k, data[f.k], (nv) => set(f.k, nv)) : [];
      control = (
        <div style={{ position: "relative", display: "flex", gap: 8, alignItems: "center" }}>
          <input type={t === "date" ? "date" : t === "email" ? "email" : t === "tel" ? "tel" : "text"}
            inputMode={t === "num" ? "numeric" : t === "tel" ? "tel" : t === "email" ? "email" : "text"}
            value={data[f.k] || ""} placeholder={f.ph} autoComplete="off"
            onChange={(e) => set(f.k, cleanVal(t, f.alpha, e.target.value), f.resets)}
            {...(t === "email" ? focusProps(f.k) : {})}
            style={inputStyle(err)} />
          {f.none && (
            <button type="button" onClick={() => set(f.k, "Ninguno")}
              style={{ flex: "0 0 auto", height: 44, padding: "0 14px", borderRadius: 10, border: "1.5px solid rgba(22,40,63,.2)", background: "#fff", color: "#44586e", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Ninguno</button>
          )}
          {sug.length > 0 && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid rgba(22,40,63,.15)", borderRadius: 10, boxShadow: "0 8px 24px rgba(18,50,92,.16)", zIndex: 30, overflow: "hidden" }}>
              {sug.map((s) => (
                <div key={s.label} onMouseDown={(e) => { e.preventDefault(); s.apply(); setEmailFocus(""); }}
                  style={{ padding: "10px 13px", fontSize: 13.5, cursor: "pointer", borderBottom: "1px solid rgba(22,40,63,.06)" }}>{s.label}</div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={f.k} style={{ gridColumn: f.span || "auto", display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: err ? ERR : INK, lineHeight: 1.4 }}>
          {f.l}{f.req ? " *" : ""}
        </label>
        {f.help && <div style={{ fontSize: 11.5, color: "#6b7f96", lineHeight: 1.45, marginTop: -2 }}>{f.help}</div>}
        {control}
      </div>
    );
  };

  const reviewValue = (f: Field) => {
    const v = data[f.k];
    if (f.t === "multi") return (v || []).filter((x: string) => String(x || "").trim()).join(" · ");
    if (f.t === "social") return (v || []).filter((r: any) => r?.red).map((r: any) => r.red + (r.usuario ? `: ${r.usuario}` : "")).join(" · ");
    if (f.t === "group") return (v || []).map((it: any, i: number) => `${f.itemLabel} ${i + 1}: ${[it?.nombre, it?.cargo].filter(Boolean).join(" — ")}`).join("  |  ");
    return Array.isArray(v) ? v.join(", ") : String(v || "");
  };

  const section = SECTIONS[step] || SECTIONS[0];

  return (
    <main style={{ minHeight: "100vh", background: "#eaf0f7", padding: "clamp(20px,5vw,56px) 16px", display: "flex", justifyContent: "center", fontFamily: "'Karla',system-ui,sans-serif", color: INK }}>
      <div style={{ width: "100%", maxWidth: 840 }} ref={topRef}>

        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 11, letterSpacing: ".34em", color: "#c69214", fontWeight: 700, marginBottom: 10 }}>WONDERLUST · AGENCIA DE VIAJES</div>
          <div style={{ width: 56, height: 2, background: GOLD, margin: "0 auto 14px", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,3.6vw,32px)", margin: 0, color: NAVY }}>Formulario Visa Estados Unidos</h1>
          <p style={{ fontSize: 14.5, color: MUTED, margin: "10px auto 0", maxWidth: 520, lineHeight: 1.55 }}>
            Con esta información diligenciamos tu DS-160 y preparamos tu cita. Ve con calma: puedes avanzar y volver entre pasos.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 30, borderBottom: "1px solid rgba(22,40,63,.16)" }}>
          {[...SECTIONS.map((s) => s.tab), "Enviar"].map((label, i) => (
            <div key={label} onClick={() => go(i)}
              style={{ flex: 1, textAlign: "center", paddingBottom: 11, cursor: "pointer", borderBottom: `2px solid ${i === step ? GOLD : "transparent"}`, marginBottom: -1 }}>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: i === step ? BLUE : i < step ? NAVY : "#9db0c4", marginBottom: 4 }}>{i + 1}</div>
              <div style={{ fontSize: 9, letterSpacing: ".07em", color: i === step ? "#16283f" : "#8496a9", textTransform: "uppercase", lineHeight: 1.3 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "2px 30px 2px 30px", padding: "clamp(22px,4vw,38px)", border: "1px solid rgba(22,40,63,.14)", boxShadow: "0 2px 14px rgba(18,50,92,.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${NAVY} 0%,${BLUE} 45%,${GOLD} 100%)` }} />
          <div style={{ position: "absolute", right: -30, bottom: -24, width: 220, height: 220, background: `url('${LOGO}') no-repeat center/contain`, opacity: 0.045, pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            {!isReview && !submitted && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <img src={LOGO} alt="" style={{ width: 22, height: "auto", opacity: 0.9, display: "block" }} />
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 20, color: NAVY }}>{section.title}</div>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(232,179,35,.55),rgba(232,179,35,0))" }} />
                </div>
                <div style={{ fontSize: 13, color: MUTED, marginBottom: 24, lineHeight: 1.5 }}>{section.sub}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))", gap: "17px 18px" }}>
                  {visibleFields(step).map(renderField)}
                </div>
              </>
            )}

            {isReview && !submitted && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <img src={LOGO} alt="" style={{ width: 22, height: "auto", opacity: 0.9, display: "block" }} />
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 20, color: NAVY }}>Revisa y envía</div>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(232,179,35,.55),rgba(232,179,35,0))" }} />
                </div>
                <div style={{ fontSize: 13, color: MUTED, marginBottom: 24, lineHeight: 1.5 }}>
                  Haz <strong>doble clic</strong> en cualquier dato para volver a su paso y corregirlo.
                </div>

                {SECTIONS.map((s, si) => (
                  <div key={s.title} style={{ marginBottom: 22 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10, paddingBottom: 7, borderBottom: "1px solid rgba(22,40,63,.12)" }}>
                      <span style={{ width: 5, height: 5, background: GOLD, transform: "rotate(45deg)", display: "block" }} />
                      <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14, color: BLUE, letterSpacing: ".05em", textTransform: "uppercase" }}>{s.title}</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "11px 20px" }}>
                      {s.fields.filter((f) => f.t !== "head" && f.t !== "note" && (!f.showIf || f.showIf(data))).map((f) => {
                        const txt = reviewValue(f);
                        return (
                          <div key={f.k} onDoubleClick={() => go(si)} title="Doble clic para corregir"
                            style={{ gridColumn: f.span === "1/-1" || txt.length > 60 ? "1/-1" : "auto", cursor: "pointer", borderRadius: 8, padding: "4px 6px", margin: "-4px -6px" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7f96", textTransform: "uppercase", letterSpacing: ".05em" }}>{f.l}</div>
                            <div style={{ fontSize: 13.5, color: txt ? INK : f.req ? ERR : "#8496a9", lineHeight: 1.5, marginTop: 2, wordBreak: "break-word" }}>
                              {txt || (f.req ? "— sin responder —" : "— sin datos —")}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div onClick={() => { setConsent(!consent); setConsentError(false); }}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", background: "#eef4fb", border: `1px solid ${consentError ? ERR : "rgba(47,111,176,.3)"}`, borderLeft: `3px solid ${GOLD}`, borderRadius: "2px 18px 2px 18px", padding: "15px 17px", marginTop: 6 }}>
                  <div style={{ width: 20, height: 20, flex: "0 0 20px", borderRadius: 5, border: `1.5px solid ${NAVY}`, background: consent ? NAVY : "#fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginTop: 1 }}>{consent ? "✓" : ""}</div>
                  <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55 }}>
                    Autorizo a Wonderlust a usar estos datos exclusivamente para diligenciar mi solicitud de visa a Estados Unidos y agendar mi cita consular. Confirmo que la información es veraz.
                  </div>
                </div>
                {consentError && <div style={{ fontSize: 12.5, color: ERR, fontWeight: 600, marginTop: 9 }}>Necesitamos tu autorización para continuar.</div>}
              </>
            )}

            {submitted && (
              <div style={{ textAlign: "center", padding: "22px 4px" }}>
                <img src={LOGO} alt="Wonderlust" style={{ width: 78, height: "auto", margin: "0 auto 14px", display: "block" }} />
                <div style={{ fontSize: 11, letterSpacing: ".28em", color: "#c69214", fontWeight: 700, marginBottom: 8 }}>FORMULARIO RECIBIDO</div>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,3.4vw,30px)", color: NAVY, lineHeight: 1.15, marginBottom: 12 }}>
                  Muy bien, {(data.nombres || "").trim().split(" ")[0] || "viajero"}. Ya tenemos tu información.
                </div>
                <p style={{ fontSize: 14.5, color: MUTED, lineHeight: 1.6, maxWidth: 470, margin: "0 auto 6px" }}>
                  Acabas de dar el paso que a la mayoría le cuesta semanas. De aquí en adelante, nosotros nos encargamos.
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, margin: "16px 0 26px", padding: "8px 16px", borderRadius: 999, background: "#eef4fb", border: "1px solid rgba(47,111,176,.28)" }}>
                  <span style={{ fontSize: 10.5, letterSpacing: ".16em", color: "#6b7f96", fontWeight: 700 }}>TU RADICADO</span>
                  <span style={{ fontFamily: "'Marcellus',serif", fontSize: 15, color: NAVY, letterSpacing: ".06em" }}>{radicado}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, textAlign: "left", maxWidth: 660, margin: "0 auto 26px" }}>
                  {[
                    ["Hoy mismo", "Un asesor revisa tu información y valida que todo quede impecable para el DS-160."],
                    ["En 24 horas", "Te escribimos por WhatsApp con las fechas de cita disponibles y qué documentos alistar."],
                    ["Antes de tu cita", "Simulamos la entrevista contigo, para que llegues tranquilo y respondas con seguridad."],
                  ].map(([t, d]) => (
                    <div key={t} style={{ border: "1px solid rgba(22,40,63,.12)", borderTop: `2px solid ${GOLD}`, borderRadius: "2px 14px 2px 14px", padding: "15px 16px" }}>
                      <div style={{ fontFamily: "'Marcellus',serif", fontSize: 15, color: BLUE, marginBottom: 5 }}>{t}</div>
                      <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55 }}>{d}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: NAVY, borderRadius: "2px 22px 2px 22px", padding: "22px 20px", maxWidth: 660, margin: "0 auto" }}>
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 18, color: "#fff", marginBottom: 7 }}>¿Quieres que empecemos hoy?</div>
                  <p style={{ fontSize: 13.2, color: "#c9dcef", lineHeight: 1.55, margin: "0 auto 18px", maxWidth: 430 }}>
                    Escríbenos con tu radicado y tu caso pasa de una a la fila de atención prioritaria. Si ya quieres asegurar tu cupo, deja tu asesoría pagada y arrancamos de inmediato.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 11, justifyContent: "center" }}>
                    <a href={waSent} target="_blank" rel="noopener noreferrer" style={{ padding: "13px 26px", borderRadius: 999, background: GOLD, color: NAVY, fontSize: 13.5, fontWeight: 700, letterSpacing: ".03em", textDecoration: "none" }}>ESCRIBIRLE A MI ASESOR</a>
                    <a href={WOMPI} target="_blank" rel="noopener noreferrer" style={{ padding: "13px 26px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,.55)", color: "#fff", fontSize: 13.5, fontWeight: 700, letterSpacing: ".03em", textDecoration: "none" }}>PAGAR MI ASESORÍA</a>
                  </div>
                </div>

                <div style={{ fontSize: 11.8, color: "#8496a9", lineHeight: 1.6, marginTop: 18, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
                  Guarda una captura de esta pantalla con tu radicado. No necesitas volver a llenar nada.
                </div>
              </div>
            )}

            {!submitted && (
              <>
                {showError && missing.length > 0 && (
                  <div style={{ marginTop: 20, fontSize: 12.8, color: ERR, fontWeight: 600, background: "rgba(192,57,43,.07)", borderRadius: 10, padding: "11px 14px" }}>
                    Faltan campos obligatorios en este paso — los marcamos en rojo.
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, marginTop: 28, paddingTop: 22, borderTop: "1px solid rgba(22,40,63,.12)", alignItems: "center", flexWrap: "wrap" }}>
                  {step > 0 && (
                    <button type="button" onClick={() => go(step - 1)}
                      style={{ padding: "13px 26px", borderRadius: 999, border: "1.5px solid rgba(22,40,63,.28)", background: "none", color: "#44586e", fontSize: 13, fontWeight: 700, letterSpacing: ".04em", cursor: "pointer" }}>ATRÁS</button>
                  )}
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: "#8496a9" }}>
                    <img src={LOGO} alt="" style={{ width: 14, height: "auto", opacity: 0.6, display: "block" }} />
                    Wonderlust · Paso {step + 1} de {SECTIONS.length + 1}
                  </div>
                  <button type="button" onClick={isReview ? submit : next}
                    style={{ padding: "13px 30px", borderRadius: 999, border: "none", background: NAVY, color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: ".04em", cursor: "pointer" }}>
                    {isReview ? (submitting ? "ENVIANDO…" : "ENVIAR FORMULARIO") : "SIGUIENTE"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 22, fontSize: 11.5, color: "#8496a9", lineHeight: 1.6 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
            <img src={LOGO} alt="" style={{ width: 18, height: "auto", opacity: 0.75, display: "block" }} />
            <span style={{ fontFamily: "'Marcellus',serif", fontSize: 13, color: NAVY, letterSpacing: ".06em" }}>Wonderlust</span>
          </div>
          Agencia de viajes · <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: BLUE, textDecoration: "none" }}>+57 313 488 3629</a>
        </div>
      </div>
    </main>
  );
}
