"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const salidas = [
  {
    fecha: "18 sep – 06 oct 2025",
    tarifas: [
      { tipo: "Doble", precio: "USD 3.248" },
      { tipo: "Triple", precio: "USD 3.248" },
      { tipo: "Sencilla", precio: "USD 4.434" },
      { tipo: "Niño (2-7 años)", precio: "USD 2.823" },
    ],
  },
  {
    fecha: "22 oct – 09 nov 2025",
    tarifas: [
      { tipo: "Doble", precio: "USD 3.211" },
      { tipo: "Triple", precio: "USD 3.211" },
      { tipo: "Sencilla", precio: "USD 4.397" },
      { tipo: "Niño (2-7 años)", precio: "USD 2.786" },
    ],
  },
];

const ciudades = [
  "Madrid", "San Sebastián", "Burdeos", "París", "Luxemburgo",
  "Valle del Rhin", "Frankfurt", "Heidelberg", "Selva Negra (Friburgo)",
  "Zúrich", "Lucerna", "Venecia", "Padova", "Florencia",
  "Asís", "Roma", "Pisa", "Niza", "Nimes", "Barcelona",
];

const incluye = [
  { icon: "✈️", texto: "Tiquetes aéreos Bogotá – Madrid – Bogotá con Aireuropa" },
  { icon: "🧳", texto: "Equipaje: bodega 23 kg + cabina 10 kg + morral 8 kg" },
  { icon: "🚌", texto: "Traslados de llegada y salida" },
  { icon: "🏨", texto: "Alojamiento en hoteles categoría turista" },
  { icon: "🍳", texto: "Desayunos diarios" },
  { icon: "🎙️", texto: "Guía acompañante durante todo el recorrido" },
  { icon: "🚍", texto: "Transporte en autocar turístico" },
  { icon: "🚢", texto: "Traslado en vaporetto en Venecia" },
  { icon: "🗺️", texto: "Visitas con guía local en lugares indicados" },
  { icon: "🏥", texto: "Asistencia médica hasta 75 años — MOK, cobertura USD 60.000" },
  { icon: "💳", texto: "2% del fee bancario incluido" },
];

export default function EuropaChicPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showWA, setShowWA] = useState(true);
  const [salida, setSalida] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      setShowWA(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowWA(false), 4000);
    };
    show();
    window.addEventListener("mousemove", show);
    window.addEventListener("scroll", show);
    window.addEventListener("touchstart", show);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", show);
      window.removeEventListener("scroll", show);
      window.removeEventListener("touchstart", show);
    };
  }, []);

  return (
    <main style={{ minHeight: "100svh", background: "#f8f6f2", color: "#0f172a" }}>

      {/* ── NAV ── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? "rgba(2,6,23,0.95)" : "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)", boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none", transition: "all 0.4s" }}>
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #f59e0b, #fcd34d, #f59e0b, transparent)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0.75rem clamp(1.5rem, 4vw, 3.5rem)", gap: "1rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ width: "clamp(54px, 7vw, 80px)", height: "clamp(54px, 7vw, 80px)", borderRadius: "50%", border: "1.5px solid rgba(251,191,36,0.8)", boxShadow: "0 0 20px rgba(251,191,36,0.4)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle, rgba(15,23,42,0.95), rgba(2,6,23,0.98))", position: "relative" }}>
              <div style={{ position: "relative", width: "clamp(38px, 5vw, 58px)", height: "clamp(38px, 5vw, 58px)" }}>
                <Image src="/logo-wonderlust.png" alt="Wonderlust" fill className="object-contain scale-[1.55]" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 800, letterSpacing: "0.22em", backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #fcd34d, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundColor: "transparent" }}>WONDERLUST</div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", margin: "2px 0" }}>
                <div style={{ height: "1px", width: "18px", background: "rgba(251,191,36,0.6)" }} />
                <span style={{ fontSize: "0.5rem", color: "rgba(253,211,77,0.8)" }}>✦</span>
                <div style={{ height: "1px", width: "18px", background: "rgba(251,191,36,0.6)" }} />
              </div>
              <div style={{ fontSize: "clamp(0.5rem, 0.9vw, 0.62rem)", letterSpacing: "0.2em", color: "rgba(253,211,77,0.65)", textTransform: "uppercase" }}>by Villamor S.A.S</div>
            </div>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {[["/#explorar", "Inicio"], ["/destinos", "Destinos"], ["/visas", "Visas"]].map(([href, label], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {i > 0 && <span style={{ color: "rgba(251,191,36,0.35)", fontSize: "1rem" }}>|</span>}
                <Link href={href} style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", textDecoration: "none", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}>{label}</Link>
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid rgba(251,191,36,0.4)", color: "rgba(255,255,255,0.85)", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#fcd34d"; (e.currentTarget as HTMLElement).style.color = "#fcd34d"; (e.currentTarget as HTMLElement).style.background = "rgba(251,191,36,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,191,36,0.4)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                <path d="M9 21V12h6v9"/>
              </svg>
            </Link>
          </div>
        </div>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.35), transparent)" }} />
      </header>

      {/* ── HERO IMAGEN ── */}
      <section style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
        <Image src="/paquetes/europa/europa-chic-hero1.png" alt="Europa Chic - Paquete turístico" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem clamp(1.5rem, 5vw, 4rem)" }}>
          <Link href="/europa" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
            ← Volver a Europa
          </Link>
          <h1 style={{
              fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 900, lineHeight: 1.05,
              textShadow: "0 4px 30px rgba(0,0,0,0.9)",
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #fde68a 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", backgroundColor: "transparent",
            }}>Europa Chic</h1>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.5)", borderRadius: "9999px", padding: "0.25rem 0.85rem", fontSize: "0.8rem", color: "#fcd34d", fontWeight: 600 }}>19 días / 17 noches</span>
            <span style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "9999px", padding: "0.25rem 0.85rem", fontSize: "0.8rem", color: "white" }}>20 ciudades</span>
          </div>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem clamp(1.5rem, 5vw, 4rem)", display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>

        {/* COLUMNA IZQUIERDA */}
        <div>
          {/* Ciudades */}
          <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🗺️ Ciudades incluidas
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {ciudades.map((c) => (
                <span key={c} style={{ background: "#f1f5f9", color: "#475569", borderRadius: "9999px", padding: "0.3rem 0.85rem", fontSize: "0.85rem", fontWeight: 500 }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Flyer */}
          <div style={{ marginBottom: "2rem", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <Image src="/paquetes/europa/europa-chic-flyer.png" alt="Europa Chic - Flyer" width={1200} height={1800} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

          {/* Qué incluye */}
          <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem" }}>✅ Qué incluye</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {incluye.map((item) => (
                <div key={item.texto} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.icon}</span>
                  <p style={{ fontSize: "0.95rem", color: "#334155", lineHeight: 1.5 }}>{item.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA — Cotizador */}
        <div style={{ position: "sticky", top: "7rem" }}>
          <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", color: "#0f172a" }}>Selecciona tu salida</h3>

            {/* Tabs salidas */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {salidas.map((s, i) => (
                <button key={i} onClick={() => setSalida(i)} style={{
                  flex: 1, padding: "0.6rem 0.5rem", borderRadius: "0.75rem", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, transition: "all 0.2s",
                  background: salida === i ? "#0f172a" : "#f1f5f9",
                  color: salida === i ? "white" : "#64748b",
                }}>
                  {s.fecha}
                </button>
              ))}
            </div>

            {/* Tarifas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              {salidas[salida].tarifas.map((t) => (
                <div key={t.tipo} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 500 }}>{t.tipo}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#b45309" }}>{t.precio}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "1.25rem", textAlign: "center" }}>* Tarifas por persona en acomodación doble</p>

            <a href={`https://wa.me/573212620948?text=Hola! Me interesa el paquete Europa Chic - ${salidas[salida].fecha}`} target="_blank" rel="noreferrer" style={{
              display: "block", textAlign: "center", background: "linear-gradient(135deg, #f59e0b, #fcd34d)",
              color: "#0f172a", fontWeight: 700, fontSize: "1rem", padding: "0.9rem",
              borderRadius: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(245,158,11,0.3)",
            }}>
              Cotizar por WhatsApp 💬
            </a>

            <Link href="/europa" style={{ display: "block", textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "#94a3b8", textDecoration: "none" }}>
              ← Ver todos los paquetes de Europa
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#020617", borderTop: "1px solid rgba(251,191,36,0.15)", marginTop: "4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
          <p>© 2026 Wonderlust by Villamor S.A.S. Todos los derechos reservados.</p>
          <p>Agencia de viajes · Paquetes Europa · Visas Colombia</p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 100, width: "60px", height: "60px", borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,0.5)", transition: "transform 0.2s, box-shadow 0.2s, opacity 0.4s", opacity: showWA ? 1 : 0, pointerEvents: showWA ? "auto" : "none", textDecoration: "none" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(37,211,102,0.65)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(37,211,102,0.5)"; }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </main>
  );
}