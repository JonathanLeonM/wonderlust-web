"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 0,
    type: "destinos",
    eyebrow: "DESTINOS",
    title: "El mundo te espera",
    text: "Descubre Europa, América y Asia con paquetes diseñados para vivir experiencias únicas. Cada destino, una historia que contar.",
    cta: { label: "Ver destinos", href: "/destinos" },
  },
  {
    id: 1,
    type: "visas",
    eyebrow: "VISAS",
    title: "Tu trámite de visa empieza hoy",
    text: "Te guiamos paso a paso para que avances de forma clara, rápida y con el respaldo adecuado para presentar tu solicitud con mayor seguridad.",
    cta: { label: "Ver visas", href: "/visas" },
    img: "/visas/visa-usa.png",
  },
  {
    id: 2,
    type: "sele",
    eyebrow: "APOYA LA SELE",
    title: "Vívelo en el estadio",
    text: "Tal vez estemos viendo los últimos grandes capítulos de una generación que nos hizo soñar. No te lo pierdas.",
    cta: { label: "Desde 3.699 USD", href: "https://wa.me/573212620948" },
    img: "/hero/sele.png",
  },
  {
    id: 3,
    type: "sim",
    eyebrow: "SIM INTERNACIONAL",
    title: "No te desconectes mientras viajas",
    text: "Conectividad real en más de 190 países. Llega preparado, evita costos de roaming y mantente siempre conectado.",
    cta: { label: "Conoce la SIM que te sirve", href: "https://wa.me/573212620948" },
    img: "/hero/sim.png",
  },
];

const destinos = [
  { label: "Europa", src: "/destinos/europa.png", href: "/europa" },
  { label: "América", src: "/destinos/america.png", href: "/america" },
  { label: "Asia", src: "/destinos/asia.png", href: "/asia" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showWA, setShowWA] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => changeSlide((current + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, [current]);

  const changeSlide = (next: number) => {
    setVisible(false);
    setTimeout(() => { setCurrent(next); setVisible(true); }, 300);
  };

  // Ocultar WhatsApp tras 4s de inactividad
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

  const slide = slides[current];

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

        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center", padding: "0.75rem clamp(1.5rem, 4vw, 3.5rem)", gap: "1rem",
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{
              width: "clamp(54px, 7vw, 80px)", height: "clamp(54px, 7vw, 80px)",
              borderRadius: "50%", border: "1.5px solid rgba(251,191,36,0.8)",
              boxShadow: "0 0 20px rgba(251,191,36,0.4)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "radial-gradient(circle, rgba(15,23,42,0.95), rgba(2,6,23,0.98))",
              position: "relative",
            }}>
              <div style={{ position: "relative", width: "clamp(38px, 5vw, 58px)", height: "clamp(38px, 5vw, 58px)" }}>
                <Image src="/logo-wonderlust.png" alt="Wonderlust - Agencia de viajes Colombia" fill className="object-contain scale-[1.55]" />
              </div>
            </div>
            <div>
              <div style={{
                fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 800, letterSpacing: "0.22em",
                backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #fcd34d, #d97706)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", backgroundColor: "transparent",
              }}>WONDERLUST</div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", margin: "2px 0" }}>
                <div style={{ height: "1px", width: "18px", background: "rgba(251,191,36,0.6)" }} />
                <span style={{ fontSize: "0.5rem", color: "rgba(253,211,77,0.8)" }}>✦</span>
                <div style={{ height: "1px", width: "18px", background: "rgba(251,191,36,0.6)" }} />
              </div>
              <div style={{ fontSize: "clamp(0.5rem, 0.9vw, 0.62rem)", letterSpacing: "0.2em", color: "rgba(253,211,77,0.65)", textTransform: "uppercase" }}>
                by Villamor S.A.S
              </div>
            </div>
          </Link>

          {/* Nav centro */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {[["/#explorar", "Inicio"], ["/destinos", "Destinos"], ["/visas", "Visas"]].map(([href, label], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {i > 0 && <span style={{ color: "rgba(251,191,36,0.35)", fontSize: "1rem" }}>|</span>}
                <Link href={href} style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.9)",
                  textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}>
                  {label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Casita */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/" title="Inicio" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "48px", height: "48px", borderRadius: "50%",
              border: "1.5px solid rgba(251,191,36,0.4)", color: "rgba(255,255,255,0.85)",
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#fcd34d";
              (e.currentTarget as HTMLElement).style.color = "#fcd34d";
              (e.currentTarget as HTMLElement).style.background = "rgba(251,191,36,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,191,36,0.4)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}>
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
      <section id="explorar" style={{ position: "relative", height: "100svh", overflow: "hidden" }}>

        {/* Fondo */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/hero/fondoHero.png" alt="Agencia de viajes Wonderlust" fill priority quality={90} sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.25) 40%, rgba(2,6,23,0.7) 100%)" }} />

        {/* Contenido */}
        <div style={{
          position: "relative", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s, transform 0.5s",
        }}>

          {/* SLIDE DESTINOS */}
          {slide.type === "destinos" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "clamp(5.5rem, 10vh, 8rem)" }}>
              {/* Título */}
              <div style={{ textAlign: "center", padding: "0 1rem 1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#fcd34d", marginBottom: "0.5rem" }}>
                  {slide.eyebrow}
                </p>
                <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 900, lineHeight: 1.1, textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}>
                  {slide.title}
                </h1>
                <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", color: "rgba(255,255,255,0.8)", marginTop: "0.6rem", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
                  {slide.text}
                </p>
              </div>

              {/* Vitrinas */}
              <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
                {destinos.map((dest, i) => (
                  <Link key={dest.label} href={dest.href}
                    style={{
                      flex: hovered === i ? 1.6 : hovered !== null ? 0.7 : 1,
                      transition: "flex 0.4s cubic-bezier(0.4,0,0.2,1)",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      justifyContent: "flex-end", textDecoration: "none", color: "white",
                      overflow: "hidden", position: "relative", cursor: "pointer",
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <img src={dest.src} alt={dest.label} style={{
                      position: "absolute", bottom: 0, left: "50%",
                      height: "100%", width: "auto", objectFit: "contain",
                      transition: "transform 0.4s",
                      transform: hovered === i ? "translateX(-50%) scale(1.04)" : "translateX(-50%) scale(1)",
                    }} />
                    <div style={{
                      position: "relative", zIndex: 2, textAlign: "center",
                      paddingBottom: "1rem",
                      background: "linear-gradient(0deg, rgba(2,6,23,0.7) 0%, transparent 100%)",
                      width: "100%", paddingTop: "3rem",
                    }}>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(253,211,77,0.85)" }}>Destino</p>
                      <h3 style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 700, marginTop: "0.2rem" }}>{dest.label}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Botón */}
              <div style={{ textAlign: "center", padding: "1rem 0 0.5rem" }}>
                <Link href={slide.cta.href} style={{
                  display: "inline-block", background: "linear-gradient(135deg, #f59e0b, #fcd34d)",
                  color: "#0f172a", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.05em",
                  padding: "0.75rem 2rem", borderRadius: "9999px", textDecoration: "none",
                  boxShadow: "0 0 24px rgba(245,158,11,0.4)",
                }}>
                  {slide.cta.label}
                </Link>
              </div>
            </div>
          )}

          {/* SLIDES VISAS / SELE / SIM */}
          {slide.type !== "destinos" && (
            <div style={{
              flex: 1, display: "flex", alignItems: "center",
              padding: "clamp(5.5rem, 10vh, 8rem) clamp(2rem, 6vw, 6rem) 2rem",
              maxWidth: "1320px", margin: "0 auto", width: "100%",
              gap: "3rem",
            }}>
              {/* Texto izquierda */}
              <div style={{
                flex: 1, minWidth: 0,
                background: "rgba(2,6,23,0.35)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1.5rem",
                padding: "2.5rem",
              }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#fcd34d", marginBottom: "1rem" }}>
                  {slide.eyebrow}
                </p>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}>
                  {slide.title}
                </h1>
                <p style={{ marginTop: "1.25rem", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: "36rem" }}>
                  {slide.text}
                </p>
                <div style={{ marginTop: "2rem" }}>
                  <a href={slide.cta.href} target={slide.cta.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{
                    display: "inline-block", background: "linear-gradient(135deg, #f59e0b, #fcd34d)",
                    color: "#0f172a", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.05em",
                    padding: "0.85rem 2.25rem", borderRadius: "9999px", textDecoration: "none",
                    boxShadow: "0 0 28px rgba(245,158,11,0.45)",
                  }}>
                    {slide.cta.label}
                  </a>
                </div>
              </div>

              {/* Imagen derecha */}
              {slide.img && (
                <div style={{ flex: "0 0 auto", width: "clamp(280px, 38vw, 520px)" }}>
                  <img src={slide.img} alt={slide.title} style={{
                    width: "100%", height: "auto", objectFit: "contain",
                    maxHeight: "65vh", borderRadius: "1.5rem",
                    filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))",
                  }} />
                </div>
              )}
            </div>
          )}

          {/* DOTS */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", paddingBottom: "1.5rem", flexShrink: 0 }}>
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => changeSlide(i)} style={{
                height: "10px", width: current === i ? "36px" : "10px",
                borderRadius: "9999px", background: current === i ? "#fcd34d" : "rgba(255,255,255,0.4)",
                border: "none", cursor: "pointer", transition: "all 0.3s",
              }} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN MÁS DESTINOS ── */}
      <section id="mas-destinos" style={{ background: "#f8f6f2", color: "#0f172a" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#b45309" }}>Más destinos</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, marginTop: "0.75rem" }}>Descubre más paquetes turísticos</h2>
          <p style={{ marginTop: "1rem", fontSize: "1.05rem", color: "#475569" }}>Explora nuevas rutas, próximos paquetes y más experiencias internacionales.</p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/destinos" style={{
              display: "inline-block", background: "#0f172a", color: "white",
              fontWeight: 700, fontSize: "1rem", padding: "0.85rem 2rem",
              borderRadius: "1rem", textDecoration: "none",
            }}>Ver más destinos</Link>
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
      <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer" style={{
        position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 100,
        width: "60px", height: "60px", borderRadius: "50%",
        background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px rgba(37,211,102,0.5)", transition: "transform 0.2s, box-shadow 0.2s, opacity 0.4s",
        opacity: showWA ? 1 : 0, pointerEvents: showWA ? "auto" : "none",
        textDecoration: "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(37,211,102,0.65)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(37,211,102,0.5)";
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </main>
  );
}