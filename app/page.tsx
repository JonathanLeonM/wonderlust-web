"use client";

import { useRef, useState } from "react";

const WA = "https://wa.me/573134883629";
const NAVY = "#002060";
const INK = "#0b1526";
const GOLD = "#c8892a";
const YELLOW = "#f0c040";
const MUTED = "#5d6673";
const LINE = "rgba(11,21,38,.09)";

const WhatsappIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.93-4.4-.15-.19-1.17-1.55-1.17-2.96 0-1.41.73-2.1 1-2.39.24-.26.53-.33.72-.33.19 0 .39 0 .55.01.19.01.44-.07.68.53.24.58.83 2.02.9 2.17.07.15.12.32.02.51-.1.19-.53.79-.72.99-.14.16-.29.33-.12.63.17.29.75 1.24 1.6 2.01 1.1.98 1.85 1.26 2.14 1.41.24.12.44.1.6-.07.19-.19.72-.84.9-1.13.19-.29.38-.24.63-.15.24.1 1.56.74 1.83.87.26.14.44.21.5.32.07.12.07.68-.17 1.36Z" />
  </svg>
);

const PencilIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const wrap: React.CSSProperties = { maxWidth: 1300, margin: "0 auto", padding: "0 clamp(16px,3.5vw,44px)" };
const cardShell: React.CSSProperties = {
  background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden",
  display: "flex", flexDirection: "column",
};
const photoBox: React.CSSProperties = { position: "relative", aspectRatio: "3 / 4", background: "#eef1f7" };
const photo: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const cardBody: React.CSSProperties = { padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 10, flex: 1 };
const cardTitle: React.CSSProperties = { fontSize: 17.5, fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.12 };
const cardSub: React.CSSProperties = { fontSize: 12.5, color: MUTED, fontWeight: 400, marginTop: 4 };
const cardBtn: React.CSSProperties = {
  border: "none", cursor: "pointer", fontFamily: "inherit", width: "100%", display: "inline-flex",
  alignItems: "center", justifyContent: "center", background: GOLD, color: "#fff", fontSize: 13,
  fontWeight: 700, padding: "12px 14px", borderRadius: 10,
};
const panel: React.CSSProperties = {
  gridColumn: "1 / -1", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20,
  padding: "clamp(20px,2.4vw,30px)",
};
const panelLabel: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: ".16em", color: GOLD, marginBottom: 6 };
const row: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
  flexWrap: "wrap", padding: "16px 0", borderTop: `1px solid ${LINE}`,
};
const rowTitle: React.CSSProperties = { fontSize: 17, fontWeight: 700, letterSpacing: "-.025em" };
const rowText: React.CSSProperties = { fontSize: 13, color: MUTED, fontWeight: 400, marginTop: 3 };
const rowPrice: React.CSSProperties = { fontSize: 20, fontWeight: 800, color: NAVY, letterSpacing: "-.03em" };
const rowCustom: React.CSSProperties = { fontSize: 14.5, fontWeight: 600, color: NAVY };
const rowCta: React.CSSProperties = {
  background: YELLOW, color: NAVY, fontSize: 13, fontWeight: 700, padding: "12px 20px",
  borderRadius: 11, flexShrink: 0, textDecoration: "none",
};
const sectionPad = "clamp(44px,6.5vw,90px) clamp(16px,3.5vw,44px) 0";
const h2: React.CSSProperties = { fontSize: "clamp(28px,4.2vw,52px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.02, margin: 0 };
const visaCard: React.CSSProperties = {
  background: "#fff", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column", gap: 13, color: INK,
};
const visaName: React.CSSProperties = { fontSize: 19, fontWeight: 700, letterSpacing: "-.025em" };
const visaText: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: MUTED, fontWeight: 300 };
const payBtn: React.CSSProperties = {
  background: YELLOW, color: NAVY, fontSize: 13, fontWeight: 700, padding: "12px 20px", borderRadius: 11, textDecoration: "none",
};
const formBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 7,
  background: "linear-gradient(135deg,#c6f000,#7ee81f)", color: INK, fontSize: 13.5, fontWeight: 800,
  letterSpacing: ".01em", padding: "13px 20px", borderRadius: 11,
  boxShadow: "0 4px 16px rgba(160,225,20,.55)", border: "1.5px solid #a8e000", textDecoration: "none",
};
const quote: React.CSSProperties = {
  fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.45, fontWeight: 400, margin: 0,
  letterSpacing: "-.015em", textWrap: "pretty" as React.CSSProperties["textWrap"],
};
const avatar = (bg: string): React.CSSProperties => ({
  width: 42, height: 42, borderRadius: 999, background: bg, color: "#fff", fontSize: 17, fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
});
const footLink: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,.85)", fontWeight: 300, textDecoration: "none" };
const footHead: React.CSSProperties = { fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", color: "rgba(255,255,255,.45)" };

type Continente = "europa" | "america" | "asia" | "oceania" | "africa" | null;

export default function Home() {
  const [abierto, setAbierto] = useState<Continente>(null);
  const cedulaRef = useRef<HTMLInputElement>(null);

  const ver = (c: Exclude<Continente, null>) => () => setAbierto((a) => (a === c ? null : c));

  const consultar = () => {
    const el = cedulaRef.current;
    const cedula = (el?.value || "").replace(/\D/g, "");
    if (!cedula) { el?.focus(); return; }
    window.location.href = `/devolucion-pasaportes?cedula=${encodeURIComponent(cedula)}`;
  };

  return (
    <div id="top" style={{ overflowX: "hidden", background: "#f8f8f5", color: INK, minHeight: "100vh", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ background: INK, color: "#fff", fontSize: 12.5, fontWeight: 500, textAlign: "center", padding: "9px 16px", letterSpacing: ".01em" }}>
        Asesoría de visas y viajes desde Bogotá · Respuesta el mismo día por WhatsApp
      </div>

      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(251,250,247,.94)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(11,21,38,.09)" }}>
        <div style={{ ...wrap, padding: "13px clamp(16px,3.5vw,44px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11, color: INK, textDecoration: "none" }}>
            <img src="/logo-wonderlust.webp" alt="Wonderlust" width={38} height={38} style={{ width: 38, height: 38, objectFit: "contain", display: "block" }} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.08 }}>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.035em" }}>Wonderlust</span>
              <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".2em", color: "#8b93a1" }}>WVIAJES.CO</span>
            </span>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,26px)" }}>
            <span className="nav-links" style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,26px)" }}>
            <a href="#ofertas" style={{ fontSize: 14.5, fontWeight: 500, color: INK, textDecoration: "none" }}>Salidas</a>
            <a href="#visas" style={{ fontSize: 14.5, fontWeight: 500, color: INK, textDecoration: "none" }}>Visas</a>
            <a href="#como" style={{ fontSize: 14.5, fontWeight: 500, color: INK, textDecoration: "none" }}>Cómo trabajamos</a>
            </span>
            <a href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: "#fff", fontSize: 14, fontWeight: 600, padding: "12px 22px", borderRadius: 12, textDecoration: "none" }}>
              <WhatsappIcon size={16} />
              Cotizar
            </a>
          </nav>
        </div>
      </header>

      <div style={{ background: "#eef1f7", borderBottom: "1px solid rgba(11,21,38,.09)" }}>
        <div style={{ ...wrap, padding: "9px clamp(16px,3.5vw,44px)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", color: NAVY }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M8.5 17h7" />
          </svg>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>Consulta el estado de tu visa</span>
          <span style={{ fontSize: 13.5, color: MUTED, fontWeight: 400 }}>y dinos dónde quieres recibir tu pasaporte</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto", flexWrap: "wrap" }}>
            <input
              ref={cedulaRef}
              type="text"
              inputMode="numeric"
              placeholder="Número de cédula"
              onKeyDown={(e) => { if (e.key === "Enter") consultar(); }}
              style={{ width: 170, border: "1px solid rgba(11,21,38,.2)", background: "#fff", borderRadius: 9, padding: "9px 12px", fontFamily: "inherit", fontSize: 13.5, color: INK, outline: "none" }}
            />
            <button type="button" onClick={consultar} style={{ border: "none", cursor: "pointer", background: NAVY, color: "#fff", fontFamily: "inherit", fontSize: 13.5, fontWeight: 700, padding: "10px 18px", borderRadius: 9 }}>
              Consultar
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{ ...wrap, padding: "clamp(14px,2vw,22px) clamp(16px,3.5vw,44px) 0" }}>
        <div style={{ position: "relative", borderRadius: "clamp(18px,2.4vw,26px)", overflow: "hidden", minHeight: "clamp(280px,32vw,380px)", display: "flex", alignItems: "center", padding: "clamp(22px,3vw,44px)" }}>
          <img src="/hero/pano.webp" alt="Europa" width={2000} height={1100} fetchPriority="high" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "35% center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg,rgba(3,10,28,.9) 0%,rgba(3,10,28,.64) 48%,rgba(3,10,28,.15) 100%)" }} />
          <div style={{ position: "relative", width: "100%", color: "#fff" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.13)", border: "1px solid rgba(255,255,255,.3)", backdropFilter: "blur(8px)", padding: "6px 13px", borderRadius: 999, fontSize: 11.5, fontWeight: 600, marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: YELLOW, flexShrink: 0 }} />
              +800 visas aprobadas · +12 años
            </div>
            <h1 style={{ fontSize: "clamp(27px,3.6vw,48px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-.04em", margin: 0, maxWidth: "17ch", textWrap: "balance" }}>
              Viaja sin pensar en el papeleo.
            </h1>
            <p style={{ fontSize: "clamp(14px,1.4vw,16.5px)", lineHeight: 1.5, color: "rgba(255,255,255,.88)", maxWidth: 420, margin: "12px 0 0", fontWeight: 300 }}>
              Visas, paquetes y tiquetes con una sola persona respondiéndote de principio a fin.
            </p>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: 20 }}>
              <a href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: GOLD, color: "#fff", fontSize: 14.5, fontWeight: 700, padding: "13px 24px", borderRadius: 12, textDecoration: "none" }}>
                <WhatsappIcon />
                Planear mi viaje
              </a>
              <a href="#visas" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.42)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 14.5, fontWeight: 600, padding: "13px 22px", borderRadius: 12, textDecoration: "none" }}>
                Tramitar mi visa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTÍAS */}
      <div style={{ ...wrap, padding: "clamp(12px,1.6vw,18px) clamp(16px,3.5vw,44px) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "clamp(10px,1.4vw,16px)" }}>
          {[
            { t: "Una sola asesora", s: "de principio a fin", d: <path d="M20 6 9 17l-5-5" /> },
            { t: "Pago en línea", s: "tarjeta, PSE o Nequi", d: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></> },
            { t: "Respuesta en minutos", s: "domingo a viernes", d: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
            { t: "Agencia registrada", s: "Bogotá, Colombia", d: <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4Z" /> },
          ].map((it) => (
            <div key={it.t} style={{ display: "flex", alignItems: "center", gap: 13, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "#eef1f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{it.d}</svg>
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.2 }}>{it.t}</div>
                <div style={{ fontSize: 13, color: MUTED, fontWeight: 300, marginTop: 2 }}>{it.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SALIDAS */}
      <section id="ofertas" style={{ ...wrap, padding: "clamp(38px,5vw,70px) clamp(16px,3.5vw,44px) 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: "clamp(20px,3vw,30px)" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".18em", color: GOLD, marginBottom: 10 }}>SALIDAS 2026 · DESDE BOGOTÁ</div>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,42px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, margin: 0 }}>Elige tu continente</h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: MUTED, fontWeight: 300, margin: "11px 0 0", maxWidth: "52ch" }}>
              Vuelos, hoteles, traslados y tours con guía en español. Todo incluido y sin letra pequeña.
            </p>
          </div>
          <a href={WA} target="_blank" rel="noopener" style={{ fontSize: 14.5, fontWeight: 600, flexShrink: 0, color: NAVY }}>Quiero otro destino →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gridAutoFlow: "row dense", gap: "clamp(14px,1.8vw,22px)" }}>
          {/* EUROPA */}
          <div style={cardShell}>
            {abierto === "europa" && <div style={{ height: 4, background: GOLD }} />}
            <div className="foto-destino" style={photoBox}>
              <img src="/destinos/europa.webp" alt="Salidas Europa" width={900} height={1200} style={photo} />
              <span style={{ position: "absolute", top: 12, left: 12, background: GOLD, color: "#fff", fontSize: 9.5, fontWeight: 800, letterSpacing: ".08em", padding: "6px 11px", borderRadius: 999 }}>MÁS VENDIDO</span>
            </div>
            <div style={cardBody}>
              <div>
                <div style={cardTitle}>Salidas Europa</div>
                <div style={cardSub}>París · Roma · Barcelona</div>
              </div>
              <div style={{ height: 1, background: LINE, marginTop: "auto" }} />
              <div>
                <span style={{ fontSize: 11, color: "#8b93a1", fontWeight: 500 }}>Desde </span>
                <span style={{ fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: "-.03em" }}>USD 2.450</span>
              </div>
              <button type="button" onClick={ver("europa")} style={cardBtn}>{abierto === "europa" ? "Ocultar" : "Ver salidas"}</button>
            </div>
          </div>

          {abierto === "europa" && (
            <div style={panel}>
              <div style={panelLabel}>SALIDAS A EUROPA · 3 CIRCUITOS</div>
              {[
                { n: "Europa Fantástica", d: "19 días · 17 noches · París, Roma, Barcelona · consulta fechas disponibles", p: "USD 3.319", q: "Quiero el itinerario de Europa Fantástica" },
                { n: "Euro Leyendas", d: "Londres, Ámsterdam, Praga · guías en español", p: "USD 2.890", q: "Quiero el itinerario de Euro Leyendas" },
                { n: "Europa Chic", d: "París, Venecia, Roma · hoteles seleccionados", p: "USD 2.450", q: "Quiero el itinerario de Europa Chic" },
              ].map((c) => (
                <div key={c.n} style={row}>
                  <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                    <div style={rowTitle}>{c.n}</div>
                    <div style={rowText}>{c.d}</div>
                  </div>
                  <div style={rowPrice}>{c.p}</div>
                  <a href={`${WA}?text=${encodeURIComponent(c.q)}`} target="_blank" rel="noopener" style={rowCta}>Pedir itinerario</a>
                </div>
              ))}
            </div>
          )}

          {/* AMÉRICA */}
          <div style={cardShell}>
            {abierto === "america" && <div style={{ height: 4, background: GOLD }} />}
            <div className="foto-destino" style={photoBox}>
              <img src="/destinos/america.webp" alt="Salidas América" width={900} height={1200} loading="lazy" decoding="async" style={photo} />
            </div>
            <div style={cardBody}>
              <div>
                <div style={cardTitle}>Salidas América</div>
                <div style={cardSub}>Disney · Nueva York · Canadá · Machu Picchu · Rep. Dominicana</div>
              </div>
              <div style={{ height: 1, background: LINE, marginTop: "auto" }} />
              <div>
                <span style={{ fontSize: 11, color: "#8b93a1", fontWeight: 500 }}>Desde </span>
                <span style={{ fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: "-.03em" }}>USD 680</span>
              </div>
              <button type="button" onClick={ver("america")} style={cardBtn}>{abierto === "america" ? "Ocultar" : "Ver salidas"}</button>
            </div>
          </div>

          {abierto === "america" && (
            <div style={panel}>
              <div style={panelLabel}>SALIDAS A AMÉRICA</div>
              <div style={row}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={rowTitle}>Río de Janeiro e Iguazú</div>
                  <div style={rowText}>4 días · 3 noches · city tour y cataratas · salidas diarias</div>
                </div>
                <div style={rowPrice}>USD 680</div>
                <a href={`${WA}?text=${encodeURIComponent("Quiero el itinerario de Río e Iguazú")}`} target="_blank" rel="noopener" style={rowCta}>Pedir itinerario</a>
              </div>
              <div style={row}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={rowTitle}>Canadá en Familia</div>
                  <div style={rowText}>9 días · Toronto, Niagara, Ottawa, Mont-Tremblant, Quebec y Montreal · con vuelo o solo terrestre</div>
                </div>
                <div style={rowPrice}>USD 2.345</div>
                <a href="/paquetes/canada" style={rowCta}>Ver paquete</a>
              </div>
              <div style={row}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={rowTitle}>Estados Unidos</div>
                  <div style={rowText}>Orlando, Nueva York, Miami · armamos vuelos, hotel y parques</div>
                </div>
                <div style={rowCustom}>A tu medida</div>
                <a href={`${WA}?text=${encodeURIComponent("Quiero cotizar un viaje a Estados Unidos")}`} target="_blank" rel="noopener" style={rowCta}>Pedir cotización</a>
              </div>
            </div>
          )}

          {/* ASIA */}
          <div style={cardShell}>
            {abierto === "asia" && <div style={{ height: 4, background: GOLD }} />}
            <div className="foto-destino" style={photoBox}>
              <img src="/destinos/asia.webp" alt="Salidas Asia" width={900} height={1200} loading="lazy" decoding="async" style={photo} />
            </div>
            <div style={cardBody}>
              <div>
                <div style={cardTitle}>Salidas Asia</div>
                <div style={cardSub}>Dubái · Japón · China</div>
              </div>
              <div style={{ height: 1, background: LINE, marginTop: "auto" }} />
              <div style={{ fontSize: 13.5, fontWeight: 600, color: NAVY }}>A tu medida</div>
              <button type="button" onClick={ver("asia")} style={cardBtn}>{abierto === "asia" ? "Ocultar" : "Ver salidas"}</button>
            </div>
          </div>

          {abierto === "asia" && (
            <div style={panel}>
              <div style={panelLabel}>SALIDAS A ASIA Y MEDIO ORIENTE</div>
              <div style={row}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={rowTitle}>Dubái y Emiratos Árabes</div>
                  <div style={rowText}>Dubái y Abu Dabi · desierto, Burj Khalifa y traslados privados</div>
                </div>
                <div style={rowCustom}>A tu medida</div>
                <a href={`${WA}?text=${encodeURIComponent("Quiero cotizar un viaje a Dubái y Emiratos")}`} target="_blank" rel="noopener" style={rowCta}>Pedir cotización</a>
              </div>
              <div style={row}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={rowTitle}>Japón</div>
                  <div style={rowText}>Tokio, Kioto y Osaka · incluye trámite de visa japonesa</div>
                </div>
                <div style={rowCustom}>A tu medida</div>
                <a href={`${WA}?text=${encodeURIComponent("Quiero cotizar un viaje a Japón")}`} target="_blank" rel="noopener" style={rowCta}>Pedir cotización</a>
              </div>
              <div style={row}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={rowTitle}>China</div>
                  <div style={rowText}>Pekín, Shanghái y Cantón · asesoría de visa china incluida</div>
                </div>
                <div style={rowCustom}>A tu medida</div>
                <a href="/visa-china" style={rowCta}>Llenar formulario</a>
              </div>
            </div>
          )}

          {/* OCEANÍA */}
          <div style={cardShell}>
            {abierto === "oceania" && <div style={{ height: 4, background: GOLD }} />}
            <div className="foto-destino" style={photoBox}>
              <img src="/destinos/oceania.webp" alt="Salidas Oceanía" width={900} height={1200} loading="lazy" decoding="async" style={photo} />
            </div>
            <div style={cardBody}>
              <div>
                <div style={cardTitle}>Salidas Oceanía</div>
                <div style={cardSub}>Australia · N. Zelanda</div>
              </div>
              <div style={{ height: 1, background: LINE, marginTop: "auto" }} />
              <div style={{ fontSize: 13.5, fontWeight: 600, color: NAVY }}>A tu medida</div>
              <button type="button" onClick={ver("oceania")} style={cardBtn}>{abierto === "oceania" ? "Ocultar" : "Ver salidas"}</button>
            </div>
          </div>

          {abierto === "oceania" && (
            <div style={panel}>
              <div style={panelLabel}>SALIDAS A OCEANÍA</div>
              <div style={{ ...row, gap: 20, paddingBottom: 0, marginTop: 6 }}>
                <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.025em" }}>Oceanía se arma a la medida</div>
                  <div style={{ fontSize: 14, color: MUTED, fontWeight: 300, lineHeight: 1.6, marginTop: 5 }}>
                    Australia, Nueva Zelanda y Polinesia no tienen salida fija: definimos ciudades, fechas y presupuesto contigo y te mandamos el itinerario en 24 horas.
                  </div>
                </div>
                <a href={`${WA}?text=${encodeURIComponent("Quiero cotizar un viaje a Oceanía")}`} target="_blank" rel="noopener" style={{ ...rowCta, fontSize: 13.5, padding: "13px 22px" }}>Pedir cotización</a>
              </div>
            </div>
          )}

          {/* ÁFRICA */}
          <div style={cardShell}>
            {abierto === "africa" && <div style={{ height: 4, background: GOLD }} />}
            <div className="foto-destino" style={photoBox}>
              <img src="/destinos/africa.webp" alt="Salidas África" width={900} height={1200} loading="lazy" decoding="async" style={photo} />
            </div>
            <div style={cardBody}>
              <div>
                <div style={cardTitle}>Salidas África</div>
                <div style={cardSub}>Egipto · Marruecos · Kenia</div>
              </div>
              <div style={{ height: 1, background: LINE, marginTop: "auto" }} />
              <div style={{ fontSize: 13.5, fontWeight: 600, color: NAVY }}>A tu medida</div>
              <button type="button" onClick={ver("africa")} style={cardBtn}>{abierto === "africa" ? "Ocultar" : "Ver salidas"}</button>
            </div>
          </div>

          {abierto === "africa" && (
            <div style={panel}>
              <div style={panelLabel}>SALIDAS A ÁFRICA</div>
              <div style={{ ...row, gap: 20, paddingBottom: 0, marginTop: 6 }}>
                <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.025em" }}>África se arma a la medida</div>
                  <div style={{ fontSize: 14, color: MUTED, fontWeight: 300, lineHeight: 1.6, marginTop: 5 }}>
                    Egipto, Marruecos, Sudáfrica y Kenia con guía en español. Cuéntanos cuántos viajan y en qué fechas, y te mandamos el itinerario en 24 horas.
                  </div>
                </div>
                <a href={`${WA}?text=${encodeURIComponent("Quiero cotizar un viaje a África")}`} target="_blank" rel="noopener" style={{ ...rowCta, fontSize: 13.5, padding: "13px 22px" }}>Pedir cotización</a>
              </div>
            </div>
          )}
        </div>

        <p style={{ fontSize: 12.5, color: "#8b93a1", margin: "16px 0 0", fontWeight: 300 }}>
          Precios por persona, sujetos a disponibilidad y a la acomodación de cada paquete al momento de reservar. Aplican términos y condiciones.
        </p>
      </section>

      {/* VISAS */}
      <section id="visas" style={{ ...wrap, padding: sectionPad }}>
        <div style={{ background: NAVY, borderRadius: "clamp(22px,3vw,32px)", padding: "clamp(24px,3.6vw,52px)", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 22, flexWrap: "wrap", marginBottom: "clamp(22px,3vw,34px)" }}>
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".18em", color: YELLOW, marginBottom: 11 }}>CONSULTORÍA DE VISAS</div>
              <h2 style={{ ...h2, textWrap: "pretty" }}>Paga tu asesoría y empezamos hoy</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "rgba(255,255,255,.82)", margin: "12px 0 0", fontWeight: 300 }}>
                El valor es de nuestra asesoría. Las tarifas consulares se pagan aparte, directamente al consulado.
              </p>
            </div>
            <a href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.38)", color: "#fff", fontSize: 14.5, fontWeight: 600, padding: "14px 24px", borderRadius: 13, textDecoration: "none" }}>
              Tengo dudas, quiero hablar
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: "clamp(12px,1.6vw,18px)" }}>
            <div style={visaCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src="https://flagcdn.com/w80/us.png" alt="Estados Unidos" width={36} height={27} style={{ width: 36, height: "auto", borderRadius: 5, display: "block" }} />
                <div style={visaName}>Estados Unidos</div>
              </div>
              <div style={visaText}>DS-160 diligenciado · agenda de cita · simulación de entrevista</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                <a href="/visa-usa" style={formBtn}><PencilIcon />Llenar formulario</a>
                <a href="https://checkout.wompi.co/l/WadHBw" target="_blank" rel="noopener" style={payBtn}>Pagar ya</a>
              </div>
            </div>

            <div style={visaCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src="https://flagcdn.com/w80/ca.png" alt="Canadá" width={36} height={27} style={{ width: 36, height: "auto", borderRadius: 5, display: "block" }} />
                <div style={visaName}>Canadá</div>
              </div>
              <div style={visaText}>Perfil migratorio · carta de solicitud · plan de viaje y soportes</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                <a href="https://checkout.wompi.co/l/urqCID" target="_blank" rel="noopener" style={payBtn}>Pagar ya</a>
                <a href={WA} target="_blank" rel="noopener" style={{ background: "#1268d3", color: "#fff", fontSize: 13, fontWeight: 700, padding: "12px 18px", borderRadius: 11, textDecoration: "none" }}>Preguntar</a>
              </div>
            </div>

            <div style={visaCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src="https://flagcdn.com/w80/cn.png" alt="China" width={36} height={27} style={{ width: 36, height: "auto", borderRadius: 5, display: "block" }} />
                <div style={visaName}>China</div>
              </div>
              <div style={visaText}>Formulario en línea · carta de invitación · radicación y seguimiento</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                <a href="/visa-china" style={formBtn}><PencilIcon />Llenar formulario</a>
                <a href="https://checkout.wompi.co/l/gpUtlB" target="_blank" rel="noopener" style={payBtn}>Pagar ya</a>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px,1.6vw,18px)", flexWrap: "wrap", marginTop: "clamp(12px,1.6vw,18px)", background: "rgba(255,255,255,.1)", borderRadius: 18, padding: "15px 20px" }}>
            <img src="https://flagcdn.com/w80/cr.png" alt="Costa Rica" width={28} height={21} style={{ width: 28, height: "auto", borderRadius: 4, display: "block" }} />
            <span style={{ fontSize: 15, fontWeight: 600 }}>Costa Rica</span>
            <img src="https://flagcdn.com/w80/jp.png" alt="Japón" width={28} height={21} style={{ width: 28, height: "auto", borderRadius: 4, display: "block" }} />
            <span style={{ fontSize: 15, fontWeight: 600 }}>Japón</span>
            <span style={{ flex: "1 1 130px", fontSize: 14, color: "rgba(255,255,255,.78)", fontWeight: 300 }}>También tramitamos estos destinos.</span>
            <a href="https://checkout.wompi.co/l/WadHBw" target="_blank" rel="noopener" style={payBtn}>Pagar asesoría</a>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section id="como" style={{ ...wrap, padding: sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "clamp(18px,2.6vw,34px)", alignItems: "center" }}>
          <div style={{ minWidth: 0 }}>
            <h2 style={h2}>Cómo trabajamos</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "clamp(20px,2.6vw,28px)" }}>
              {[
                { n: "01", t: "Nos escribes", d: "Cuéntanos tu caso por WhatsApp. Sin formularios largos ni filas." },
                { n: "02", t: "Preparamos tu caso", d: "Formularios, documentos, citas y soportes revisados uno por uno." },
                { n: "03", t: "Viajas tranquilo", d: "Llegas a la cita y al aeropuerto con todo en orden y alguien pendiente." },
              ].map((p, i) => (
                <div key={p.n} style={{ display: "flex", gap: 16, padding: "18px 0", borderTop: "1px solid rgba(11,21,38,.1)", borderBottom: i === 2 ? "1px solid rgba(11,21,38,.1)" : undefined }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: GOLD, flexShrink: 0, width: 26 }}>{p.n}</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.02em" }}>{p.t}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6, color: MUTED, fontWeight: 300, marginTop: 4 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ minWidth: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 12 }}>
            <div style={{ gridColumn: "1 / -1", borderRadius: 22, overflow: "hidden", aspectRatio: "16 / 9", background: "#eef1f7" }}>
              <img src="/como/paris.webp" alt="París" width={1400} height={788} loading="lazy" decoding="async" style={photo} />
            </div>
            <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "1 / 1", background: "#eef1f7" }}>
              <img src="/como/roma.webp" alt="Roma" width={800} height={800} loading="lazy" decoding="async" style={photo} />
            </div>
            <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "1 / 1", background: "#eef1f7" }}>
              <img src="/como/iguazu.webp" alt="Cataratas de Iguazú" width={800} height={800} loading="lazy" decoding="async" style={photo} />
            </div>
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section style={{ ...wrap, padding: sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "clamp(14px,2vw,22px)" }}>
          {[
            { q: "“Nos organizaron todo Europa y la visa de Estados Unidos. Viajamos tranquilos, sin una sola sorpresa.”", i: "R", n: "Familia Rodríguez", s: "Bogotá · Europa Fantástica 2025", bg: GOLD },
            { q: "“Me habían negado la visa antes. Con su asesoría preparé la entrevista y esta vez la aprobaron.”", i: "A", n: "Andrés M.", s: "Visa Americana aprobada · 2025", bg: NAVY },
            { q: "“Atención cercana y honesta. Respondían cada duda por WhatsApp, incluso los domingos.”", i: "C", n: "Carolina & Julián", s: "Bogotá · Euro Leyendas 2024", bg: INK },
          ].map((t) => (
            <div key={t.n} style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: "clamp(22px,2.8vw,32px)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 14, color: "#e0a521", letterSpacing: ".14em", marginBottom: 14 }}>★★★★★</div>
              <blockquote style={quote}>{t.q}</blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", paddingTop: 22 }}>
                <div style={avatar(t.bg)}>{t.i}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-.01em" }}>{t.n}</div>
                  <div style={{ fontSize: 12.5, color: "#8b93a1", fontWeight: 400, marginTop: 2 }}>{t.s}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1", background: "#fff", border: "1px solid rgba(11,21,38,.09)", borderRadius: 22, padding: "clamp(22px,2.8vw,32px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(22px,3.5vw,44px)", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", color: GOLD, marginBottom: 10 }}>RESEÑAS EN GOOGLE</div>
              <div style={{ fontSize: "clamp(21px,2.6vw,30px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.1, textWrap: "pretty" }}>¿Viajaste con nosotros? Cuéntalo en Google</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "#5d6673", fontWeight: 300, marginTop: 10, maxWidth: "46ch" }}>
                Tu reseña ayuda a que otros viajeros de Bogotá nos encuentren y sepan con quién están tramitando.
              </div>
              <a href="https://g.page/r/CQgbCxwc0CvcECE/review" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: NAVY, color: "#fff", fontSize: 14.5, fontWeight: 600, padding: "14px 24px", borderRadius: 12, marginTop: 20, textDecoration: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.86.6-5.2 4.52 1.55 6.72L12 16.6l-6.11 3.5 1.55-6.72-5.2-4.52 6.86-.6z" /></svg>
                Escribir mi reseña
              </a>
            </div>
            <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ border: "1px solid rgba(11,21,38,.12)", borderRadius: 16, padding: 10, background: "#fff" }}>
                <img src="/qr-resenas.png" alt="Código QR para dejar una reseña en Google" style={{ display: "block", width: "clamp(116px,13vw,150px)", height: "auto" }} />
              </div>
              <div style={{ fontSize: 12.5, color: "#8b93a1", fontWeight: 500, textAlign: "center", maxWidth: "18ch" }}>Escanea con tu celular</div>
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1", background: INK, borderRadius: 22, padding: "clamp(22px,2.8vw,32px)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(18px,3vw,40px)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: "clamp(34px,4.4vw,50px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1 }}>+2.400</div>
              <div style={{ fontSize: 14.5, color: "rgba(255,255,255,.72)", fontWeight: 300, maxWidth: "34ch" }}>
                viajeros acompañados desde 2013, con visas para cinco consulados.
              </div>
            </div>
            <a href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid rgba(255,255,255,.4)", color: "#fff", fontSize: 14.5, fontWeight: 600, padding: "13px 22px", borderRadius: 12, flexShrink: 0, textDecoration: "none" }}>
              Quiero ser el siguiente
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ ...wrap, padding: "clamp(44px,6.5vw,90px) clamp(16px,3.5vw,44px)" }}>
        <div style={{ position: "relative", borderRadius: "clamp(22px,3vw,32px)", overflow: "hidden", padding: "clamp(32px,4.6vw,70px) clamp(24px,3.6vw,52px)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "clamp(22px,4vw,48px)", flexWrap: "wrap" }}>
          <img src="/cta/fondo.webp" alt="" width={1800} height={760} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg,rgba(3,10,28,.92),rgba(3,10,28,.55))" }} />
          <div style={{ position: "relative", color: "#fff", maxWidth: 580 }}>
            <h2 style={{ fontSize: "clamp(28px,4.4vw,54px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.02, margin: 0, textWrap: "pretty" }}>
              Cuéntanos tu próximo viaje
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,.85)", margin: "13px 0 0", fontWeight: 300 }}>
              Escríbenos y armamos tu plan hoy mismo. Sin compromiso.
            </p>
          </div>
          <a href={WA} target="_blank" rel="noopener" style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 11, background: GOLD, color: "#fff", fontSize: 17, fontWeight: 700, padding: "19px 32px", borderRadius: 14, flexShrink: 0, textDecoration: "none" }}>
            <WhatsappIcon size={20} />
            +57 313 488 3629
          </a>
        </div>
      </section>

      <footer style={{ background: INK, color: "#fff" }}>
        <div style={{ ...wrap, padding: "clamp(28px,3.6vw,44px) clamp(16px,3.5vw,44px)", display: "flex", justifyContent: "space-between", gap: 22, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
              <img src="/logo-wonderlust.webp" alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", display: "block" }} />
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.03em" }}>Wonderlust</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".2em", color: YELLOW }}>WVIAJES.CO</span>
            </div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.6)", fontWeight: 300, lineHeight: 1.6 }}>
              Agencia de viajes y consultoría de visas<br />Bogotá, Colombia · +57 313 488 3629
            </div>
          </div>
          <div style={{ display: "flex", gap: "clamp(24px,4vw,60px)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={footHead}>SERVICIOS</div>
              <a href="#visas" style={footLink}>Visas</a>
              <a href="#ofertas" style={footLink}>Paquetes</a>
              <a href={WA} target="_blank" rel="noopener" style={footLink}>Tiquetes</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={footHead}>TRÁMITES</div>
              <a href="/visa-usa" style={footLink}>Formulario EE. UU.</a>
              <a href="/visa-china" style={footLink}>Formulario China</a>
              <a href="/devolucion-pasaportes" style={footLink}>Devolución de pasaportes</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
