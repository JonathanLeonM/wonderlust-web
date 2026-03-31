"use client";

import Link from "next/link";
import Image from "next/image";

export default function EuropaPage() {
  return (
    <main style={{ background: "#0a0a0a", color: "white", minHeight: "100svh" }}>

      {/* ── HEADER ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "linear-gradient(180deg, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.75) 70%, transparent 100%)",
      }}>
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #f59e0b, #fcd34d, #f59e0b, transparent)" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.6rem clamp(1rem, 4vw, 3rem)" }}>
          <Link href="/" style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <div style={{
              width: "clamp(58px, 9vw, 110px)", height: "clamp(58px, 9vw, 110px)",
              borderRadius: "50%", border: "2px solid rgba(251,191,36,0.9)",
              boxShadow: "0 0 28px rgba(251,191,36,0.6)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "radial-gradient(circle, rgba(15,23,42,0.95), rgba(2,6,23,0.98))",
              position: "relative",
            }}>
              <div style={{ position: "relative", width: "clamp(42px, 6.5vw, 82px)", height: "clamp(42px, 6.5vw, 82px)" }}>
                <Image src="/logo-wonderlust.png" alt="Wonderlust" fill className="object-contain scale-[1.55]" />
              </div>
            </div>
            <div>
              <div style={{
                fontSize: "clamp(0.9rem, 2.2vw, 1.5rem)", fontWeight: 800, letterSpacing: "0.2em",
                backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #fcd34d, #d97706)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", backgroundColor: "transparent",
              }}>WONDERLUST</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "2px 0" }}>
                <div style={{ height: "1px", width: "20px", background: "rgba(251,191,36,0.6)" }} />
                <span style={{ fontSize: "0.5rem", color: "rgba(253,211,77,0.8)" }}>✦</span>
                <div style={{ height: "1px", width: "20px", background: "rgba(251,191,36,0.6)" }} />
              </div>
              <div style={{ fontSize: "clamp(0.45rem, 1vw, 0.65rem)", letterSpacing: "0.18em", color: "rgba(253,211,77,0.65)", textTransform: "uppercase" }}>
                by Villamor S.A.S
              </div>
            </div>
          </Link>

          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {[["/#explorar","Explorar"],["/#mas-destinos","Más destinos"],["/ofertas","Ofertas"],["/visas","Visas"]].map(([href, label]) => (
              <a key={label} href={href} className="hidden md:block" style={{
                fontSize: "0.88rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.95)", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}>
                {label}
              </a>
            ))}
          </nav>

          <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer" style={{
            flexShrink: 0, backgroundImage: "linear-gradient(135deg, #f59e0b, #fcd34d, #f59e0b)",
            backgroundColor: "#f59e0b", color: "#0f172a", fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", borderRadius: "9999px", textDecoration: "none",
            boxShadow: "0 0 18px rgba(245,158,11,0.45)",
            fontSize: "clamp(0.62rem, 1.3vw, 0.78rem)",
            padding: "0.55rem clamp(0.75rem, 2vw, 1.4rem)",
          }}>WhatsApp</a>
        </div>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)" }} />
      </header>

      {/* ── HERO VIDEO ── */}
      <section style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
          }}
        >
          <source src="/videos/paris.mp4" type="video/mp4" />
        </video>

        {/* Overlay oscuro con degradado */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 100%)",
        }} />

        {/* Contenido encima del video */}
        <div style={{
          position: "relative", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "clamp(3rem, 8vh, 6rem)",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)",
            borderRadius: "9999px", padding: "0.3rem 0.9rem", marginBottom: "1.25rem",
            backdropFilter: "blur(8px)", width: "fit-content",
          }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fcd34d" }}>✦ DESTINO ✦</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 900, lineHeight: 1.05,
            textShadow: "0 4px 30px rgba(0,0,0,0.8)",
            backgroundImage: "linear-gradient(135deg, #ffffff 0%, #fde68a 60%, #f59e0b 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", backgroundColor: "transparent",
            maxWidth: "800px",
          }}>
            Europa
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "rgba(255,255,255,0.88)",
            maxWidth: "560px", lineHeight: 1.65, marginTop: "1rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
          }}>
            Descubre los paisajes, culturas y experiencias más inolvidables del viejo continente.
          </p>

          {/* Línea dorada decorativa */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg, transparent, #f59e0b)" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "#fcd34d", textTransform: "uppercase" }}>Paquetes y circuitos</span>
            <div style={{ height: "1px", flex: 1, maxWidth: "120px", background: "linear-gradient(90deg, #f59e0b, transparent)" }} />
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer" style={{
              backgroundImage: "linear-gradient(135deg, #f59e0b, #fcd34d, #f59e0b)",
              backgroundColor: "#f59e0b", color: "#0f172a", fontWeight: 700,
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)", letterSpacing: "0.05em",
              padding: "0.85rem 2rem", borderRadius: "9999px", textDecoration: "none",
              boxShadow: "0 0 28px rgba(245,158,11,0.5)",
            }}>
              Cotizar viaje a Europa
            </a>
            <Link href="/destinos" style={{
              border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)",
              color: "white", fontWeight: 600, fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              padding: "0.85rem 2rem", borderRadius: "9999px", textDecoration: "none",
              backdropFilter: "blur(8px)",
            }}>
              Ver más destinos
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "1.5rem", right: "2rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
        }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: "1px", height: "40px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)",
          }} />
        </div>
      </section>

      {/* ── SECCIÓN PAQUETES (placeholder) ── */}
      <section style={{ background: "#f8f6f2", color: "#0f172a", padding: "5rem clamp(1.5rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#b45309" }}>
            ✦ Paquetes disponibles
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, marginTop: "0.75rem", color: "#0f172a" }}>
            Paquetes y circuitos por Europa
          </h2>
          <p style={{ marginTop: "1rem", fontSize: "1.1rem", color: "#475569", maxWidth: "600px" }}>
            Aquí vamos a mostrar tus paquetes turísticos de Europa. Próximamente más opciones.
          </p>

          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" style={{
              border: "1px solid #cbd5e1", borderRadius: "1rem",
              padding: "0.75rem 1.5rem", fontWeight: 600, color: "#0f172a", textDecoration: "none",
            }}>
              ← Volver al inicio
            </Link>
            <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer" style={{
              background: "#0f172a", color: "white", borderRadius: "1rem",
              padding: "0.75rem 1.5rem", fontWeight: 600, textDecoration: "none",
            }}>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#f8f6f2", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>
          <p>© 2026 Wonderlust by Villamor S.A.S. Todos los derechos reservados.</p>
          <p>Diseño web moderno para viajes, visas y ventas.</p>
        </div>
      </footer>

    </main>
  );
}