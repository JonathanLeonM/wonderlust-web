"use client";

/**
 * Wonderlust · Devolución de pasaportes
 * Ruta sugerida: app/devolucion-pasaportes/page.tsx
 *
 * Llega con ?cedula=123 desde la sección "Mi pasaporte" del home y consulta solo.
 * El Sheet devuelve el estado de la visa, el nombre y la cédula, pero NINGÚN
 * dato de contacto (dirección, teléfono, correo). Los datos de entrega los
 * diligencia la persona en el formulario.
 * COLOMBIA_GEO / deptoKeysBogotaFirst son los MISMOS que están inlineados hoy en
 * visa-china-form.tsx: extráelos a lib/colombia-geo.ts y ambos formularios lo usan.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { COLOMBIA_GEO, deptoKeysBogotaFirst } from "@/lib/colombia-geo";

const WA = "https://wa.me/573134883629";
const OFICINA = "CL 53B # 24 - 30 Oficina 301, Bogotá D.C.";

type Registro = {
  nombre: string; cedula: string; visa: string; aprobacion: string; tramite: string; fila: number;
};
type Entrega = {
  radicado: string; fecha: string; modo: string; rol: string; codigo: string;
  sim: string; simTipo: string; nombre?: string; destino: string;
};
type Grupo = { codigo?: string; nombre?: string; destino?: string; personas?: number; sinVerificar?: boolean };
type Modo = "" | "recoger" | "envio" | "grupo";
type Rol = "" | "crear" | "unir";

type Campo = {
  k: string; l: string; req?: boolean; ph?: string; mode?: string; help?: string;
  span?: string; area?: boolean; sel?: "depto" | "ciudad"; dir?: boolean;
};

const CAMPOS: Campo[] = [
  { k: "nombre", l: "Nombre de quien recibe", req: true, ph: "Nombre y apellidos", span: "1/-1" },
  { k: "cedulaRec", l: "Cédula de quien recibe", req: true, mode: "numeric", help: "Si no eres el titular, adjuntaremos carta de autorización." },
  { k: "telefono", l: "Teléfono de contacto", req: true, mode: "tel" },
  { k: "telefono2", l: "Teléfono alterno", ph: "Opcional" },
  { k: "correo", l: "Correo electrónico", req: true, mode: "email" },
  { k: "depto", l: "Departamento", req: true, sel: "depto", dir: true },
  { k: "ciudad", l: "Ciudad o municipio", req: true, sel: "ciudad", dir: true },
  { k: "direccion", l: "Dirección completa", req: true, area: true, span: "1/-1", dir: true, ph: "Calle, número, apartamento, barrio", help: "Incluye conjunto, torre, apartamento y puntos de referencia." },
  { k: "notas", l: "Indicaciones para el mensajero", area: true, span: "1/-1", dir: true, ph: "Horario preferido, portería, con quién dejarlo…" },
];

/* Todo pasa por /api/sheet: el navegador no puede llamar a Google directo. */
async function pedir(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch("/api/sheet?" + qs, { cache: "no-store" });
  if (!r.ok) throw new Error("http " + r.status);
  return r.json();
}

const norm = (s: string) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

export default function DevolucionPasaportes() {
  const [vista, setVista] = useState<"consulta" | "resultado" | "listo">("consulta");
  const [cedula, setCedula] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");
  const [reg, setReg] = useState<Registro | null>(null);
  const [entrega, setEntrega] = useState<Entrega | null>(null);
  const [modo, setModo] = useState<Modo>("");
  const [sim, setSim] = useState("");
  const [simTipo, setSimTipo] = useState("");
  const [grupoRol, setGrupoRol] = useState<Rol>("");
  const [codigo, setCodigo] = useState("");
  const [grupoInfo, setGrupoInfo] = useState<Grupo | null>(null);
  const [buscandoGrupo, setBuscandoGrupo] = useState(false);
  const [vals, setVals] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [radicado, setRadicado] = useState("");
  const [codigoGrupo, setCodigoGrupo] = useState("");
  const [aceptaPago, setAceptaPago] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const deptoKeys = useMemo(() => deptoKeysBogotaFirst(), []);
  const pideDatos = modo === "envio" || (modo === "grupo" && grupoRol === "crear");
  /* Solo quien paga el envío confirma el contraentrega: no quien se une a un grupo. */
  const pidePago = pideDatos;
  const listoParaDatos = !!modo && !(modo === "grupo" && !grupoRol);
  const campos = CAMPOS.filter((f) => !f.dir || pideDatos);
  const falta = listoParaDatos ? campos.filter((f) => f.req && !String(vals[f.k] || "").trim()).map((f) => f.k) : [];

  const toTop = () => {
    const n = topRef.current;
    if (n && n.getBoundingClientRect().top < 0) window.scrollTo({ top: n.offsetTop - 20, behavior: "smooth" });
  };

  const buscar = (cedIn?: string) => {
    const c = String(cedIn ?? cedula).replace(/\D/g, "");
    if (c.length < 5) { setError("Escribe un número de cédula válido (solo números)."); return; }
    setBuscando(true); setError("");
    pedir({ accion: "consultar", cedula: c })
      .then((j) => {
        setBuscando(false);
        if (!j || !j.ok || !j.registro) {
          setError(
            j && j.error === "demasiados-intentos"
              ? "Demasiados intentos. Espera " + (j.minutos || 15) + " minutos e inténtalo de nuevo."
              : "No encontramos una solicitud con esa cédula. Verifica el número o escríbenos por WhatsApp."
          );
          return;
        }
        setCedula(c);
        setReg(j.registro); setEntrega(j.entrega || null); setVista("resultado");
        setModo(""); setSim(""); setSimTipo(""); setGrupoRol(""); setCodigo(""); setGrupoInfo(null);
        setTouched(false); setVals({}); setAceptaPago(false);
        setTimeout(toTop, 60);
      })
      .catch(() => { setBuscando(false); setError("No pudimos consultar en este momento. Intenta de nuevo o escríbenos por WhatsApp."); });
  };

  /* Llega desde el home con ?cedula=... → consulta sola. */
  useEffect(() => {
    const c = (new URLSearchParams(window.location.search).get("cedula") || "").replace(/\D/g, "");
    if (c.length >= 5) { setCedula(c); buscar(c); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarGrupo = () => {
    const cod = codigo.trim().toUpperCase();
    if (cod.length < 4) { setError("Escribe el código de grupo completo (ej. GR-4821)."); return; }
    setBuscandoGrupo(true); setError(""); setGrupoInfo(null);
    pedir({ accion: "grupo", codigo: cod })
      .then((j) => {
        setBuscandoGrupo(false); setCodigo(cod);
        if (j && j.ok && j.grupo) setGrupoInfo(j.grupo);
        else setError("No encontramos un grupo con ese código. Pídeselo de nuevo a la persona que recibe el paquete.");
      })
      .catch(() => { setBuscandoGrupo(false); setGrupoInfo({ sinVerificar: true }); });
  };

  const enviar = () => {
    if (!reg) return;
    if (!sim) { setError("Cuéntanos si tomaste la opción de SIM card."); return; }
    if (sim === "Sí" && !simTipo) { setError("Indica si tu SIM es física o digital."); return; }
    if (!modo) { setError("Elige cómo quieres recibir el pasaporte."); return; }
    if (modo === "grupo" && !grupoRol) { setError("Dinos si tú recibes el paquete del grupo o si te unes a uno."); return; }
    if (modo === "grupo" && grupoRol === "unir" && !grupoInfo) { setError("Verifica primero el código de grupo."); return; }
    if (falta.length) { setTouched(true); setError("Completa los campos marcados en rojo (" + falta.length + ")."); return; }
    if (pidePago && !aceptaPago) { setError("Confirma que el valor del envío se paga contraentrega al mensajero."); return; }

    const rad = "WL-" + String(Date.now()).slice(-6);
    const creaGrupo = modo === "grupo" && grupoRol === "crear";
    const cod = creaGrupo ? "GR-" + String(1000 + Math.floor(Math.random() * 9000)) : modo === "grupo" ? codigo : "";
    const etiquetaModo =
      modo === "recoger" ? "Recoger en oficina"
      : modo === "envio" ? "Envío a domicilio"
      : creaGrupo ? "Envío en grupo — recibe el paquete" : "Envío en grupo — se une";

    const payload: Record<string, string> = {
      Marca: "Wonderlust", Tramite: "Devolución de Pasaportes", Radicado: rad,
      FechaEnvio: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
      "Cédula consultada": cedula, Solicitante: reg.nombre, "Trámite original": reg.tramite,
      "Número de visa": reg.visa || "", "Fila de origen": String(reg.fila || ""),
      "SIM card": sim, "Tipo de SIM": sim === "Sí" ? simTipo : "",
      "Modo de entrega": etiquetaModo,
      "Punto de recogida": modo === "recoger" ? OFICINA : "",
      "Pago contraentrega": pidePago ? (aceptaPago ? "Sí, acepta" : "") : "No aplica",
      "Código de grupo": cod,
      "Rol en el grupo": modo === "grupo" ? (creaGrupo ? "Recibe" : "Se une") : "",
      "Grupo verificado": modo === "grupo" && grupoRol === "unir" ? (grupoInfo?.sinVerificar ? "No (revisar manual)" : "Sí") : "",
    };
    CAMPOS.forEach((f) => { payload["Envío — " + f.l] = String(vals[f.k] || "").trim(); });

    setEnviando(true); setError("");
    pedir({ accion: "registrar", datos: JSON.stringify(payload) })
      .then((j) => {
        setEnviando(false);
        if (j && j.ok === false && j.error === "ya-registrado") {
          setEntrega(j.entrega || null); setModo(""); setTimeout(toTop, 60); return;
        }
        setRadicado(rad); setCodigoGrupo(creaGrupo ? cod : ""); setVista("listo");
      })
      .catch(() => { setEnviando(false); setError("No pudimos registrar la solicitud. Intenta de nuevo o escríbenos por WhatsApp."); });
  };

  const volver = () => {
    setVista("consulta"); setCedula(""); setReg(null); setEntrega(null); setModo(""); setSim(""); setSimTipo("");
    setGrupoRol(""); setCodigo(""); setGrupoInfo(null); setTouched(false); setError(""); setCodigoGrupo("");
    setVals({}); setAceptaPago(false);
    setTimeout(toTop, 60);
  };

  /* ── Derivados de presentación ─────────────────────────────── */
  const visaReal = String(reg?.visa || "").trim();
  const aprobada = !!visaReal;
  const yaRegistrado = !!entrega;
  const esGrupoPrev = !!entrega && /grupo/i.test(entrega.modo || "");
  const recibePrev = esGrupoPrev && /recibe/i.test(entrega?.rol || "");
  const simListo = sim === "No" || (sim === "Sí" && !!simTipo);
  const hasModo = listoParaDatos;

  const resumen = reg
    ? [
        { label: "Solicitante", value: reg.nombre || "—" },
        { label: "Cédula", value: reg.cedula || "—" },
        { label: "Tipo de visa", value: /respuesta|hoja/i.test(reg.tramite || "") ? "Solicitud de visa" : reg.tramite || "—" },
        { label: "Estado", value: aprobada ? "Aprobada" : "En trámite" },
        { label: "Fecha de aprobación", value: aprobada ? (reg.aprobacion || "—") : "Pendiente" },
      ]
    : [];

  const yaDatos = entrega
    ? [
        { label: "Radicado", value: entrega.radicado || "—" },
        { label: "Fecha de registro", value: entrega.fecha || "—" },
        entrega.destino ? { label: "Destino", value: entrega.destino } : null,
        entrega.codigo ? { label: recibePrev ? "Tu código de grupo" : "Código de grupo", value: entrega.codigo } : null,
        entrega.sim ? { label: "SIM card", value: entrega.sim === "Sí" ? entrega.simTipo || "Sí" : "No" } : null,
      ].filter(Boolean as any as (v: any) => boolean) as { label: string; value: string }[]
    : [];

  const yaTexto = !entrega ? ""
    : recibePrev
    ? "Comparte tu código de grupo con las demás personas para que se sumen a tu paquete. La entrega se registra una sola vez: si necesitas corregir algo, escríbenos por WhatsApp."
    : /recoger/i.test(entrega.modo || "")
    ? "Tu pasaporte está separado en la oficina a tu nombre. Llévate tu cédula original y muestra este radicado. La entrega se registra una sola vez: si necesitas corregir algo, escríbenos por WhatsApp."
    : "Ya tenemos tu entrega programada y te avisamos por WhatsApp cuando salga. La entrega se registra una sola vez: si necesitas corregir algo, escríbenos por WhatsApp.";

  const datosTitulo =
    modo === "recoger" ? "Datos de quien recoge el pasaporte"
    : modo === "grupo" && grupoRol === "crear" ? "Datos de quien recibe el paquete del grupo"
    : modo === "grupo" ? "Tus datos de contacto"
    : "Datos de envío";
  const datosTexto =
    modo === "recoger" ? "Sin estos datos no podemos entregar el pasaporte en la oficina. Debe coincidir con la cédula que presenten al recogerlo."
    : modo === "grupo" && grupoRol === "crear" ? "Esta es la dirección donde llegarán todos los pasaportes del grupo. Revísala con cuidado."
    : modo === "grupo" ? "Los necesitamos para avisarte y para la carta que autoriza a quien recibe tu pasaporte."
    : "Escribe la dirección donde quieres recibir el pasaporte.";
  const avisoTexto =
    modo === "recoger" ? "Te esperamos en " + OFICINA + " con tu cédula original. Al confirmar te avisamos por WhatsApp y dejamos el pasaporte separado a tu nombre."
    : modo === "grupo"
    ? grupoRol === "unir"
      ? "Tu pasaporte viajará en el paquete del grupo. Quien lo reciba debe llevar carta de autorización y copia de tu cédula; te la enviamos por WhatsApp."
      : "Recibirás los pasaportes de todo el grupo: necesitamos carta de autorización de cada persona. Al confirmar te damos el código para compartir; el valor del envío lo pagas al mensajero al recibirlo."
    : "Revisa bien la dirección: los reenvíos por datos incorrectos tienen costo adicional. Ten listo el valor del envío para pagárselo al mensajero cuando llegue.";
  const btnEnviar = enviando ? "Registrando…"
    : modo === "recoger" ? "Confirmar que lo recojo en la oficina"
    : modo === "grupo" ? (grupoRol === "unir" ? "Sumarme al envío del grupo" : "Crear el grupo y confirmar envío")
    : "Confirmar envío a esta dirección";

  const etiquetaCampo = (f: Campo) => {
    const soloRecoge = modo === "recoger";
    const seUne = modo === "grupo" && grupoRol === "unir";
    if (f.k === "nombre") return seUne ? "Tu nombre completo" : soloRecoge ? "Nombre de quien recoge" : f.l;
    if (f.k === "cedulaRec") return seUne ? "Tu cédula" : soloRecoge ? "Cédula de quien recoge" : f.l;
    if (f.k === "telefono" && seUne) return "Tu teléfono de contacto";
    if (f.k === "correo" && seUne) return "Tu correo electrónico";
    return f.l;
  };
  const ayudaCampo = (f: Campo) => {
    const soloRecoge = modo === "recoger";
    const seUne = modo === "grupo" && grupoRol === "unir";
    if (f.k !== "cedulaRec") return f.help || "";
    if (seUne) return "Con estos datos preparamos la carta que autoriza a quien recibe el paquete del grupo.";
    if (soloRecoge) return "Debe ser la misma cédula que presenten en la oficina. Si no eres el titular, llevas carta de autorización.";
    return f.help || "";
  };

  /* ── Estilos compartidos ───────────────────────────────────── */
  const card = (activo: boolean, color: string): React.CSSProperties => ({
    cursor: "pointer", padding: 20, borderRadius: "2px 22px 2px 22px",
    border: activo ? "2px solid " + color : "1.5px solid rgba(22,40,63,.16)",
    background: activo ? (color === "#1f7a4d" ? "#eff8f2" : "#eef4fb") : "#fff",
    transition: "border-color .2s ease",
  });
  const chip: React.CSSProperties = { flex: "0 0 auto", padding: "4px 11px", borderRadius: 999, fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em" };
  const btnSec: React.CSSProperties = { padding: "13px 24px", borderRadius: 999, border: "2px solid #12325c", background: "#eef4fb", color: "#12325c", fontSize: 14, fontWeight: 700, fontFamily: "'Karla',sans-serif", cursor: "pointer", minHeight: 44 };
  const linkHome: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 999, border: "2px solid rgba(22,40,63,.18)", background: "#fff", color: "#44586e", fontSize: 14, fontWeight: 700, minHeight: 44, boxSizing: "border-box", textDecoration: "none" };
  const rotulo: React.CSSProperties = { fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#8496a9", fontWeight: 700, marginBottom: 5 };
  const tituloSec: React.CSSProperties = { fontFamily: "'Marcellus',serif", fontSize: 19, color: "#12325c" };
  const regla: React.CSSProperties = { flex: 1, height: 1, background: "linear-gradient(90deg,rgba(232,179,35,.55),rgba(232,179,35,0))" };

  return (
    <main style={{ minHeight: "100vh", padding: "clamp(20px,5vw,56px) 16px", display: "flex", justifyContent: "center", background: "#eaf0f7", fontFamily: "'Karla',system-ui,sans-serif", color: "#16283f" }}>
      <div style={{ width: "100%", maxWidth: 760 }} ref={topRef}>

        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: 11, letterSpacing: ".34em", color: "#c69214", fontWeight: 700, marginBottom: 10 }}>WONDERLUST · AGENCIA DE VIAJES</div>
          <div style={{ width: 56, height: 2, background: "#e8b323", margin: "0 auto 14px", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,3.6vw,32px)", margin: 0, color: "#12325c" }}>Entrega de tu pasaporte</h1>
          <p style={{ fontSize: 14.5, color: "#5d7189", margin: "10px auto 0", maxWidth: 520, lineHeight: 1.55 }}>Consulta el estado de tu visa y dinos cómo quieres recibir tu pasaporte.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "2px 30px 2px 30px", padding: "clamp(22px,4vw,38px)", border: "1px solid rgba(22,40,63,.14)", boxShadow: "0 2px 14px rgba(18,50,92,.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#12325c 0%,#2f6fb0 45%,#e8b323 100%)" }} />
          <div style={{ position: "relative" }}>

            {vista === "consulta" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <img src="/logo-wonderlust.png" alt="" style={{ width: 22, height: "auto", opacity: 0.9, display: "block" }} />
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 20, color: "#12325c" }}>Consulta tu solicitud</div>
                  <div style={regla} />
                </div>
                <div style={{ fontSize: 13, color: "#5d7189", marginBottom: 24, lineHeight: 1.5 }}>Escribe el número de cédula del solicitante, tal como lo registraste en el formulario.</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 7, maxWidth: 420 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: "#16283f" }}>Número de cédula</label>
                  <input
                    value={cedula}
                    onChange={(e) => { setCedula(e.target.value); setError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") buscar(); }}
                    inputMode="numeric" autoComplete="off" placeholder="Ej. 1020458877"
                    style={{ padding: "13px 15px", borderRadius: 12, border: "1.5px solid rgba(22,40,63,.2)", background: "#fff", fontSize: 16, letterSpacing: ".02em", fontFamily: "'Karla',sans-serif" }}
                  />
                  {!!error && <div style={{ fontSize: 12.5, color: "#c0392b", lineHeight: 1.5, marginTop: 2 }}>{error}</div>}
                  <button
                    type="button" onClick={() => buscar()}
                    style={{ marginTop: 12, width: "100%", padding: "17px 30px", borderRadius: 999, border: "none", background: "linear-gradient(180deg,#1a4478 0%,#12325c 100%)", color: "#fff", fontSize: 16.5, fontWeight: 700, fontFamily: "'Karla',sans-serif", cursor: "pointer", letterSpacing: ".02em", boxShadow: "0 6px 18px rgba(18,50,92,.28)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                  >
                    <span>{buscando ? "Consultando…" : "Consultar solicitud"}</span>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                  </button>
                </div>

                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(22,40,63,.12)", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ fontSize: 12.5, color: "#6b7f96", lineHeight: 1.6 }}>
                    ¿No encuentras tu solicitud? Escríbenos por <a href={WA} target="_blank" rel="noreferrer" style={{ color: "#2f6fb0" }}>WhatsApp +57 313 488 3629</a>.
                  </div>
                  <div><a href="/" style={linkHome}><img src="/logo-wonderlust.png" alt="" style={{ width: 18, height: "auto", display: "block" }} />Ir al inicio</a></div>
                </div>
              </>
            )}


            {vista === "resultado" && reg && (
              <>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRadius: "2px 22px 2px 22px", background: aprobada ? "#eff8f2" : "#fffbe9", border: "1px solid " + (aprobada ? "rgba(31,122,77,.3)" : "rgba(198,146,20,.35)"), marginBottom: 26 }}>
                  <div style={{ flex: "0 0 auto", width: 38, height: 38, borderRadius: 999, background: aprobada ? "#1f7a4d" : "#c69214", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700 }}>{aprobada ? "✓" : "⏱"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, color: aprobada ? "#1f7a4d" : "#c69214", marginBottom: 4 }}>Estado de la solicitud</div>
                    <div style={{ fontFamily: "'Marcellus',serif", fontSize: 22, color: "#12325c", lineHeight: 1.2 }}>{aprobada ? "Visa aprobada" : "En trámite"}</div>
                    <div style={{ fontSize: 13.5, color: "#44586e", lineHeight: 1.55, marginTop: 6 }}>
                      {aprobada
                        ? yaRegistrado
                          ? "Tu visa ya está estampada en el pasaporte. Abajo está la entrega que ya registraste."
                          : "Tu visa ya está estampada en el pasaporte y está listo para entregarte. Elige abajo cómo quieres recibirlo."
                        : "Tu solicitud sigue en proceso: todavía no tenemos el número de visa. Te avisamos por WhatsApp en cuanto el pasaporte esté de vuelta con nosotros."}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 28 }}>
                  {resumen.map((r) => (
                    <div key={r.label} style={{ padding: "13px 15px", borderRadius: 10, background: "#f5f8fc", border: "1px solid rgba(22,40,63,.09)" }}>
                      <div style={rotulo}>{r.label}</div>
                      <div style={{ fontSize: 14.5, color: "#16283f", fontWeight: 600, lineHeight: 1.35, wordBreak: "break-word" }}>{r.value}</div>
                    </div>
                  ))}
                </div>

                {yaRegistrado && entrega && (
                  <div style={{ padding: "20px 22px", borderRadius: "2px 22px 2px 22px", background: "#eff8f2", border: "1px solid rgba(31,122,77,.3)", borderLeft: "3px solid #1f7a4d", marginBottom: 26 }}>
                    <div style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: "#1f7a4d", marginBottom: 6 }}>Ya registraste tu entrega</div>
                    <div style={{ fontFamily: "'Marcellus',serif", fontSize: 20, color: "#12325c", lineHeight: 1.25, marginBottom: 12 }}>{entrega.modo || "Entrega registrada"}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
                      {yaDatos.map((y) => (
                        <div key={y.label} style={{ padding: "11px 13px", borderRadius: 10, background: "#fff", border: "1px solid rgba(22,40,63,.09)" }}>
                          <div style={{ ...rotulo, marginBottom: 4 }}>{y.label}</div>
                          <div style={{ fontSize: 14, color: "#16283f", fontWeight: 600, lineHeight: 1.4, wordBreak: "break-word" }}>{y.value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55, marginTop: 14 }}>{yaTexto}</div>
                  </div>
                )}

                {aprobada && !yaRegistrado && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <div style={tituloSec}>Tu SIM card para el viaje</div>
                      <div style={regla} />
                    </div>
                    <div style={{ fontSize: 13, color: "#5d7189", marginBottom: 14, lineHeight: 1.5 }}>¿Tomaste la opción de SIM card con nosotros?</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {["Sí", "No"].map((v) => (
                        <button
                          key={v} type="button"
                          onClick={() => { setSim(v); setSimTipo(""); setError(""); }}
                          style={{ padding: "11px 26px", borderRadius: 999, border: sim === v ? "2px solid #1f7a4d" : "1.5px solid rgba(22,40,63,.2)", background: sim === v ? "#eff8f2" : "#fff", color: sim === v ? "#1f7a4d" : "#44586e", fontSize: 14, fontWeight: 700, fontFamily: "'Karla',sans-serif", cursor: "pointer", minHeight: 44 }}
                        >
                          {v === "Sí" ? "Sí, tomé la SIM" : "No tomé SIM"}
                        </button>
                      ))}
                    </div>

                    {sim === "Sí" && (
                      <div style={{ marginTop: 20, padding: "18px 20px", borderRadius: "2px 22px 2px 22px", background: "#f5f8fc", border: "1px solid rgba(22,40,63,.12)" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#12325c", marginBottom: 4 }}>¿Física o digital?</div>
                        <div style={{ fontSize: 12.8, color: "#5d7189", lineHeight: 1.55, marginBottom: 14 }}>La física es un chip que va con tu pasaporte. La digital (eSIM) te llega por correo con un código QR.</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
                          {[
                            { v: "Física", titulo: "SIM física", texto: "Chip físico. Te lo entregamos junto con el pasaporte." },
                            { v: "Digital", titulo: "eSIM digital", texto: "Te llega por correo con QR. No requiere entrega física." },
                          ].map((t) => (
                            <div key={t.v} onClick={() => { setSimTipo(t.v); setError(""); }} style={{ cursor: "pointer", padding: "15px 17px", borderRadius: 12, border: simTipo === t.v ? "2px solid #2f6fb0" : "1.5px solid rgba(22,40,63,.16)", background: simTipo === t.v ? "#eef4fb" : "#fff", transition: "border-color .2s ease" }}>
                              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: "#12325c", marginBottom: 4 }}>{t.titulo}</div>
                              <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.5 }}>{t.texto}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {simListo && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "30px 0 6px" }}>
                          <div style={tituloSec}>¿Cómo quieres recibirlo?</div>
                          <div style={regla} />
                        </div>
                        <div style={{ fontSize: 13, color: "#5d7189", marginBottom: 18, lineHeight: 1.5 }}>Elige una opción. Puedes cambiarla antes de confirmar.</div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(215px,1fr))", gap: 14 }}>
                          <div onClick={() => { setModo("recoger"); setError(""); }} style={card(modo === "recoger", "#1f7a4d")}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#12325c" }}>Recoger en oficina</div>
                              <div style={{ ...chip, background: "#1f7a4d", color: "#fff" }}>GRATIS</div>
                            </div>
                            <div style={{ fontSize: 13.5, color: "#16283f", fontWeight: 600, lineHeight: 1.5 }}>CL 53B # 24 - 30, Oficina 301<br />Bogotá D.C.</div>
                            <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.55, marginTop: 8 }}>Lunes a viernes 9:00 a.m. – 5:00 p.m. · Sábados 9:00 a.m. – 1:00 p.m. Trae tu cédula original.</div>
                          </div>

                          <div onClick={() => { setModo("envio"); setError(""); setAceptaPago(false); }} style={card(modo === "envio", "#2f6fb0")}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#12325c" }}>Envío a domicilio</div>
                              <div style={{ ...chip, background: "#e8b323", color: "#12325c" }}>PAGO CONTRAENTREGA</div>
                            </div>
                            <div style={{ fontSize: 13.5, color: "#16283f", fontWeight: 600, lineHeight: 1.5 }}>A la dirección que nos indiques</div>
                            <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.55, marginTop: 8 }}>Enviamos por mensajería con guía rastreable. <strong>El valor del envío lo pagas al mensajero cuando te lo entregue</strong>, no ahora.</div>
                          </div>

                          <div onClick={() => { setModo("grupo"); setError(""); setAceptaPago(false); }} style={card(modo === "grupo", "#2f6fb0")}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#12325c" }}>Envío en grupo</div>
                              <div style={{ ...chip, background: "#2f6fb0", color: "#fff" }}>SE COMPARTE</div>
                            </div>
                            <div style={{ fontSize: 13.5, color: "#16283f", fontWeight: 600, lineHeight: 1.5 }}>Un solo paquete para varias personas</div>
                            <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.55, marginTop: 8 }}>Ideal para familias o grupos de viaje: un solo envío para todos, que paga contraentrega quien lo recibe.</div>
                          </div>
                        </div>

                        {modo === "grupo" && (
                          <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(22,40,63,.12)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                              <img src="/logo-wonderlust.png" alt="" style={{ width: 17, height: "auto", opacity: 0.85, display: "block" }} />
                              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: "#2f6fb0" }}>¿Quién recibe el paquete del grupo?</div>
                            </div>
                            <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.55, marginBottom: 18 }}>
                              Una sola persona da la dirección y recibe todos los pasaportes. Al confirmar le damos un <strong>código de grupo</strong> que debe compartir con los demás; cada uno lo pega aquí y queda sumado al mismo envío.
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
                              {[
                                { v: "crear" as Rol, titulo: "Yo recibo el paquete", texto: "Doy mi dirección y me llegan todos los pasaportes del grupo. Al confirmar te damos el código para compartir." },
                                { v: "unir" as Rol, titulo: "Me uno a un grupo", texto: "Ya tengo el código de quien recibe. No necesito dar dirección." },
                              ].map((g) => (
                                <div key={g.v} onClick={() => { setGrupoRol(g.v); setError(""); setTouched(false); setGrupoInfo(null); }} style={{ cursor: "pointer", padding: "16px 18px", borderRadius: 12, border: grupoRol === g.v ? "2px solid #2f6fb0" : "1.5px solid rgba(22,40,63,.16)", background: grupoRol === g.v ? "#eef4fb" : "#fff", transition: "border-color .2s ease" }}>
                                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: "#12325c", marginBottom: 4 }}>{g.titulo}</div>
                                  <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.5 }}>{g.texto}</div>
                                </div>
                              ))}
                            </div>

                            {grupoRol === "unir" && (
                              <div style={{ marginTop: 20, padding: "18px 20px", borderRadius: "2px 22px 2px 22px", background: "#f5f8fc", border: "1px solid rgba(22,40,63,.12)" }}>
                                <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#16283f", marginBottom: 7 }}>Código de grupo *</label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                                  <input
                                    value={codigo} onChange={(e) => { setCodigo(e.target.value); setError(""); setGrupoInfo(null); }}
                                    autoComplete="off" placeholder="Ej. GR-4821"
                                    style={{ flex: "1 1 180px", padding: "11px 14px", borderRadius: 10, border: "1.5px solid rgba(22,40,63,.2)", background: "#fff", fontSize: 16, letterSpacing: ".12em", textTransform: "uppercase", height: 44, fontFamily: "'Karla',sans-serif" }}
                                  />
                                  <button type="button" onClick={buscarGrupo} style={{ padding: "12px 22px", borderRadius: 999, border: "2px solid #12325c", background: "#12325c", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "'Karla',sans-serif", cursor: "pointer", minHeight: 44 }}>
                                    {buscandoGrupo ? "Verificando…" : "Verificar código"}
                                  </button>
                                </div>
                                <div style={{ fontSize: 11.5, color: "#6b7f96", lineHeight: 1.45, marginTop: 8 }}>Te lo comparte la persona que recibe el paquete. Si nadie lo tiene todavía, esa persona debe registrar su envío primero.</div>

                                {grupoInfo && (
                                  <div style={{ marginTop: 16, padding: "15px 17px", borderRadius: 12, background: grupoInfo.sinVerificar ? "#fffbe9" : "#eff8f2", border: "1px solid " + (grupoInfo.sinVerificar ? "rgba(198,146,20,.35)" : "rgba(31,122,77,.3)") }}>
                                    <div style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: grupoInfo.sinVerificar ? "#c69214" : "#1f7a4d", marginBottom: 6 }}>
                                      {grupoInfo.sinVerificar ? "Código guardado · lo revisamos" : "Grupo encontrado"}
                                    </div>
                                    <div style={{ fontSize: 14, color: "#16283f", fontWeight: 600, lineHeight: 1.45 }}>
                                      {grupoInfo.sinVerificar ? "Código " + codigo : "Recibe: " + (grupoInfo.nombre || "—") + (grupoInfo.personas ? " · " + grupoInfo.personas + " personas en el grupo" : "")}
                                    </div>
                                    <div style={{ fontSize: 12.8, color: "#5d7189", lineHeight: 1.55, marginTop: 5 }}>
                                      {grupoInfo.sinVerificar ? "No pudimos verificarlo en línea ahora mismo. Lo dejamos registrado y lo confirmamos contigo por WhatsApp." : "Destino: " + (grupoInfo.destino || "—")}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {listoParaDatos && (
                          <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(22,40,63,.12)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                              <img src="/logo-wonderlust.png" alt="" style={{ width: 17, height: "auto", opacity: 0.85, display: "block" }} />
                              <div style={{ fontFamily: "'Marcellus',serif", fontSize: 16, color: "#2f6fb0" }}>{datosTitulo}</div>
                            </div>
                            <div style={{ fontSize: 12.5, color: "#5d7189", lineHeight: 1.55, marginBottom: 20 }}>{datosTexto}</div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "16px 18px" }}>
                              {campos.map((f) => {
                                const malo = touched && falta.indexOf(f.k) !== -1;
                                const borde = malo ? "1.5px solid #c0392b" : "1.5px solid rgba(22,40,63,.2)";
                                const opciones = !f.sel ? [] : f.sel === "depto" ? deptoKeys : COLOMBIA_GEO[vals.depto] || [];
                                const ayuda = ayudaCampo(f);
                                const set = (v: string) => setVals((s) => ({ ...s, [f.k]: v, ...(f.sel === "depto" ? { ciudad: "" } : {}) }));
                                return (
                                  <div key={f.k} style={{ gridColumn: f.span || "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                                    <label style={{ fontSize: 12.5, fontWeight: 700, color: malo ? "#c0392b" : "#16283f", lineHeight: 1.4 }}>
                                      {etiquetaCampo(f)}{f.req ? " *" : ""}
                                    </label>
                                    {f.area ? (
                                      <textarea value={vals[f.k] || ""} onChange={(e) => { set(e.target.value); setError(""); }} placeholder={f.ph} rows={2} style={{ padding: "10px 13px", borderRadius: 10, border: borde, background: "#fff", fontSize: 14, resize: "vertical", lineHeight: 1.45, minHeight: 46, fontFamily: "'Karla',sans-serif" }} />
                                    ) : f.sel ? (
                                      <select value={vals[f.k] || ""} onChange={(e) => { set(e.target.value); setError(""); }} style={{ padding: "10px 13px", borderRadius: 10, border: borde, background: "#fff", fontSize: 14, height: 42, color: "#16283f", fontFamily: "'Karla',sans-serif" }}>
                                        <option value="">{f.sel === "ciudad" && !vals.depto ? "Elige primero el departamento" : "Selecciona…"}</option>
                                        {opciones.map((o) => <option key={o} value={o}>{o}</option>)}
                                      </select>
                                    ) : (
                                      <input value={vals[f.k] || ""} onChange={(e) => { set(e.target.value); setError(""); }} inputMode={(f.mode as any) || "text"} autoComplete="off" placeholder={f.ph} style={{ padding: "10px 13px", borderRadius: 10, border: borde, background: "#fff", fontSize: 14, height: 42, fontFamily: "'Karla',sans-serif" }} />
                                    )}
                                    {!!ayuda && <div style={{ fontSize: 11.5, color: "#6b7f96", lineHeight: 1.45 }}>{ayuda}</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {hasModo && pidePago && (
                          <div
                            onClick={() => { setAceptaPago(!aceptaPago); setError(""); }}
                            style={{ marginTop: 26, padding: "16px 18px", borderRadius: "2px 20px 2px 20px", background: aceptaPago ? "#eff8f2" : "#fffbe9", border: "1px solid " + (aceptaPago ? "rgba(31,122,77,.35)" : "rgba(198,146,20,.4)"), display: "flex", gap: 13, alignItems: "flex-start", cursor: "pointer" }}
                          >
                            <div style={{ flex: "0 0 auto", width: 24, height: 24, borderRadius: 6, marginTop: 1, border: "2px solid " + (aceptaPago ? "#1f7a4d" : "rgba(198,146,20,.6)"), background: aceptaPago ? "#1f7a4d" : "#fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{aceptaPago ? "✓" : ""}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#12325c", lineHeight: 1.45 }}>El envío se paga contraentrega *</div>
                              <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55, marginTop: 5 }}>
                                {modo === "grupo"
                                  ? "Entiendo que el valor del envío del paquete del grupo lo pago yo al mensajero en el momento de la entrega. Nosotros no cobramos nada por anticipado."
                                  : "Entiendo que el valor del envío lo pago al mensajero en el momento de la entrega. Nosotros no cobramos nada por anticipado."}
                              </div>
                            </div>
                          </div>
                        )}

                        {hasModo && (
                          <>
                            <div style={{ marginTop: 16, padding: "15px 17px", background: "#eef4fb", border: "1px solid rgba(47,111,176,.3)", borderLeft: "3px solid #e8b323", borderRadius: "2px 18px 2px 18px" }}>
                              <div style={{ fontSize: 13, fontWeight: 700, color: "#12325c", marginBottom: 5 }}>Antes de confirmar</div>
                              <div style={{ fontSize: 12.8, color: "#44586e", lineHeight: 1.55 }}>{avisoTexto}</div>
                            </div>
                            {!!error && <div style={{ fontSize: 12.5, color: "#c0392b", lineHeight: 1.5, marginTop: 14 }}>{error}</div>}
                            <button type="button" onClick={enviar} style={{ marginTop: 20, width: "100%", padding: "15px 30px", borderRadius: 999, border: "none", background: "#12325c", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Karla',sans-serif", cursor: "pointer", letterSpacing: ".02em" }}>{btnEnviar}</button>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                <div style={{ marginTop: 26, paddingTop: 18, borderTop: "1px solid rgba(22,40,63,.12)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button type="button" onClick={volver} style={btnSec}>← Consultar otra cédula</button>
                    <a href="/" style={linkHome}><img src="/logo-wonderlust.png" alt="" style={{ width: 18, height: "auto", display: "block" }} />Ir al inicio</a>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#6b7f96", lineHeight: 1.5 }}>Dudas: <a href={WA} target="_blank" rel="noreferrer" style={{ color: "#2f6fb0" }}>WhatsApp +57 313 488 3629</a></div>
                </div>
              </>
            )}

            {vista === "listo" && (
              <div style={{ textAlign: "center", padding: "14px 0 6px" }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: "#1f7a4d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 20px" }}>✓</div>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 26, color: "#12325c", marginBottom: 10 }}>
                  {modo === "recoger" ? "Te esperamos en la oficina" : modo === "grupo" ? (grupoRol === "unir" ? "Te sumamos al grupo" : "Grupo creado") : "Envío registrado"}
                </div>
                <div style={{ fontSize: 14, color: "#5d7189", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 22px" }}>
                  {modo === "recoger"
                    ? "Dejamos tu pasaporte separado en " + OFICINA + ". Llévate tu cédula original y muestra este radicado."
                    : modo === "grupo" && grupoRol === "unir"
                    ? "Tu pasaporte irá en el paquete del grupo " + codigo + ". Te confirmamos por WhatsApp cuando salga el envío."
                    : "Programamos tu envío a " + (vals.direccion || "") + (vals.ciudad ? ", " + vals.ciudad : "") + ". Te enviaremos el número de guía por WhatsApp y el valor del envío lo pagas al mensajero al recibirlo."}
                </div>
                <div style={{ display: "inline-block", padding: "12px 22px", borderRadius: "2px 18px 2px 18px", background: "#f5f8fc", border: "1px solid rgba(22,40,63,.12)" }}>
                  <div style={{ ...rotulo, letterSpacing: ".14em", marginBottom: 4 }}>Radicado de entrega</div>
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 20, color: "#12325c", letterSpacing: ".06em" }}>{radicado}</div>
                </div>

                {!!codigoGrupo && (
                  <div style={{ margin: "22px auto 0", maxWidth: 440, padding: "18px 20px", borderRadius: "2px 22px 2px 22px", background: "#eef4fb", border: "1px solid rgba(47,111,176,.3)", borderLeft: "3px solid #e8b323", textAlign: "left" }}>
                    <div style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#2f6fb0", fontWeight: 700, marginBottom: 6 }}>Código de grupo · compártelo</div>
                    <div style={{ fontFamily: "'Marcellus',serif", fontSize: 28, color: "#12325c", letterSpacing: ".14em" }}>{codigoGrupo}</div>
                    <div style={{ fontSize: 12.5, color: "#44586e", lineHeight: 1.55, marginTop: 8 }}>
                      Envíale este código a las demás personas del grupo. Cada una entra aquí, consulta su cédula, elige <strong>Envío en grupo</strong> y lo pega para sumarse a tu paquete.
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 26 }}>
                  <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "13px 28px", borderRadius: 999, background: "#1f7a4d", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Escribirnos por WhatsApp</a>
                </div>
                <div style={{ marginTop: 22, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <button type="button" onClick={volver} style={btnSec}>← Consultar otra cédula</button>
                  <a href="/" style={linkHome}><img src="/logo-wonderlust.png" alt="" style={{ width: 18, height: "auto", display: "block" }} />Ir al inicio</a>
                </div>
              </div>
            )}

          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 22, fontSize: 11.5, color: "#8496a9", lineHeight: 1.6 }}>
          Wonderlust Agencia de Viajes · CL 53B # 24 - 30, Oficina 301, Bogotá D.C.<br />
          El pasaporte solo se entrega al titular o a un autorizado con carta y copia de cédula.
        </div>
      </div>
    </main>
  );
}
