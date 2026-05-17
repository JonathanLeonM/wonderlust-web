"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const paises = [
  { id: "eeuu",      label: "🇺🇸 Estados Unidos" },
  { id: "costarica", label: "🇨🇷 Costa Rica" },
  { id: "japon",     label: "🇯🇵 Japón" },
  { id: "china",     label: "🇨🇳 China" },
  { id: "canada",    label: "🇨🇦 Canadá" },
];

const planes = [
  {
    id: "evaluacion",
    nombre: "Evaluación de Perfil",
    duracion: "30 minutos",
    modalidad: "Videollamada",
    ideal: "Personas que están comenzando su proceso y no saben por dónde empezar ni qué tipo de visa se ajusta mejor a su perfil, país y objetivos.",
    incluye: [
      "Orientación sobre el tipo de visa que podría ajustarse a tu caso",
      "Explicación de los primeros pasos del proceso",
      "Diagnóstico personalizado de tu situación",
      "Diligenciamiento del formulario del cliente",
    ],
    precios: {
      eeuu:      { normal: 80000,  tachado: 130000 },
      costarica: { normal: 80000,  tachado: 130000 },
      japon:     { normal: 80000,  tachado: 130000 },
      china:     { normal: 80000,  tachado: 130000 },
      canada:    { normal: 80000,  tachado: 130000 },
    },
    wompi: {
      eeuu:      "https://checkout.wompi.co/l/Us7xIQ",
      costarica: "https://checkout.wompi.co/l/Us7xIQ",
      japon:     "https://checkout.wompi.co/l/Us7xIQ",
      china:     "https://checkout.wompi.co/l/Us7xIQ",
      canada:    "https://checkout.wompi.co/l/Us7xIQ",
    },
    destacado: false,
  },
  {
    id: "preentrevista",
    nombre: "Pre-Entrevista",
    duracion: "90 minutos",
    modalidad: "Videollamada",
    ideal: "Personas que ya tienen su cita próxima y desean prepararse para comunicarse con claridad, seguridad y naturalidad.",
    incluye: [
      "Simulación guiada con preguntas frecuentes",
      "Retroalimentación sobre claridad y estructura de respuestas",
      "Recomendaciones para manejar nervios",
      "Consejos para evitar errores comunes en la entrevista",
      "Diligenciamiento del formulario del cliente",
    ],
    precios: {
      eeuu:      { normal: 220000, tachado: 370000 },
      costarica: { normal: 220000, tachado: 370000 },
      japon:     { normal: 220000, tachado: 370000 },
      china:     { normal: 220000, tachado: 370000 },
      canada:    { normal: 320000, tachado: 470000 },
    },
    wompi: {
      eeuu:      "https://checkout.wompi.co/l/R4QizX",
      costarica: "https://checkout.wompi.co/l/R4QizX",
      japon:     "https://checkout.wompi.co/l/R4QizX",
      china:     "https://checkout.wompi.co/l/R4QizX",
      canada:    "https://checkout.wompi.co/l/qcR2iR",
    },
    destacado: false,
  },
  {
    id: "combo",
    nombre: "Combo Evaluación + Pre-Entrevista",
    duracion: "120 minutos",
    modalidad: "Videollamada",
    ideal: "La opción más completa. Cubre desde el diagnóstico inicial hasta la preparación total para tu entrevista de visa.",
    incluye: [
      "Todo lo de Evaluación de Perfil",
      "Todo lo de Pre-Entrevista",
      "Diligenciamiento del formulario del cliente",
      "Ahorro vs contratar por separado",
      "Acompañamiento completo de inicio a fin",
    ],
    precios: {
      eeuu:      { normal: 250000, tachado: 300000 },
      costarica: { normal: 250000, tachado: 300000 },
      japon:     { normal: 250000, tachado: 300000 },
      china:     { normal: 250000, tachado: 300000 },
      canada:    { normal: 350000, tachado: 400000 },
    },
    wompi: {
      eeuu:      "https://checkout.wompi.co/l/WadHBw",
      costarica: "https://checkout.wompi.co/l/WadHBw",
      japon:     "https://checkout.wompi.co/l/WadHBw",
      china:     "https://checkout.wompi.co/l/WadHBw",
      canada:    "https://checkout.wompi.co/l/urqCID",
    },
    destacado: true,
  },
];

function formatCOP(n: number) {
  return "$" + n.toLocaleString("es-CO");
}

export default function VisasPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showWA, setShowWA] = useState(true);
  const [paisId, setPaisId] = useState("eeuu");

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
    <main style={{ minHeight: "100svh", background: "#020617", color: "white" }}>

      {/* ── NAV ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(2,6,23,0.95)" : "linear-gradient(180deg, rgba(2,6,23,0.8) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.4s",
      }}>
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
                <Link href={href} style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}>{label}</Link>
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/" title="Inicio" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid rgba(251,191,36,0.4)", color: "rgba(255,255,255,0.85)", textDecoration: "none", transition: "all 0.2s" }}
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

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "45vh", display: "flex", alignItems: "flex-end", overflow: "hidden", paddingBottom: "4rem", paddingTop: "8rem" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.12) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(27,58,107,0.3) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)", textAlign: "center", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: "9999px", padding: "0.3rem 1rem", marginBottom: "1.5rem", backdropFilter: "blur(8px)" }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fcd34d" }}>✦ SERVICIOS DE VISA ✦</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.05, textShadow: "0 4px 30px rgba(0,0,0,0.8)", backgroundImage: "linear-gradient(135deg, #ffffff 0%, #fde68a 60%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundColor: "transparent" }}>
            Apoyo personalizado<br />en tu proceso de visa
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.7)", maxWidth: "560px", lineHeight: 1.7, margin: "1rem auto 0" }}>
            Selecciona tu país de destino y elige el servicio que más se adapta a tu momento en el proceso.
          </p>
        </div>
      </section>

      {/* ── SELECTOR + PLANES ── */}
      <section style={{ background: "#f8f6f2", color: "#0f172a", padding: "4rem clamp(1.5rem, 5vw, 4rem) 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Selector de país */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#b45309", marginBottom: "1rem" }}>¿Para qué país necesitas el servicio?</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem" }}>
              {paises.map((p) => (
                <button key={p.id} onClick={() => setPaisId(p.id)} style={{
                  padding: "0.6rem 1.4rem", borderRadius: "9999px", border: "2px solid",
                  borderColor: paisId === p.id ? "#f59e0b" : "#e2e8f0",
                  background: paisId === p.id ? "#f59e0b" : "white",
                  color: paisId === p.id ? "#0f172a" : "#475569",
                  fontWeight: paisId === p.id ? 700 : 500,
                  fontSize: "0.9rem", cursor: "pointer",
                  transition: "all 0.2s", boxShadow: paisId === p.id ? "0 4px 16px rgba(245,158,11,0.35)" : "none",
                }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            {planes.map((plan) => {
              const precio = plan.precios[paisId as keyof typeof plan.precios];
              const wompiUrl = plan.wompi[paisId as keyof typeof plan.wompi];
              return (
                <div key={plan.id} style={{
                  background: "white", borderRadius: "1.5rem", overflow: "hidden",
                  border: plan.destacado ? "2px solid #f59e0b" : "1px solid #e2e8f0",
                  boxShadow: plan.destacado ? "0 8px 40px rgba(245,158,11,0.2)" : "0 4px 24px rgba(0,0,0,0.06)",
                  position: "relative", transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = plan.destacado ? "0 20px 50px rgba(245,158,11,0.3)" : "0 16px 40px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = plan.destacado ? "0 8px 40px rgba(245,158,11,0.2)" : "0 4px 24px rgba(0,0,0,0.06)"; }}>

                  {plan.destacado && (
                    <div style={{ background: "linear-gradient(135deg, #f59e0b, #fcd34d)", padding: "0.45rem", textAlign: "center" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0f172a" }}>⭐ Mejor valor — Más elegido</span>
                    </div>
                  )}

                  <div style={{ padding: "1.75rem" }}>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{plan.nombre}</h3>
                      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b" }}>⏱ {plan.duracion}</span>
                        <span style={{ fontSize: "0.78rem", color: "#64748b" }}>📹 {plan.modalidad}</span>
                      </div>
                    </div>

                    <div style={{ background: "#f8fafc", borderRadius: "0.75rem", padding: "0.9rem 1rem", marginBottom: "1.25rem", borderLeft: "3px solid #f59e0b" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#b45309", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ideal para</p>
                      <p style={{ fontSize: "0.83rem", color: "#475569", lineHeight: 1.6 }}>{plan.ideal}</p>
                    </div>

                    <ul style={{ listStyle: "none", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {plan.incluye.map((item) => (
                        <li key={item} style={{ fontSize: "0.83rem", color: "#374151", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                          <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", marginBottom: "0.3rem" }}>Precio por persona</p>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                        <span style={{ fontSize: "1.1rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 500 }}>
                          {formatCOP(precio.tachado)}
                        </span>
                        <span style={{ fontSize: "2rem", fontWeight: 900, color: "#b45309", lineHeight: 1 }}>
                          {formatCOP(precio.normal)}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.25rem" }}>Precios en COP · Pagos seguros con Wompi</p>
                    </div>

                    <a href={wompiUrl} target="_blank" rel="noreferrer" style={{
                      display: "block", textAlign: "center", width: "100%",
                      background: plan.destacado ? "linear-gradient(135deg, #f59e0b, #fcd34d)" : "#0f172a",
                      color: plan.destacado ? "#0f172a" : "white",
                      fontWeight: 800, fontSize: "1rem", letterSpacing: "0.03em",
                      padding: "0.9rem 1.5rem", borderRadius: "0.85rem",
                      textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
                      boxShadow: plan.destacado ? "0 4px 20px rgba(245,158,11,0.4)" : "0 4px 16px rgba(0,0,0,0.15)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
                      Reservar ahora →
                    </a>

                    <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.6rem" }}>
                      O escríbenos por{" "}
                      <a href="https://wa.me/573144327782" target="_blank" rel="noreferrer" style={{ color: "#16a34a", fontWeight: 600, textDecoration: "none" }}>WhatsApp</a>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#94a3b8", maxWidth: "600px", margin: "2.5rem auto 0", lineHeight: 1.7 }}>
            🔍 Orientación práctica y educativa, sin intervención legal ni representación ante autoridades. Estos honorarios no incluyen el fee consular ni tarifas externas asociadas al proceso.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#020617", borderTop: "1px solid rgba(251,191,36,0.15)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
          <p>© 2026 Wonderlust by Villamor S.A.S. Todos los derechos reservados.</p>
          <p>Agencia de viajes · Paquetes Europa · Visas Colombia</p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a href="https://wa.me/573144327782" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 100, width: "60px", height: "60px", borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,0.5)", transition: "transform 0.2s, box-shadow 0.2s, opacity 0.4s", opacity: showWA ? 1 : 0, pointerEvents: showWA ? "auto" : "none", textDecoration: "none" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(37,211,102,0.65)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(37,211,102,0.5)"; }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </main>
  );
}