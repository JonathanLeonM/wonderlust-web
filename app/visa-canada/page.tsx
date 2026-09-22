"use client";

// Wonderlust · Formulario Visa Canadá
// Ubicación en tu app Next.js: app/visa-canada/page.tsx
// Requiere /logo-wonderlust.png en /public y las fuentes Marcellus + Karla
// (ya cargadas en el layout, igual que en /visa-usa).

import { useRef, useState } from "react";
import { COLOMBIA_GEO, WORLD_COUNTRIES } from "../visa-usa/geo-datos";

const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbwF4RVzXTe-rmAz54sue5kvbLUESVGBuVe6RZY7Si0zIZy6ys8ILuyxy7P8HrTPRrq8/exec";
const WOMPI = "https://checkout.wompi.co/l/rpGvBY";
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
const SI_NO = ["Sí", "No"];
const PAISES: string[] = ["Colombia"].concat((WORLD_COUNTRIES as string[]).filter((p) => p !== "Colombia"));
const DEPTOS: string[] = ["Bogotá D.C."].concat(Object.keys(COLOMBIA_GEO as Record<string, string[]>).filter((k) => k !== "Bogotá D.C."));
const CIUDADES_CO: string[] = Array.from(
  new Set(Object.values(COLOMBIA_GEO as Record<string, string[]>).flat())
).sort((a, b) => a.localeCompare(b, "es"));

type Data = Record<string, any>;
type Sub = { k: string; l: string; t?: string; ph?: string; help?: string; span?: string; alpha?: boolean; optsKind?: string; opts?: string[]; dep?: string };
type Field = {
  k: string; l?: string; t?: string; req?: boolean; ph?: string; help?: string; span?: string;
  opts?: string[]; optsKind?: string; def?: string; resets?: string[]; alpha?: boolean; none?: boolean; sub?: Sub[]; max?: number;
  addLabel?: string; itemLabel?: string; showIf?: (d: Data) => boolean;
  geo?: { level: "depto" | "ciudad"; pais: string; depto?: string };
};

const esSepDiv = (d: Data) => d.estadoCivil === "Separado(a)" || d.estadoCivil === "Divorciado(a)";
const esViudo = (d: Data) => d.estadoCivil === "Viudo(a)";
const tienePareja = (d: Data) => d.estadoCivil === "Casado(a)" || d.estadoCivil === "Unión libre";
const anySeguridad = (d: Data) =>
  ["segGrupoPolitico", "segMalosTratos", "segDelito", "segArresto", "segAcusado", "segCondenado"].some((k) => d[k] === "Sí");

const SECTIONS: { tab: string; title: string; sub: string; fields: Field[] }[] = [
  {
    tab: "Inicio",
    title: "Tu solicitud y tu pasaporte",
    sub: "Escribe tus datos exactamente como aparecen en el pasaporte: IRCC los compara letra por letra.",
    fields: [
      { k: "_hContacto", t: "head", l: "Cómo te contactamos", help: "Por aquí te avisamos de cada paso del trámite.", span: "1/-1" },
      { k: "correo", l: "Correo electrónico", t: "email", req: true, ph: "tunombre@gmail.com" },
      { k: "celular", l: "Celular de contacto", req: true, t: "tel", ph: "3101234567" },
      { k: "_hViaje", t: "head", l: "Tu viaje", span: "1/-1" },
      { k: "motivoVisa", l: "¿Por qué necesitas la visa?", req: true, t: "choice", opts: ["Turismo", "Visita a familia o amigos", "Negocios", "Curso corto (menos de 6 meses)", "Tránsito", "Otro"], span: "1/-1" },
      { k: "motivoDetalle", l: "Cuéntanos en una frase para qué es el viaje", req: true, t: "area", ph: "Conocer Toronto y las cataratas del Niágara con mi familia", span: "1/-1", showIf: (d) => d.motivoVisa === "Otro" },
      { k: "_hPasaporte", t: "head", l: "Tu pasaporte", span: "1/-1" },
      { k: "pasaporteNumero", l: "Número de pasaporte", req: true, ph: "AQ123456" },
      { k: "pasaporteVencimiento", l: "Fecha de vencimiento del pasaporte", t: "date", req: true },
      { k: "_hDatos", t: "head", l: "Tus datos personales", span: "1/-1" },
      { k: "nombreCompleto", l: "Nombre completo del solicitante", help: "Nombres y apellidos como aparecen en el pasaporte.", req: true, alpha: true, span: "1/-1" },
      { k: "fechaNacimiento", l: "Fecha de nacimiento", req: true, t: "date" },
      { k: "paisNacimiento", l: "País de nacimiento", req: true, t: "select", optsKind: "paises", def: "Colombia", resets: ["deptoNacimiento", "ciudadNacimiento"] },
      { k: "deptoNacimiento", l: "Departamento / Estado de nacimiento", req: true, t: "geo", geo: { level: "depto", pais: "paisNacimiento" }, resets: ["ciudadNacimiento"], ph: "Departamento / Estado" },
      { k: "ciudadNacimiento", l: "Ciudad de nacimiento", req: true, t: "geo", geo: { level: "ciudad", pais: "paisNacimiento", depto: "deptoNacimiento" }, ph: "Ciudad" },
      { k: "_hVives", t: "head", l: "Dónde vives hoy", span: "1/-1" },
      { k: "paisResidencia", l: "País donde vives hoy", req: true, t: "select", optsKind: "paises", def: "Colombia", resets: ["deptoResidencia", "ciudadResidencia"] },
      { k: "deptoResidencia", l: "Departamento / Estado donde vives", req: true, t: "geo", geo: { level: "depto", pais: "paisResidencia" }, resets: ["ciudadResidencia"], ph: "Departamento / Estado" },
      { k: "ciudadResidencia", l: "Ciudad donde vives hoy", req: true, t: "geo", geo: { level: "ciudad", pais: "paisResidencia", depto: "deptoResidencia" }, ph: "Ciudad" },
    ],
  },
  {
    tab: "Padres",
    title: "Cuéntanos sobre tus padres",
    sub: "Si fuiste adoptado, pon los datos de tus padres legales. Los campos de fallecimiento solo si aplica.",
    fields: [
      { k: "_hPadre", t: "head", l: "Padre", span: "1/-1" },
      { k: "padreApellidos", l: "Apellidos del padre", req: true, alpha: true, ph: "Solarte Betancourt" },
      { k: "padreNombres", l: "Nombre de pila del padre", req: true, alpha: true, ph: "Alonso Remigio" },
      { k: "padreFechaNac", l: "Fecha de nacimiento del padre", t: "date", req: true },
      { k: "padreFechaDef", l: "Fecha de fallecimiento del padre", help: "Solo si ya falleció.", t: "date" },
      { k: "padreOcupacion", l: "Ocupación actual del padre", req: true, ph: "Pensionado", span: "1/-1" },
      { k: "_hMadre", t: "head", l: "Madre", span: "1/-1" },
      { k: "madreApellidos", l: "Apellidos de la madre", req: true, alpha: true, ph: "Quintero de Solarte" },
      { k: "madreNombres", l: "Nombre de pila de la madre", req: true, alpha: true, ph: "Claudia Yolanda" },
      { k: "madreFechaNac", l: "Fecha de nacimiento de la madre", t: "date", req: true },
      { k: "madreFechaDef", l: "Fecha de fallecimiento de la madre", help: "Solo si ya falleció.", t: "date" },
      { k: "madreOcupacion", l: "Ocupación actual de la madre", req: true, ph: "Ama de casa", span: "1/-1" },
    ],
  },
  {
    tab: "Hijos",
    title: "Hijos",
    sub: "IRCC pide todos los hijos: biológicos, adoptados e hijastros, de cualquier edad y vivan contigo o no.",
    fields: [
      { k: "tieneHijos", l: "¿Tienes hijos biológicos, adoptados o hijastros?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      {
        k: "hijos", l: "Hijos", t: "group", max: 6, itemLabel: "Hijo", addLabel: "Agregar otro hijo", req: true, span: "1/-1",
        showIf: (d) => d.tieneHijos === "Sí",
        sub: [
          { k: "apellido", l: "Apellidos", alpha: true },
          { k: "nombre", l: "Nombre de pila", alpha: true },
          { k: "fechaNac", l: "Fecha de nacimiento", t: "date" },
          { k: "paisNac", l: "País o territorio de nacimiento", t: "select", optsKind: "paises" },
          { k: "fallecido", l: "¿Ha fallecido? (Sí / No)", ph: "No" },
          { k: "mismaDireccion", l: "¿Vive en tu misma dirección? (Sí / No)", ph: "Sí" },
          { k: "acompana", l: "¿Te acompaña a Canadá? (Sí / No / NA)", ph: "No" },
        ],
      },
    ],
  },
  {
    tab: "Estado civil",
    title: "Estado civil",
    sub: "Si estás casado(a) o en unión de hecho, necesitamos también los datos de tu pareja.",
    fields: [
      { k: "estadoCivil", l: "¿Cuál es tu estado civil actual?", req: true, t: "choice", opts: ESTADO_CIVIL, span: "1/-1" },
      { k: "fechaUnion", l: "Fecha del matrimonio o inicio de la unión de hecho", t: "date", req: true, showIf: tienePareja },
      { k: "conyugeApellidos", l: "Apellidos del cónyuge o pareja de hecho", req: true, alpha: true, ph: "Obando Melo", showIf: tienePareja },
      { k: "conyugeNombres", l: "Nombre de pila del cónyuge o pareja de hecho", req: true, alpha: true, ph: "Johana Lorena", showIf: tienePareja },
      { k: "conyugeFechaNac", l: "Fecha de nacimiento del cónyuge o pareja", t: "date", req: true, showIf: tienePareja },
      { k: "conyugePaisNac", l: "País o territorio de nacimiento del cónyuge o pareja", req: true, t: "select", optsKind: "paises", def: "Colombia", showIf: tienePareja },
      { k: "conyugeOcupacion", l: "Ocupación actual del cónyuge o pareja", req: true, ph: "Empleada", span: "1/-1", showIf: tienePareja },
      { k: "conyugeMismaDireccion", l: "¿Vive en tu misma dirección?", req: true, t: "choice", opts: SI_NO, span: "1/-1", showIf: tienePareja },
      { k: "conyugeDireccion", l: "Dirección donde vive tu cónyuge o pareja", req: true, ph: "Cra 45 #12-34, Cali", span: "1/-1", showIf: (d) => tienePareja(d) && d.conyugeMismaDireccion === "No" },
      { k: "conyugeAcompana", l: "¿Te acompaña a Canadá?", req: true, t: "choice", opts: SI_NO, span: "1/-1", showIf: tienePareja },
      { k: "exFechaMatrimonio", l: "Fecha del matrimonio anterior", t: "date", req: true, showIf: esSepDiv },
      { k: "exFechaSeparacion", l: "Fecha de la separación legal o divorcio", t: "date", req: true, showIf: esSepDiv },
      { k: "exNombre", l: "Nombres y apellidos de la ex pareja", req: true, alpha: true, span: "1/-1", showIf: esSepDiv },
      { k: "falNombre", l: "Nombres y apellidos del cónyuge fallecido(a)", req: true, alpha: true, showIf: esViudo },
      { k: "falFecha", l: "Fecha de fallecimiento", t: "date", req: true, showIf: esViudo },
    ],
  },
  {
    tab: "Salud",
    title: "Historial médico",
    sub: "Son las preguntas exactas de IRCC. Responder “sí” no niega la visa; ocultarlo sí puede.",
    fields: [
      { k: "medDialisis", l: "¿Estás recibiendo actualmente tratamiento de diálisis?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medAdiccion", l: "¿Has tenido alguna adicción a las drogas o al alcohol que te haya hecho representar una amenaza para ti o para otros, o que haya obligado a hospitalizarte?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medMental", l: "¿Has tenido alguna condición de salud mental que te haya hecho representar una amenaza para ti o para otros, o que haya obligado a hospitalizarte?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medSifilis", l: "¿Alguna vez te han diagnosticado sífilis?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medTb2", l: "En los últimos 2 años, ¿te diagnosticaron tuberculosis?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medTbContacto", l: "En los últimos 5 años, ¿has estado en contacto cercano con una persona con tuberculosis?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medTbPrueba", l: "¿Te han hecho la prueba de tuberculosis?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medTbPositivo", l: "¿El resultado de la prueba fue positivo?", req: true, t: "choice", opts: SI_NO, span: "1/-1", showIf: (d) => d.medTbPrueba === "Sí" },
      { k: "medTbTratamiento", l: "¿Has completado o estás recibiendo tratamiento para la tuberculosis (mínimo 6 meses)?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medExamenIrcc", l: "¿Te ha hecho un examen médico un médico autorizado por IRCC en los últimos 12 meses?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "medDetalle", l: "Cuéntanos los detalles de lo que respondiste “sí”", help: "Fechas, diagnóstico y tratamiento. Esto nos deja preparar tu caso con el soporte correcto.", t: "area", span: "1/-1" },
    ],
  },
  {
    tab: "Seguridad",
    title: "Preguntas de seguridad",
    sub: "IRCC las hace a todos los solicitantes. Responde con calma y con honestidad.",
    fields: [
      { k: "segGrupoPolitico", l: "¿Eres o has sido miembro o asociado de algún partido político, grupo u organización que haya participado o promovido la violencia como medio para lograr un objetivo político o religioso, o que haya estado asociado con actividad criminal?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "segMalosTratos", l: "¿Alguna vez has presenciado o participado en malos tratos a prisioneros o civiles, saqueos o profanación de edificios religiosos?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "segDelito", l: "¿Has cometido alguna vez algún delito en algún país o territorio? (incluye conducir bajo la influencia del alcohol o las drogas)", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "segArresto", l: "¿Alguna vez has sido arrestado por algún delito penal en algún país o territorio?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "segAcusado", l: "¿Alguna vez has sido acusado de algún delito penal en algún país o territorio?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "segCondenado", l: "¿Alguna vez has sido condenado por algún delito penal en algún país o territorio?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "segDetalle", l: "Cuéntanos qué pasó, dónde, cuándo y cómo se resolvió", help: "Entre más claro sea el relato, mejor podemos sustentar tu caso.", req: true, t: "area", span: "1/-1", showIf: anySeguridad },
    ],
  },
  {
    tab: "Viajes",
    title: "Actividades e historial de viajes",
    sub: "Los viajes previos son buena señal: muestran que cumples las reglas migratorias.",
    fields: [
      { k: "viajo5anos", l: "En los últimos 5 años, ¿has viajado a un país distinto del tuyo o de donde resides?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      {
        k: "viajes", l: "Tus viajes de los últimos 5 años", help: "Agrega un bloque por viaje. Si fuiste dos veces al mismo país, son dos bloques.", t: "group", max: 8, itemLabel: "Viaje", addLabel: "Agregar otro viaje", req: true, span: "1/-1",
        showIf: (d) => d.viajo5anos === "Sí",
        sub: [
          { k: "pais", l: "País visitado", t: "select", optsKind: "paises" },
          { k: "mes", l: "Mes y año del viaje", t: "month" },
          { k: "dias", l: "¿Cuántos días estuviste?", t: "num", ph: "5" },
          { k: "proposito", l: "Propósito del viaje", t: "select", opts: ["Turismo", "Visita a familia o amigos", "Negocios", "Estudio", "Tránsito", "Otro"] },
        ],
      },
      { k: "excedioEstadia", l: "¿Alguna vez permaneciste en Canadá más allá de tu estatus, estudiaste sin autorización o trabajaste sin autorización allí?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "excedioDetalle", l: "Cuéntanos cuándo y qué pasó", req: true, t: "area", span: "1/-1", showIf: (d) => d.excedioEstadia === "Sí" },
      { k: "negaronVisa", l: "¿Alguna vez te han negado una visa o permiso, te han negado la entrada o te han ordenado salir de algún país?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "negacionDetalle", l: "Cuándo y por qué sucedió", help: "Con la mayor cantidad de detalles posible: esto agiliza el procesamiento de tu solicitud.", req: true, t: "area", span: "1/-1", showIf: (d) => d.negaronVisa === "Sí" },
      { k: "visaCanadaPrevia", l: "¿Has tenido visa canadiense antes?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "uciPrevio", l: "Número de cliente (UCI) de tu trámite anterior", help: "Aparece en las cartas de IRCC, 8 a 10 dígitos. Si no lo tienes, toca “Ninguno”.", none: true, span: "1/-1", showIf: (d) => d.visaCanadaPrevia === "Sí" },
      { k: "visaUsaVigente", l: "¿Tienes visa de Estados Unidos vigente?", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      { k: "visaUsaTipo", l: "Tipo de visa americana", req: true, t: "select", opts: ["B1/B2 (turismo y negocios)", "F1 (estudiante)", "J1 (intercambio)", "H1B (trabajo)", "Otra"], showIf: (d) => d.visaUsaVigente === "Sí" },
      { k: "visaUsaVence", l: "Fecha de vencimiento de la visa americana", req: true, t: "date", showIf: (d) => d.visaUsaVigente === "Sí" },
    ],
  },
  {
    tab: "Trabajo",
    title: "Educación y trabajo",
    sub: "Los últimos 10 años sin huecos de tiempo: trabajos, negocios, estudios, desempleo o pensión.",
    fields: [
      { k: "estudiosSuperiores", l: "¿Has cursado estudios superiores (universidad, instituto o centro de formación)?", help: "No necesitas tener título o diploma.", req: true, t: "choice", opts: SI_NO, span: "1/-1" },
      {
        k: "estudios", l: "Tus estudios superiores", help: "Un bloque por cada programa que hayas cursado, te hayas graduado o no.", t: "group", max: 4, itemLabel: "Estudio", addLabel: "Agregar otro estudio", req: true, span: "1/-1",
        showIf: (d) => d.estudiosSuperiores === "Sí",
        sub: [
          { k: "institucion", l: "Institución", ph: "Universidad del Valle" },
          { k: "programa", l: "Programa o carrera", ph: "Ingeniería civil" },
          { k: "pais", l: "País", t: "select", optsKind: "paises" },
          { k: "ciudad", l: "Ciudad", t: "ciudadCo", dep: "pais", ph: "Cali" },
          { k: "inicio", l: "Fecha de inicio", t: "month" },
          { k: "fin", l: "Fecha de finalización", t: "month" },
          { k: "graduado", l: "¿Te graduaste?", t: "select", opts: ["Sí, me gradué", "No, no terminé", "Aún estoy estudiando"] },
        ],
      },
      { k: "_hEmpleos", t: "head", l: "Empleos y actividades de los últimos 10 años", help: "Agrega un bloque por cada trabajo, negocio, estudio o periodo sin empleo. Hasta 6.", span: "1/-1" },
      {
        k: "empleos", l: "Empleos y actividades", t: "group", max: 6, itemLabel: "Actividad", addLabel: "Agregar otra actividad", req: true, span: "1/-1",
        sub: [
          { k: "actividad", l: "Trabajo o actividad", ph: "Empleado / Independiente / Estudiante" },
          { k: "titulo", l: "Título profesional o cargo", ph: "Ingeniero de redes" },
          { k: "empresa", l: "Empresa o institución", ph: "Claro Colombia" },
          { k: "pais", l: "País", t: "select", optsKind: "paises" },
          { k: "ciudad", l: "Ciudad", t: "ciudadCo", dep: "pais", ph: "Cali" },
          { k: "inicio", l: "Fecha de inicio", t: "date" },
          { k: "fin", l: "Fecha de finalización", help: "Déjala vacía si sigues ahí.", t: "date" },
        ],
      },
      { k: "ingresoMensual", l: "Ingreso mensual actual", req: true, t: "num", ph: "6500000" },
      { k: "fondosDisponibles", l: "Dinero disponible para el viaje", help: "Lo que puedas demostrar con extractos.", req: true, t: "num", ph: "18000000" },
      { k: "notaFinal", t: "note", l: "Lo que sigue después de enviar", help: "Con esta información armamos tu perfil, te decimos exactamente qué documentos alistar (extractos, carta laboral, certificados) y radicamos tu solicitud en el portal de IRCC. La tarifa consular y los biométricos van aparte.", span: "1/-1" },
    ],
  },
];

const allFields = () => SECTIONS.reduce<Field[]>((a, s) => a.concat(s.fields), []);

function defaultData(): Data {
  const d: Data = {};
  allFields().forEach((f) => {
    if (f.t === "note" || f.t === "head") return;
    d[f.k] = f.t === "group" ? [] : f.def || "";
  });
  return d;
}

const ALPHA_RE = /[^A-Za-zÁÉÍÓÚáéíóúÜüÑñÀ-ÿ'’.\-\s]/g;
const cleanVal = (t: string | undefined, alpha: boolean | undefined, v: string) => {
  if (t === "num") return v.replace(/[^0-9]/g, "");
  if (t === "tel") return v.replace(/[^0-9+\-\s()]/g, "");
  if (alpha) return v.replace(ALPHA_RE, "");
  return v;
};

const inputStyle = (err: boolean): React.CSSProperties => ({
  padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${err ? ERR : "rgba(22,40,63,.2)"}`,
  background: "#fff", fontSize: 14, height: 44, width: "100%", fontFamily: "inherit", color: INK,
});

export default function VisaCanadaPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(defaultData);
  const [showError, setShowError] = useState(false);
  const [emailFocus, setEmailFocus] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [radicado, setRadicado] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const blurT = useRef<any>(null);

  const isReview = step === SECTIONS.length;

  const scrollTop = () => {
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 24;
    window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
  };

  const visibleFields = (i: number) => {
    const s = SECTIONS[i];
    if (!s) return [];
    return s.fields.filter((f) => !f.showIf || f.showIf(data));
  };

  const missing = isReview
    ? []
    : visibleFields(step).filter((f) => {
        if (!f.req) return false;
        const v = data[f.k];
        return Array.isArray(v) ? v.length === 0 : !String(v || "").trim();
      }).map((f) => f.k);

  const bad = (k: string) => showError && missing.indexOf(k) !== -1;

  const set = (k: string, v: any, resets?: string[]) =>
    setData((d) => {
      const nd = { ...d, [k]: v };
      (resets || []).forEach((r) => { nd[r] = ""; });
      return nd;
    });

  // Lista de un campo geo: solo desplegable dentro de Colombia; fuera, texto libre.
  const geoOpts = (f: Field): string[] | null => {
    const g = f.geo!;
    if (data[g.pais] !== "Colombia") return null;
    if (g.level === "depto") return DEPTOS;
    return (COLOMBIA_GEO as Record<string, string[]>)[data[g.depto!]] || [];
  };

  const setSub = (k: string, idx: number, sk: string, v: any) =>
    setData((d) => {
      const list = (d[k] || []).slice();
      list[idx] = { ...(list[idx] || {}), [sk]: v };
      return { ...d, [k]: list };
    });

  const addRow = (k: string, max: number) =>
    setData((d) => ((d[k] || []).length >= max ? d : { ...d, [k]: (d[k] || []).concat([{}]) }));

  const removeRow = (k: string, idx: number) =>
    setData((d) => ({ ...d, [k]: (d[k] || []).filter((_: any, i: number) => i !== idx) }));

  const go = (n: number) => { setStep(n); setShowError(false); setTimeout(scrollTop, 20); };

  const next = () => {
    if (!isReview && missing.length) { setShowError(true); setTimeout(scrollTop, 20); return; }
    go(Math.min(step + 1, SECTIONS.length));
  };

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.min(Math.max(el.scrollHeight, 44), 240) + "px";
  };

  const emailSuggest = (focusKey: string, raw: string, apply: (v: string) => void) => {
    if (emailFocus !== focusKey) return [];
    const val = String(raw || "").trim();
    if (!val) return [];
    const at = val.indexOf("@");
    const local = at === -1 ? val : val.slice(0, at);
    if (!local) return [];
    const typed = at === -1 ? "" : val.slice(at + 1).toLowerCase();
    return EMAIL_DOMAINS.filter((dm) => dm.indexOf(typed) === 0 && dm !== typed).slice(0, 5)
      .map((dm) => ({ label: `${local}@${dm}`, apply: () => apply(`${local}@${dm}`) }));
  };

  const buildPayload = (rad: string) => {
    const out: Data = {
      Marca: "Wonderlust", Tramite: "Visa Canadá", Radicado: rad,
      FechaEnvio: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
    };
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
      if (f.t === "group") {
        const max = f.max || 5;
        for (let i = 0; i < max; i++) {
          const it = (v || [])[i] || {};
          (f.sub || []).forEach((sf) => put(`${f.itemLabel || "Registro"} ${i + 1} — ${sf.l}`, it[sf.k] || ""));
        }
        return;
      }
      put(f.l || f.k, Array.isArray(v) ? v.join(", ") : v || "");
    });
    out.Dispositivo = typeof navigator !== "undefined" ? navigator.userAgent : "";
    return out;
  };

  const submit = () => {
    if (!consent) { setConsentError(true); return; }
    const rad = "WL-CAN-" + Date.now().toString(36).slice(-5).toUpperCase();
    setRadicado(rad);
    setSubmitting(true);
    const payload = buildPayload(rad);
    const done = () => { setSubmitting(false); setSubmitted(true); setTimeout(scrollTop, 20); };
    if (!SHEETS_WEBHOOK) { done(); return; }
    // XHR, no fetch: /exec responde 302 y fetch en no-cors convierte el POST en GET y pierde el body.
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", SHEETS_WEBHOOK, true);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
      xhr.onload = done;
      xhr.onerror = done;
      xhr.send(JSON.stringify(payload));
    } catch { done(); }
  };

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

    if (t === "note")
      return (
        <div key={f.k} style={{ gridColumn: f.span || "auto", background: "#eef4fb", border: "1px solid rgba(47,111,176,.3)", borderLeft: `3px solid ${GOLD}`, borderRadius: "2px 18px 2px 18px", padding: "15px 17px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 5 }}>{f.l}</div>
          <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55 }}>{f.help}</div>
        </div>
      );

    let control: React.ReactNode = null;

    if (t === "choice")
      control = (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(f.opts || []).map((o) => {
            const on = data[f.k] === o;
            return (
              <button key={o} type="button" onClick={() => set(f.k, o)}
                style={{ padding: "9px 17px", borderRadius: 999, border: `1.5px solid ${on ? NAVY : err ? ERR : "rgba(22,40,63,.2)"}`, background: on ? NAVY : "#fff", color: on ? "#fff" : "#44586e", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                {o}
              </button>
            );
          })}
        </div>
      );
    else if (t === "area")
      control = (
        <textarea value={data[f.k] || ""} rows={2} placeholder={f.ph || ""}
          onChange={(e) => { autoGrow(e.target as HTMLTextAreaElement); set(f.k, e.target.value); }}
          style={{ ...inputStyle(err), height: "auto", minHeight: 44, lineHeight: 1.45, resize: "vertical", overflow: "hidden" }} />
      );
    else if (t === "group") {
      const list: any[] = data[f.k] || [];
      control = (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.map((it, i) => (
            <div key={i} style={{ border: "1px solid rgba(22,40,63,.14)", borderRadius: "2px 18px 2px 18px", padding: "14px 15px", background: "#fbfcfe" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14, color: BLUE }}>{`${f.itemLabel || "Registro"} ${i + 1}`}</div>
                <button type="button" onClick={() => removeRow(f.k, i)}
                  style={{ border: "1px solid rgba(22,40,63,.18)", background: "#fff", color: "#8496a9", fontSize: 11.5, fontWeight: 700, borderRadius: 999, padding: "5px 11px", cursor: "pointer", fontFamily: "inherit" }}>Quitar</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "11px 13px" }}>
                {(f.sub || []).map((sf) => (
                  <div key={sf.k} style={{ gridColumn: sf.span || "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11.5, fontWeight: 700, color: "#44586e" }}>{sf.l}</label>
                    {(() => {
                      const st = sf.t || "text";
                      const sStyle = { ...inputStyle(false), padding: "9px 12px", borderRadius: 9, fontSize: 13.5, height: 40 };
                      const opts =
                        st === "select" ? (sf.optsKind === "paises" ? PAISES : sf.opts || [])
                        : st === "ciudadCo" && (it || {})[sf.dep!] === "Colombia" ? CIUDADES_CO
                        : null;
                      if (opts)
                        return (
                          <select value={(it || {})[sf.k] || ""} onChange={(e) => setSub(f.k, i, sf.k, e.target.value)}
                            style={{ ...sStyle, color: (it || {})[sf.k] ? INK : "#9db0c4" }}>
                            <option value="">{st === "ciudadCo" ? "Elige tu ciudad…" : "Selecciona…"}</option>
                            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        );
                      return (
                        <input type={st === "date" ? "date" : st === "month" ? "month" : "text"}
                          inputMode={st === "num" ? "numeric" : "text"}
                          value={(it || {})[sf.k] || ""} placeholder={sf.ph || ""}
                          onChange={(e) => setSub(f.k, i, sf.k, cleanVal(sf.t, sf.alpha, e.target.value))} style={sStyle} />
                      );
                    })()}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {list.length < (f.max || 5) && (
            <button type="button" onClick={() => addRow(f.k, f.max || 5)}
              style={{ alignSelf: "flex-start", padding: "9px 17px", borderRadius: 999, border: "1.5px dashed rgba(47,111,176,.5)", background: "#fff", color: BLUE, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              + {f.addLabel || "Agregar"}
            </button>
          )}
        </div>
      );
    } else if (t === "select" || (t === "geo" && geoOpts(f))) {
      const opts = t === "select" ? (f.optsKind === "paises" ? PAISES : f.opts || []) : geoOpts(f) || [];
      const vacio = t === "geo" && f.geo!.level === "ciudad" && !data[f.geo!.depto!];
      control = (
        <select value={data[f.k] || ""} onChange={(e) => set(f.k, e.target.value, f.resets)}
          style={{ ...inputStyle(err), color: data[f.k] ? INK : "#9db0c4" }}>
          <option value="">{vacio ? "Elige primero el departamento" : "Selecciona…"}</option>
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    } else {
      const sug = t === "email" ? emailSuggest(f.k, data[f.k], (nv) => set(f.k, nv)) : [];
      control = (
        <div style={{ position: "relative", display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type={t === "date" ? "date" : t === "email" ? "email" : t === "tel" ? "tel" : "text"}
            inputMode={t === "num" ? "numeric" : t === "tel" ? "tel" : t === "email" ? "email" : "text"}
            autoComplete={t === "email" ? "off" : "on"}
            value={data[f.k] || ""}
            placeholder={f.ph || ""}
            onChange={(e) => set(f.k, cleanVal(t, f.alpha, e.target.value), f.resets)}
            onFocus={t === "email" ? () => { clearTimeout(blurT.current); setEmailFocus(f.k); } : undefined}
            onBlur={t === "email" ? () => { clearTimeout(blurT.current); blurT.current = setTimeout(() => setEmailFocus(""), 180); } : undefined}
            style={inputStyle(err)} />
          {f.none && (
            <button type="button" onClick={() => set(f.k, "Ninguno")}
              style={{ flex: "0 0 auto", height: 44, padding: "0 14px", borderRadius: 10, border: "1.5px solid rgba(22,40,63,.2)", background: "#fff", color: "#44586e", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>Ninguno</button>
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
    if (f.t === "group")
      return (v || []).map((it: any, i: number) =>
        `${f.itemLabel || "Registro"} ${i + 1}: ${(f.sub || []).map((sf) => (it || {})[sf.k]).filter(Boolean).slice(0, 3).join(" — ")}`
      ).join("  |  ");
    return Array.isArray(v) ? v.join(", ") : String(v || "");
  };

  const section = SECTIONS[step] || SECTIONS[0];
  const firstName = String(data.nombreCompleto || "").trim().split(" ")[0] || "viajero";
  const waSent = `${WA}?text=${encodeURIComponent(`Hola Wonderlust, soy ${String(data.nombreCompleto || "").trim()}. Acabo de enviar mi formulario de visa de Canadá (radicado ${radicado}).`)}`;

  return (
    <main style={{ minHeight: "100vh", background: "#eaf0f7", padding: "clamp(20px,5vw,56px) 16px", display: "flex", justifyContent: "center", fontFamily: "'Karla',system-ui,sans-serif", color: INK }}>
      <div style={{ width: "100%", maxWidth: 840 }} ref={topRef}>

        <div style={{ marginBottom: 18 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: NAVY, padding: "9px 16px 9px 13px", border: "1px solid rgba(18,50,92,.22)", borderRadius: 999, background: "#fff", textDecoration: "none" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
            Volver al inicio
          </a>
        </div>

        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 11, letterSpacing: ".34em", color: "#c69214", fontWeight: 700, marginBottom: 10 }}>WONDERLUST · AGENCIA DE VIAJES</div>
          <div style={{ width: 56, height: 2, background: GOLD, margin: "0 auto 14px", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,3.6vw,32px)", margin: 0, color: NAVY }}>Formulario Visa Canadá</h1>
          <p style={{ fontSize: 14.5, color: MUTED, margin: "10px auto 0", maxWidth: 520, lineHeight: 1.55 }}>
            Son las mismas preguntas que exige IRCC, en español y paso por paso. Ve con calma: puedes avanzar y volver entre pasos.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 30, borderBottom: "1px solid rgba(22,40,63,.16)" }}>
          {SECTIONS.map((s) => s.tab).concat(["Enviar"]).map((label, i) => (
            <div key={label} onClick={() => go(i)}
              style={{ flex: 1, textAlign: "center", paddingBottom: 11, cursor: "pointer", borderBottom: `2px solid ${i === step ? GOLD : "transparent"}`, marginBottom: -1, transition: "border-color .25s ease" }}>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: i === step ? BLUE : i < step ? NAVY : "#9db0c4", marginBottom: 4 }}>{i + 1}</div>
              <div style={{ fontSize: 9, letterSpacing: ".07em", color: i === step ? INK : "#8496a9", textTransform: "uppercase", lineHeight: 1.3 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "2px 30px 2px 30px", padding: "clamp(22px,4vw,38px)", border: "1px solid rgba(22,40,63,.14)", boxShadow: "0 2px 14px rgba(18,50,92,.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${NAVY} 0%,${BLUE} 45%,${GOLD} 100%)` }} />
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
                  <div key={s.tab} style={{ marginBottom: 22 }}>
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

                <div onClick={() => { setConsent((c) => !c); setConsentError(false); }}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", background: "#eef4fb", border: `1px solid ${consentError ? ERR : "rgba(47,111,176,.3)"}`, borderLeft: `3px solid ${GOLD}`, borderRadius: "2px 18px 2px 18px", padding: "15px 17px", marginTop: 6 }}>
                  <div style={{ width: 20, height: 20, flex: "0 0 20px", borderRadius: 5, border: `1.5px solid ${NAVY}`, background: consent ? NAVY : "#fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginTop: 1 }}>
                    {consent ? "✓" : ""}
                  </div>
                  <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55 }}>
                    Autorizo a Wonderlust a usar estos datos exclusivamente para preparar y radicar mi solicitud de visa de visitante a Canadá ante IRCC. Confirmo que la información es veraz.
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
                  Muy bien, {firstName}. Ya tenemos tu información.
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
                    ["Hoy mismo", "Un asesor revisa tu información y valida que tu perfil quede sólido antes de radicar."],
                    ["En 24 horas", "Te escribimos por WhatsApp con la lista exacta de documentos: extractos, carta laboral y soportes."],
                    ["Antes de radicar", "Revisamos contigo cada documento y te agendamos los biométricos en el centro de solicitud."],
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
                    <a href="/" style={{ padding: "13px 26px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,.35)", color: "#c9dcef", fontSize: 13.5, fontWeight: 700, letterSpacing: ".03em", textDecoration: "none" }}>VOLVER AL INICIO</a>
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
                      style={{ padding: "13px 26px", borderRadius: 999, border: "1.5px solid rgba(22,40,63,.28)", background: "none", color: "#44586e", fontSize: 13, fontWeight: 700, letterSpacing: ".04em", cursor: "pointer", fontFamily: "inherit" }}>ATRÁS</button>
                  )}
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: "#8496a9" }}>
                    <img src={LOGO} alt="" style={{ width: 14, height: "auto", opacity: 0.6, display: "block" }} />
                    Wonderlust · Paso {step + 1} de {SECTIONS.length + 1}
                  </div>
                  <button type="button" onClick={isReview ? submit : next}
                    style={{ padding: "13px 30px", borderRadius: 999, border: "none", background: NAVY, color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: ".04em", cursor: "pointer", fontFamily: "inherit" }}>
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
