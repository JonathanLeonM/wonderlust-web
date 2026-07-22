"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const paquetes = [
  {
    slug: "europa-chic",
    nombre: "Europa Chic",
    dias: "19 días / 17 noches",
    precio: "Desde USD 3.211",
    ciudades: "Madrid, París, Luxemburgo, Frankfurt, Zúrich, Venecia, Florencia, Roma y más",
    incluye: ["Tiquetes aéreos con impuestos", "Hoteles categoría turista", "Desayunos diarios", "Guía acompañante"],
    img: "/paquetes/europa/europa-chic.png",
  },
  {
    slug: "euro-leyendas",
    nombre: "Euro Leyendas",
    dias: "18 días / 16 noches",
    precio: "Desde USD 3.371",
    ciudades: "París, Brujas, Ámsterdam, Colonia, Praga, Innsbruck, Venecia, Florencia, Roma, Barcelona, Madrid y más",
    incluye: ["Tiquetes aéreos Air Europa", "Hoteles categoría turista", "Desayunos diarios", "Crucero por el Rhin"],
    img: "/paquetes/europa/euro-leyendas-flyer.png",
  },
];

export default function EuropaPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showWA, setShowWA] = useState(true);

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

      {/* ── HERO VIDEO ── */}
      <section style={{ position: "relative", height: "75vh", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
          <source src="https://res.cloudinary.com/dmponcqpb/video/upload/Paris_ihlvbr.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%)" }} />

        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(1.5rem, 5vw, 4rem)", paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: "9999px", padding: "0.3rem 1rem", marginBottom: "1rem", backdropFilter: "blur(8px)", width: "fit-content" }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fcd34d" }}>✦ DESTINO ✦</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.05, textShadow: "0 4px 30px rgba(0,0,0,0.8)", backgroundImage: "linear-gradient(135deg, #ffffff 0%, #fde68a 60%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundColor: "transparent", maxWidth: "700px" }}>Europa</h1>

          <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.85)", maxWidth: "500px", lineHeight: 1.6, marginTop: "0.75rem", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
            Descubre los paisajes, culturas y experiencias más inolvidables del viejo continente.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <a href="#paquetes" style={{ backgroundImage: "linear-gradient(135deg, #f59e0b, #fcd34d, #f59e0b)", backgroundColor: "#f59e0b", color: "#0f172a", fontWeight: 700, fontSize: "clamp(0.85rem, 1.5vw, 1rem)", padding: "0.75rem 2rem", borderRadius: "9999px", textDecoration: "none", boxShadow: "0 0 28px rgba(245,158,11,0.5)" }}>Ver paquetes ↓</a>
            <a href="https://wa.me/573144327782" target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "white", fontWeight: 600, fontSize: "clamp(0.85rem, 1.5vw, 1rem)", padding: "0.75rem 2rem", borderRadius: "9999px", textDecoration: "none", backdropFilter: "blur(8px)" }}>Cotizar ahora</a>
          </div>
        </div>

        {/* Flecha scroll */}
        <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", animation: "bounce 2s infinite" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ── PAQUETES ── */}
      <section id="paquetes" style={{ background: "#f8f6f2", color: "#0f172a", padding: "5rem clamp(1.5rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#b45309" }}>✦ Paquetes disponibles</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, marginTop: "0.5rem" }}>Paquetes y circuitos por Europa</h2>
          <p style={{ marginTop: "0.75rem", fontSize: "1.05rem", color: "#475569" }}>Selecciona el paquete que más se adapte a tu sueño europeo.</p>

          {/* Grid de cards */}
          <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {paquetes.map((p) => (
              <Link key={p.slug} href={`/europa/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  background: "white", borderRadius: "1.5rem", overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)", transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px solid #e2e8f0", cursor: "pointer",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.14)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}>

                  {/* Imagen */}
                  <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                    <Image src={p.img} alt={p.nombre} fill style={{ objectFit: "contain", objectPosition: "center bottom" }} />
                    {/* Badge días */}
                    <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(2,6,23,0.75)", backdropFilter: "blur(8px)", borderRadius: "9999px", padding: "0.3rem 0.85rem", border: "1px solid rgba(251,191,36,0.4)" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#fcd34d", letterSpacing: "0.05em" }}>{p.dias}</span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>{p.nombre}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.4rem", lineHeight: 1.5 }}>{p.ciudades}</p>

                    {/* Precio */}
                    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Por persona</p>
                        <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#b45309" }}>{p.precio}</p>
                      </div>
                      <div style={{ background: "linear-gradient(135deg, #f59e0b, #fcd34d)", borderRadius: "9999px", padding: "0.5rem 1.25rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>Ver detalle →</span>
                      </div>
                    </div>

                    {/* Incluye */}
                    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f1f5f9", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {p.incluye.map((item) => (
                        <span key={item} style={{ fontSize: "0.72rem", background: "#f1f5f9", color: "#475569", borderRadius: "9999px", padding: "0.25rem 0.65rem" }}>✓ {item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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