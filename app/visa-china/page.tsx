"use client";

import { useState } from "react";

const SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyjjr2jBzJygb-i2_l_D6WtsdwX0T2ThOhIJCCAMeRvXwZrwtzFox5e02iHrqikV9OvQ/exec";

const COLOMBIA_GEO: Record<string, string[]> = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Medellín", "Envigado", "Itagüí", "Bello", "Rionegro", "Apartadó", "Turbo"],
  "Arauca": ["Arauca", "Saravena", "Tame"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"],
  "Bogotá D.C.": ["Bogotá"],
  "Bolívar": ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá"],
  "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Villamaría"],
  "Caquetá": ["Florencia", "San Vicente del Caguán"],
  "Casanare": ["Yopal", "Aguazul", "Villanueva"],
  "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
  "Cesar": ["Valledupar", "Aguachica", "Codazzi"],
  "Chocó": ["Quibdó", "Istmina"],
  "Córdoba": ["Montería", "Cereté", "Lorica", "Sahagún"],
  "Cundinamarca": ["Soacha", "Fusagasugá", "Zipaquirá", "Chía", "Facatativá", "Girardot"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare"],
  "Huila": ["Neiva", "Pitalito", "Garzón"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
  "Meta": ["Villavicencio", "Acacías", "Granada"],
  "Nariño": ["Pasto", "Tumaco", "Ipiales"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona"],
  "Putumayo": ["Mocoa", "Puerto Asís"],
  "Quindío": ["Armenia", "Calarcá", "Montenegro"],
  "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
  "San Andrés y Providencia": ["San Andrés", "Providencia"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
  "Sucre": ["Sincelejo", "Corozal"],
  "Tolima": ["Ibagué", "Espinal", "Melgar"],
  "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño"],
};
const EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"];
const COUNTRIES = ["Colombia", "México", "Perú", "Ecuador", "Venezuela", "Chile", "Argentina", "España", "Estados Unidos", "Otro"];
const WORLD_COUNTRIES = ["Colombia", "México", "Perú", "Ecuador", "Venezuela", "Chile", "Argentina", "Bolivia", "Paraguay", "Uruguay", "Brasil", "España", "Estados Unidos", "Canadá", "Panamá", "Costa Rica", "República Dominicana", "Cuba", "Puerto Rico", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Francia", "Italia", "Alemania", "Reino Unido", "Portugal", "Países Bajos", "Suiza", "China", "Japón", "Corea del Sur", "Tailandia", "Singapur", "India", "Emiratos Árabes Unidos", "Turquía", "Rusia", "Australia", "Nueva Zelanda", "Marruecos", "Egipto"];

type FieldDef = {
  step: number;
  type: "text" | "choice";
  key: string;
  label: string;
  shortLabel?: string;
  inputType?: string;
  numeric?: boolean;
  email?: boolean;
  textarea?: boolean;
  placeholder?: string;
  options?: string[];
  revealOn?: string;
  revealKey?: string;
  revealLabel?: string;
  revealCountries?: boolean;
  required: boolean;
};

const FIELDS: FieldDef[] = [
  { step: 0, type: "text", key: "email", label: "Correo electrónico", inputType: "email", email: true, required: true },
  { step: 0, type: "text", key: "nombres", label: "Nombres y apellidos completos", required: false },
  { step: 0, type: "text", key: "cedula", label: "Número de cédula", numeric: true, required: true },
  { step: 0, type: "text", key: "fechaNacimiento", label: "Fecha de nacimiento", inputType: "date", required: true },
  { step: 0, type: "choice", key: "estadoCivil", label: "Estado civil", options: ["Casado", "Soltero", "Viudo", "Separado", "Otro"], revealOn: "Otro", revealKey: "estadoCivilOtro", required: true },
  { step: 0, type: "text", key: "nacionalidad", label: "Nacionalidad", required: true },
  { step: 0, type: "choice", key: "otraNacionalidad", label: "¿Tiene otra nacionalidad?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "otraNacionalidadCual", revealLabel: "¿Cuál?", required: true },
  { step: 0, type: "choice", key: "educacion", label: "Nivel más alto de educación", options: ["Escuela secundaria", "Pregrado", "Posgrado", "Doctorado", "Otro"], revealOn: "Otro", revealKey: "educacionOtro", required: true },
  { step: 0, type: "text", key: "institucion", label: "Institución donde se graduó", required: true },

  { step: 1, type: "text", key: "direccion", label: "Dirección de residencia actual", required: true },
  { step: 1, type: "text", key: "telefono", label: "Número de teléfono", inputType: "tel", numeric: true, required: true },
  { step: 1, type: "text", key: "correoElectronico", label: "Correo electrónico (confirmación)", inputType: "email", email: true, required: true },
  { step: 1, type: "text", key: "padreNombre", label: "Nombre y apellido del padre", shortLabel: "Nombre y apellido", required: true },
  { step: 1, type: "text", key: "padreNacionalidad", label: "Nacionalidad del padre", shortLabel: "Nacionalidad", required: true },
  { step: 1, type: "text", key: "padreFecha", label: "Fecha de nacimiento del padre", shortLabel: "Fecha de nacimiento", inputType: "date", required: true },
  { step: 1, type: "text", key: "madreNombre", label: "Nombre y apellido de la madre", shortLabel: "Nombre y apellido", required: true },
  { step: 1, type: "text", key: "madreNacionalidad", label: "Nacionalidad de la madre", shortLabel: "Nacionalidad", required: true },
  { step: 1, type: "text", key: "madreFecha", label: "Fecha de nacimiento de la madre", shortLabel: "Fecha de nacimiento", inputType: "date", required: true },

  { step: 2, type: "choice", key: "parientesChina", label: "¿Tiene parientes (aparte de sus padres) en China?", options: ["Sí", "No"], required: true },
  { step: 2, type: "text", key: "contactoNombre", label: "Nombre y apellido del contacto de emergencia", required: true },
  { step: 2, type: "text", key: "contactoParentesco", label: "Parentesco del contacto de emergencia", required: true },
  { step: 2, type: "text", key: "contactoTelefono", label: "Teléfono del contacto de emergencia", inputType: "tel", numeric: true, required: true },
  { step: 2, type: "text", key: "contactoCorreo", label: "Correo del contacto de emergencia", inputType: "email", email: true, required: true },
  { step: 2, type: "choice", key: "quienPaga", label: "¿Quién pagará el viaje?", options: ["Yo", "Empresa", "Otro"], revealOn: "Otro", revealKey: "quienPagaOtro", required: true },
  { step: 2, type: "choice", key: "haEstadoChina", label: "¿Alguna vez ha estado en China?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "haEstadoChinaFechas", revealLabel: "¿En qué fechas?", required: true },

  { step: 3, type: "choice", key: "otrasVisasVigentes", label: "¿Posee alguna visa válida emitida por otros países?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "otrasVisasVigentesPaises", revealLabel: "Escribe un país y presiona Enter", revealCountries: true, required: true },
  { step: 3, type: "choice", key: "visaNegada", label: "¿Alguna vez le han negado la visa a China?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "ingresoIlegal", label: "¿Ha ingresado a China ilegalmente, o permanecido/trabajado sin permiso?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "antecedentesPenales", label: "¿Tiene antecedentes penales en China o en otro país?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "epidemias", label: "¿Ha visitado zonas con alguna epidemia en los últimos 30 días?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "formacionArmas", label: "¿Tiene formación en armas, explosivos o productos biológicos/químicos?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "servicioMilitar", label: "¿Está sirviendo o ha servido en el ejército?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "paramilitar", label: "¿Ha participado en organizaciones paramilitares o fuerzas armadas irregulares?", options: ["Sí", "No"], required: true },
  { step: 3, type: "choice", key: "organizacionBenefica", label: "¿Trabaja para alguna organización profesional, social o benéfica?", options: ["Sí", "No"], required: true },
  { step: 3, type: "text", key: "declaracionAdicional", label: "¿Hay algo más que quieras declarar?", textarea: true, required: true },

  { step: 4, type: "choice", key: "ocupacion", label: "Ocupación", options: ["Empresario", "Jubilado", "Empleado de empresa", "Artista", "Estudiante", "Personal militar", "Trabajador por cuenta propia", "Otro"], revealOn: "Otro", revealKey: "ocupacionOtro", required: true },
  { step: 4, type: "text", key: "expEmpresa", label: "Empresa (últimos 5 años)", required: true },
  { step: 4, type: "text", key: "expCargo", label: "Cargo", required: true },
  { step: 4, type: "text", key: "expFechas", label: "Fechas (desde – hasta)", required: true },
  { step: 4, type: "text", key: "expDireccion", label: "Dirección de la empresa", required: true },
  { step: 4, type: "text", key: "expTelefono", label: "Teléfono de la empresa", inputType: "tel", numeric: true, required: true },
  { step: 4, type: "text", key: "expSupervisor", label: "Nombre del supervisor", required: true },
  { step: 4, type: "choice", key: "visaChinaAprobada", label: "¿Le han aprobado alguna vez la visa a China?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "lugarEmisionVisa", revealLabel: "Lugar de emisión", required: true },
  { step: 4, type: "choice", key: "tieneHijos", label: "¿Tiene hijos?", options: ["Sí", "No"], revealOn: "Sí", revealKey: "hijosDetalle", revealLabel: "Nombres y fechas de nacimiento de tus hijos", required: true },
];

const STEP_LABELS = ["Datos", "Familia", "Emergencia", "Antecedentes", "Ocupación", "Revisión"];

type FormData = Record<string, any>;

function defaultData(): FormData {
  const d: FormData = {};
  FIELDS.forEach((f) => { if (f.type === "choice" && f.options?.includes("No")) d[f.key] = "No"; });
  d.paisNacimiento = "Colombia";
  d.paisResidencia = "Colombia";
  return d;
}

function emailSuggestions(value: string): string[] {
  if (!value) return [];
  const at = value.indexOf("@");
  if (at === -1) return EMAIL_DOMAINS.map((d) => value + "@" + d);
  const local = value.slice(0, at);
  const partial = value.slice(at + 1);
  if (!local) return [];
  return EMAIL_DOMAINS.filter((d) => d.startsWith(partial)).map((d) => local + "@" + d);
}

const colors = { bg: "#f7f0e4", card: "#fdf9f0", ink: "#3a2c22", muted: "#7c6a58", faint: "#9a8a76", teal: "#14514f", terracotta: "#bd5a34", cream: "#fdf7ec" };

const inputStyle = (invalid: boolean): React.CSSProperties => ({ padding: "11px 13px", borderRadius: 10, border: invalid ? "1.5px solid #bd5a34" : "1px solid rgba(58,44,34,.18)", background: "#fff", fontSize: 14, height: 42, width: "100%", fontFamily: "inherit" });
const labelStyle = (invalid: boolean): React.CSSProperties => ({ fontSize: 12.5, fontWeight: 700, color: invalid ? colors.terracotta : colors.ink, marginBottom: 6, display: "block" });

export default function VisaChinaForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(defaultData);
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [revealBuffers, setRevealBuffers] = useState<Record<string, string>>({});
  const [paisVisitadoInput, setPaisVisitadoInput] = useState("");

  const setField = (key: string, val: any) => { setData((d) => ({ ...d, [key]: val })); setShowError(false); };

  const isFieldInvalid = (f: FieldDef) => {
    if (!f.required) return false;
    const empty = !data[f.key] || !String(data[f.key]).trim();
    if (empty) return true;
    if (f.revealOn && data[f.key] === f.revealOn) {
      if (f.revealCountries) return !data[f.revealKey!] || !data[f.revealKey!].length;
      return !data[f.revealKey!] || !String(data[f.revealKey!]).trim();
    }
    return false;
  };

  const isStepValid = (stepIndex: number) => {
    const stepFields = FIELDS.filter((f) => f.step === stepIndex);
    if (stepFields.some((f) => showErrorCheck(f))) return false;
    if (stepIndex === 0 && (!data.paisNacimiento || !data.departamentoNacimiento || !data.ciudadNacimiento)) return false;
    if (stepIndex === 1 && (!data.paisResidencia || !data.departamentoResidencia || !data.ciudadResidencia)) return false;
    if (stepIndex === 4 && (!data.paisesVisitadosList || !data.paisesVisitadosList.length)) return false;
    return true;
    function showErrorCheck(f: FieldDef) {
      if (!f.required) return false;
      if (!data[f.key] || !String(data[f.key]).trim()) return true;
      if (f.revealOn && data[f.key] === f.revealOn) {
        if (f.revealCountries) return !data[f.revealKey!] || !data[f.revealKey!].length;
        return !data[f.revealKey!] || !String(data[f.revealKey!]).trim();
      }
      return false;
    }
  };

  const goNext = () => { if (!isStepValid(step)) { setShowError(true); return; } setStep((s) => Math.min(5, s + 1)); setShowError(false); };
  const goBack = () => { setStep((s) => Math.max(0, s - 1)); setShowError(false); };

  const addChip = (revealKey: string, val: string) => {
    const v = val.trim();
    if (!v) return;
    const list: string[] = data[revealKey] || [];
    if (!list.includes(v)) setField(revealKey, [...list, v]);
    setRevealBuffers((b) => ({ ...b, [revealKey]: "" }));
  };
  const removeChip = (revealKey: string, val: string) => setField(revealKey, (data[revealKey] || []).filter((x: string) => x !== val));

  const submitForm = () => {
    setSubmitting(true);
    const payload = { ...data, _enviado: new Date().toISOString() };
    const done = () => { setSubmitting(false); setSubmitted(true); };
    // XMLHttpRequest (not fetch): Apps Script /exec responds with a 302 redirect, and
    // fetch's no-cors mode silently follows it by converting the POST into a GET, which
    // drops the body — so the sheet never receives the data. XHR preserves the POST through it.
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", SHEETS_WEBHOOK_URL, true);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
      xhr.onload = done;
      xhr.onerror = done;
      xhr.send(JSON.stringify(payload));
    } catch (e) { done(); }
  };

  const renderField = (f: FieldDef) => {
    const invalid = showError && isFieldInvalid(f);
    const isChoice = f.type === "choice";
    const span = f.textarea || isChoice ? "1 / -1" : "auto";
    return (
      <div key={f.key} style={{ gridColumn: span, display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle(invalid)}>{f.shortLabel || f.label}{f.required ? " *" : ""}</label>
        {!isChoice && f.textarea && (
          <textarea value={data[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} placeholder={f.placeholder || ""} rows={3} style={{ ...inputStyle(invalid), height: "auto", resize: "vertical" }} />
        )}
        {!isChoice && !f.textarea && (
          <>
            <input
              type={f.inputType || "text"}
              inputMode={f.numeric ? "numeric" : undefined}
              list={f.email ? `dl-${f.key}` : undefined}
              value={data[f.key] || ""}
              onChange={(e) => setField(f.key, f.numeric ? e.target.value.replace(/\D/g, "") : e.target.value)}
              placeholder={f.placeholder || ""}
              style={inputStyle(invalid)}
            />
            {f.email && (
              <datalist id={`dl-${f.key}`}>
                {emailSuggestions(data[f.key] || "").map((opt) => <option key={opt} value={opt} />)}
              </datalist>
            )}
          </>
        )}
        {isChoice && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {f.options!.map((opt) => {
                const selected = data[f.key] === opt;
                return (
                  <button type="button" key={opt} onClick={() => setField(f.key, opt)} style={{ padding: "8px 16px", borderRadius: 999, border: `1.5px solid ${selected ? colors.teal : invalid ? colors.terracotta : "rgba(58,44,34,.2)"}`, background: selected ? colors.teal : "#fff", color: selected ? colors.cream : colors.ink, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {f.revealOn && data[f.key] === f.revealOn && !f.revealCountries && (
              <input value={data[f.revealKey!] || ""} onChange={(e) => setField(f.revealKey!, e.target.value)} placeholder={f.revealLabel || "Especifica cuál"} style={{ ...inputStyle(showError && !String(data[f.revealKey!] || "").trim()), marginTop: 6 }} />
            )}
            {f.revealOn && data[f.key] === f.revealOn && f.revealCountries && (
              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(data[f.revealKey!] || []).map((p: string) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px 6px 12px", borderRadius: 999, background: colors.teal, color: colors.cream, fontSize: 12.5, fontWeight: 600 }}>
                      <span>{p}</span>
                      <button type="button" onClick={() => removeChip(f.revealKey!, p)} aria-label="Quitar" style={{ width: 16, height: 16, borderRadius: "50%", border: "none", background: "rgba(253,247,236,.2)", color: colors.cream, fontSize: 11, cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <input
                    list={`dl-${f.revealKey}`}
                    value={revealBuffers[f.revealKey!] || ""}
                    onChange={(e) => setRevealBuffers((b) => ({ ...b, [f.revealKey!]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addChip(f.revealKey!, revealBuffers[f.revealKey!] || ""); } }}
                    placeholder={f.revealLabel}
                    style={{ ...inputStyle(false), flex: 1 }}
                  />
                  <button type="button" onClick={() => setField(f.revealKey!, ["Ninguno"])} style={{ padding: "0 16px", borderRadius: 10, border: "1.5px solid rgba(58,44,34,.2)", background: "#fff", color: colors.ink, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Ninguno</button>
                </div>
                <datalist id={`dl-${f.revealKey}`}>{WORLD_COUNTRIES.map((c) => <option key={c} value={c} />)}</datalist>
              </div>
            )}
          </>
        )}
        {invalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
      </div>
    );
  };

  // Location block (nacimiento / residencia), same UX: País → Departamento → Ciudad, Colombia-aware
  const LocationBlock = ({ prefix, title }: { prefix: "Nacimiento" | "Residencia"; title: string }) => {
    const paisKey = prefix === "Nacimiento" ? "paisNacimiento" : "paisResidencia";
    const deptoKey = prefix === "Nacimiento" ? "departamentoNacimiento" : "departamentoResidencia";
    const ciudadKey = prefix === "Nacimiento" ? "ciudadNacimiento" : "ciudadResidencia";
    const pais = data[paisKey] || "";
    const depto = data[deptoKey] || "";
    const isColombia = pais === "Colombia";
    const paisInvalid = showError && !pais;
    const deptoInvalid = showError && !depto;
    const ciudadInvalid = showError && !data[ciudadKey];
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={labelStyle(paisInvalid)}>País de {title} *</label>
          <select value={pais} onChange={(e) => setData((d) => ({ ...d, [paisKey]: e.target.value, [deptoKey]: "", [ciudadKey]: "" }))} style={inputStyle(paisInvalid)}>
            <option value="">Selecciona…</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {paisInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={labelStyle(deptoInvalid)}>Departamento / Estado de {title} *</label>
          {isColombia ? (
            <select value={depto} onChange={(e) => setData((d) => ({ ...d, [deptoKey]: e.target.value, [ciudadKey]: "" }))} style={inputStyle(deptoInvalid)}>
              <option value="">Selecciona…</option>
              {Object.keys(COLOMBIA_GEO).map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          ) : (
            <input value={depto} onChange={(e) => setField(deptoKey, e.target.value)} placeholder="Departamento / Estado" style={inputStyle(deptoInvalid)} />
          )}
          {deptoInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={labelStyle(ciudadInvalid)}>Ciudad de {title} *</label>
          {isColombia ? (
            <select value={data[ciudadKey] || ""} onChange={(e) => setField(ciudadKey, e.target.value)} style={inputStyle(ciudadInvalid)}>
              <option value="">Selecciona…</option>
              {(COLOMBIA_GEO[depto] || []).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          ) : (
            <input value={data[ciudadKey] || ""} onChange={(e) => setField(ciudadKey, e.target.value)} placeholder="Ciudad" style={inputStyle(ciudadInvalid)} />
          )}
          {ciudadInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Campo obligatorio</span>}
        </div>
      </>
    );
  };

  const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 };

  const paisesVisitadosList: string[] = data.paisesVisitadosList || [];
  const paisesVisitadosInvalid = showError && !paisesVisitadosList.length;

  const reviewFields = FIELDS.map((f) => {
    let val = data[f.key];
    if (f.revealOn && val === f.revealOn && data[f.revealKey!]) val = val + " — " + (Array.isArray(data[f.revealKey!]) ? data[f.revealKey!].join(", ") : data[f.revealKey!]);
    return { label: f.label, value: val || "" };
  }).filter((r) => r.value);
  // insert location + países visitados at sensible positions
  const fechaNacIdx = reviewFields.findIndex((r) => r.label === "Fecha de nacimiento");
  reviewFields.splice(fechaNacIdx + 1, 0,
    { label: "País de nacimiento", value: data.paisNacimiento || "" },
    { label: "Departamento / Estado de nacimiento", value: data.departamentoNacimiento || "" },
    { label: "Ciudad de nacimiento", value: data.ciudadNacimiento || "" }
  );
  const direccionIdx = reviewFields.findIndex((r) => r.label === "Dirección de residencia actual");
  reviewFields.splice(direccionIdx + 1, 0,
    { label: "País de residencia", value: data.paisResidencia || "" },
    { label: "Departamento / Estado", value: data.departamentoResidencia || "" },
    { label: "Ciudad", value: data.ciudadResidencia || "" }
  );
  if (paisesVisitadosList.length) reviewFields.push({ label: "Países visitados en los últimos 2 años", value: paisesVisitadosList.join(", ") });

  return (
    <div style={{ minHeight: "100vh", padding: "clamp(20px,5vw,56px) 16px", display: "flex", justifyContent: "center", background: colors.bg, color: colors.ink, fontFamily: "'Karla',system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 13, letterSpacing: ".3em", color: colors.terracotta, marginBottom: 8 }}>WONDERLUST · TRÁMITE DE VISA</div>
          <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(26px,4vw,36px)", margin: 0, color: colors.teal }}>Formulario Visa China</h1>
          <p style={{ fontSize: 14.5, color: colors.muted, margin: "10px auto 0", maxWidth: 480, lineHeight: 1.55 }}>Completa tus datos con calma — puedes ir y volver entre pasos. Al final tu formulario queda registrado con nosotros para iniciar tu trámite.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 26 }}>
          {STEP_LABELS.map((label, i) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: i < step ? "pointer" : "default" }} onClick={() => i < step && setStep(i)}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, border: `1.5px solid ${colors.teal}`, background: i <= step ? colors.teal : colors.card, color: i <= step ? colors.cream : colors.teal }}>{i + 1}</div>
              <div style={{ fontSize: 10, letterSpacing: ".04em", color: i === step ? colors.teal : colors.faint, textAlign: "center" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 3, background: "rgba(58,44,34,.1)", borderRadius: 2, marginBottom: 30, overflow: "hidden" }}>
          <div style={{ height: "100%", background: colors.terracotta, borderRadius: 2, transition: "width .35s ease", width: `${(step / 5) * 100}%` }} />
        </div>

        <div style={{ background: colors.card, borderRadius: 20, padding: "clamp(22px,4vw,38px)", boxShadow: "0 10px 40px rgba(58,44,34,.08)", border: "1px solid rgba(58,44,34,.07)" }}>
          {step === 0 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Datos personales</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Tal como aparecen en tu pasaporte.</div>
              <div style={gridStyle}>
                {FIELDS.filter((f) => f.step === 0).slice(0, 4).map(renderField)}
                <LocationBlock prefix="Nacimiento" title="nacimiento" />
                {FIELDS.filter((f) => f.step === 0).slice(4).map(renderField)}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Contacto y familia</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Necesitamos estos datos para el formulario consular.</div>
              <div style={{ ...gridStyle, marginBottom: 22 }}>
                {FIELDS.filter((f) => f.step === 1 && !f.key.startsWith("padre") && !f.key.startsWith("madre")).map(renderField)}
                <LocationBlock prefix="Residencia" title="residencia" />
              </div>
              <div style={{ background: colors.bg, borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14.5, color: colors.terracotta, letterSpacing: ".06em", marginBottom: 14 }}>DATOS DEL PADRE</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                  {FIELDS.filter((f) => f.key.startsWith("padre")).map(renderField)}
                </div>
              </div>
              <div style={{ background: colors.bg, borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 14.5, color: colors.terracotta, letterSpacing: ".06em", marginBottom: 14 }}>DATOS DE LA MADRE</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                  {FIELDS.filter((f) => f.key.startsWith("madre")).map(renderField)}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>China y contacto de emergencia</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Un contacto de confianza en caso de emergencia durante tu viaje.</div>
              <div style={gridStyle}>{FIELDS.filter((f) => f.step === 2).map(renderField)}</div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Antecedentes y seguridad</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Preguntas obligatorias del consulado chino. Responde con sinceridad.</div>
              <div style={gridStyle}>{FIELDS.filter((f) => f.step === 3).map(renderField)}</div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Ocupación y viaje</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 22 }}>Últimos datos antes de revisar tu formulario.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}>
                <label style={labelStyle(paisesVisitadosInvalid)}>Países visitados en los últimos 2 años *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {paisesVisitadosList.map((p) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 8px 14px", borderRadius: 999, background: colors.teal, color: colors.cream, fontSize: 13, fontWeight: 600 }}>
                      <span>{p}</span>
                      <button type="button" onClick={() => setField("paisesVisitadosList", paisesVisitadosList.filter((x) => x !== p))} aria-label="Quitar" style={{ width: 18, height: 18, borderRadius: "50%", border: "none", background: "rgba(253,247,236,.2)", color: colors.cream, fontSize: 12, cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>
                <input
                  list="dl-paises-visitados"
                  value={paisVisitadoInput}
                  onChange={(e) => setPaisVisitadoInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); const v = paisVisitadoInput.trim(); if (v && !paisesVisitadosList.includes(v)) setField("paisesVisitadosList", [...paisesVisitadosList, v]); setPaisVisitadoInput(""); } }}
                  placeholder="Escribe un país y presiona Enter"
                  style={inputStyle(paisesVisitadosInvalid)}
                />
                <datalist id="dl-paises-visitados">{WORLD_COUNTRIES.map((c) => <option key={c} value={c} />)}</datalist>
                {paisesVisitadosInvalid && <span style={{ fontSize: 11.5, color: colors.terracotta }}>Agrega al menos un país</span>}
              </div>
              <div style={gridStyle}>{FIELDS.filter((f) => f.step === 4).map(renderField)}</div>
            </>
          )}

          {step === 5 && !submitted && (
            <>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: colors.teal, marginBottom: 4 }}>Revisa y envía</div>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 20 }}>Verifica tus respuestas antes de enviar tu formulario.</div>
              <div style={{ background: colors.bg, borderRadius: 14, padding: "16px 18px", maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {reviewFields.map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", gap: 14, fontSize: 13, borderBottom: "1px solid rgba(58,44,34,.08)", paddingBottom: 8 }}>
                    <span style={{ color: colors.muted, flexShrink: 0, maxWidth: "55%" }}>{r.label}</span>
                    <span style={{ fontWeight: 600, textAlign: "right" }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#fff", border: "1px solid rgba(224,169,74,.4)", borderRadius: 12, padding: "14px 16px", marginBottom: 22 }}>
                <span style={{ fontSize: 18 }}>📎</span>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>No olvides tener a la mano la <strong>foto de tu pasaporte</strong>: te la pediremos en el siguiente paso de tu trámite.</div>
              </div>
              <button type="button" onClick={submitForm} disabled={submitting} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: colors.teal, color: colors.cream, fontSize: 15.5, fontWeight: 700, padding: 16, border: "none", borderRadius: 12, cursor: "pointer" }}>
                Enviar formulario
              </button>
            </>
          )}

          {submitted && (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 22, color: colors.teal, marginBottom: 10 }}>¡Formulario recibido!</div>
              <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>Ya guardamos tus datos de forma privada. Nuestro equipo se pondrá en contacto contigo para continuar con tu trámite de Visa China.</div>
            </div>
          )}

          {showError && step !== 5 && <div style={{ marginTop: 16, color: colors.terracotta, fontSize: 13, fontWeight: 600 }}>Por favor completa los campos marcados con * antes de continuar.</div>}

          {!submitted && (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 28, paddingTop: 22, borderTop: "1px solid rgba(58,44,34,.08)" }}>
              {step === 0 ? <span /> : <button type="button" onClick={goBack} style={{ padding: "13px 24px", borderRadius: 10, border: "1.5px solid rgba(58,44,34,.25)", background: "transparent", color: colors.ink, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Atrás</button>}
              {step !== 5 && <button type="button" onClick={goNext} style={{ padding: "13px 30px", borderRadius: 10, border: "none", background: colors.teal, color: colors.cream, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Siguiente</button>}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: colors.faint, marginTop: 20 }}>Wonderlust — Agencia de viajes · Bogotá · Tus datos solo se usan para tramitar tu visa.</div>
      </div>
    </div>
  );
}
