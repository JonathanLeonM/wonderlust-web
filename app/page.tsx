"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { id: 0, eyebrow: "DESTINOS", title: "Destinos destacados", type: "destinos" },
  {
    id: 1, eyebrow: "VISAS", title: "Visas americanas",
    description: "Acompañamiento profesional en perfilamiento, revisión documental y preparación del proceso para una presentación mucho más clara y confiable.",
    type: "visas",
  },
  {
    id: 2, eyebrow: "SIM", title: "SIM internacionales",
    description: "Conectividad para viajeros que quieren llegar preparados, evitar complicaciones y mantenerse siempre conectados.",
    type: "sim",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { changeSlide((current + 1) % slides.length); }, 5500);
    return () => clearInterval(interval);
  }, [current]);

  const changeSlide = (nextIndex: number) => {
    setVisible(false);
    setTimeout(() => { setCurrent(nextIndex); setVisible(true); }, 260);
  };

  const goToSlide = (index: number) => { if (index !== current) changeSlide(index); };
  const currentSlide = slides[current];

  return (
    <main style={{ minHeight: "100svh", background: "#f8f6f2", color: "#0f172a" }}>

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

          {!isMobile && (
            <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              {[["#explorar","Explorar"],["#mas-destinos","Más destinos"],["/ofertas","Ofertas"],["/visas","Visas"]].map(([href, label]) => (
                <a key={label} href={href} style={{
                  fontSize: "0.88rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.95)", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}>
                  {label}
                </a>
              ))}
            </nav>
          )}

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

      {/* ── HERO / CARRUSEL ── */}
      <section id="explorar" style={{ position: "relative", height: "100svh", overflow: "hidden", background: "#020617", color: "white" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/hero/mapamundi-wonderlust.png" alt="Mapamundi" fill priority quality={100} sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,6,23,0.5) 0%, rgba(2,6,23,0.2) 50%, rgba(2,6,23,0.6) 100%)" }} />

        <div style={{
          position: "relative", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>

          {/* SLIDE DESTINOS */}
          {currentSlide.type === "destinos" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ textAlign: "center", paddingTop: "clamp(4rem, 8vh, 7.5rem)", paddingBottom: "0.25rem" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#fcd34d", marginBottom: "0.4rem", textShadow: "0 2px 10px rgba(0,0,0,1)" }}>
                  {currentSlide.eyebrow}
                </p>
                <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", fontWeight: 800, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,1)", margin: 0 }}>
                  {currentSlide.title}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", marginTop: "0.3rem", textShadow: "0 2px 10px rgba(0,0,0,1)" }}>
                  Explora nuestros destinos más populares
                </p>
              </div>

              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", minHeight: 0, overflow: "hidden" }}>
                {[
                  { href: "/europa", src: "/destinos/europa.png", alt: "Europa", label: "Europa" },
                  { href: "/mexico", src: "/destinos/mexico.png", alt: "México", label: "México" },
                  { href: "/china", src: "/destinos/china.png", alt: "China", label: "China" },
                ].map((dest) => (
                  <Link key={dest.label} href={dest.href} style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "flex-end", textDecoration: "none", color: "white",
                    padding: "0 0.5rem", overflow: "hidden",
                  }}>
                    <img src={dest.src} alt={dest.alt} style={{
                      width: "100%", maxWidth: "380px", height: "auto", objectFit: "contain",
                      maxHeight: "calc(100svh - 280px)",
                    }} />
                    <div style={{ textAlign: "center", paddingBottom: "0.5rem", paddingTop: "0.25rem" }}>
                      <p style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(253,211,77,0.9)" }}>Destino</p>
                      <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 600, margin: "0.1rem 0 0" }}>{dest.label}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ textAlign: "center", paddingBottom: "0.75rem" }}>
                <Link href="/destinos" className="inline-block rounded-2xl bg-amber-400 px-7 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
                  Ver más destinos
                </Link>
              </div>
            </div>
          )}

          {/* SLIDE VISAS */}
          {currentSlide.type === "visas" && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "clamp(4.5rem, 11vh, 6rem) clamp(1.25rem, 4vw, 3rem) 1rem" }}>
              {isMobile ? (
                /* MÓVIL: solo texto */
                <div style={{ width: "100%" }}>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24" }}>{currentSlide.eyebrow}</p>
                  <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.5rem", lineHeight: 1.2 }}>{currentSlide.title}</h1>
                  <p style={{ marginTop: "0.75rem", fontSize: "1rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
                    Acompañamiento para visas con una presentación más clara, confiable y profesional.
                  </p>
                  <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <Link href="/visas" className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950">Ver visas</Link>
                    <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                      className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white">
                      Asesoría por WhatsApp
                    </a>
                  </div>
                  <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
                    {["Perfilamiento", "Documentos", "Preparación"].map((paso, i) => (
                      <div key={paso} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "0.6rem" }}>
                        <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fbbf24" }}>Paso {i + 1}</p>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, marginTop: "0.2rem" }}>{paso}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* DESKTOP: 2 columnas con imagen */
                <div style={{ width: "100%", maxWidth: "1220px", margin: "0 auto", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", alignItems: "center", gap: "2.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.85rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24" }}>{currentSlide.eyebrow}</p>
                    <h1 style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 800, marginTop: "1rem", lineHeight: 1.15 }}>{currentSlide.title}</h1>
                    <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: "36rem" }}>
                      Acompañamiento para visas con una presentación más clara, confiable y profesional. Perfilamiento,
                      revisión documental y preparación del proceso en una experiencia mucho más ordenada para el cliente.
                    </p>
                    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <Link href="/visas" className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">Ver visas</Link>
                      <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                        className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                        Asesoría por WhatsApp
                      </a>
                    </div>
                    <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                      {["Perfilamiento", "Documentos", "Preparación"].map((paso, i) => (
                        <div key={paso} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: "1rem", padding: "1rem", backdropFilter: "blur(4px)" }}>
                          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fbbf24" }}>Paso {i + 1}</p>
                          <p style={{ fontSize: "1.1rem", fontWeight: 600, marginTop: "0.5rem" }}>{paso}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: "620px", borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,23,42,0.25)", padding: "0.75rem", boxShadow: "0 25px 70px rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", overflow: "hidden" }}>
                      <div style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
                        <Image src="/visas/visa-usa.png" alt="Visas Wonderlust" width={1600} height={900} quality={100} style={{ width: "100%", height: "auto" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SLIDE SIM */}
          {currentSlide.type === "sim" && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "clamp(4.5rem, 11vh, 6rem) clamp(1.25rem, 4vw, 3rem) 1rem" }}>
              {isMobile ? (
                /* MÓVIL */
                <div style={{ width: "100%" }}>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24" }}>{currentSlide.eyebrow}</p>
                  <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.5rem", lineHeight: 1.2 }}>{currentSlide.title}</h1>
                  <p style={{ marginTop: "0.75rem", fontSize: "1rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>{currentSlide.description}</p>
                  <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                      className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950">Consultar SIM</a>
                    <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                      className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white">Hablar con asesor</a>
                  </div>
                </div>
              ) : (
                /* DESKTOP */
                <div style={{ width: "100%", maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", alignItems: "center", gap: "3rem" }}>
                  <div>
                    <p style={{ fontSize: "0.85rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24" }}>{currentSlide.eyebrow}</p>
                    <h1 style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 800, marginTop: "1rem", lineHeight: 1.15 }}>{currentSlide.title}</h1>
                    <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: "42rem" }}>{currentSlide.description}</p>
                    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                        className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">Consultar SIM</a>
                      <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                        className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Hablar con asesor</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: "560px", borderRadius: "1.75rem", border: "1px solid rgba(255,255,255,0.1)", padding: "2rem" }}>
                      <p style={{ fontSize: "0.75rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#fbbf24" }}>Wonderlust Connect</p>
                      <h2 style={{ fontSize: "2.25rem", fontWeight: 800, marginTop: "0.75rem", lineHeight: 1.2 }}>Viaja conectado desde el primer momento</h2>
                      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {["Cobertura internacional", "Activación fácil", "Soporte cercano"].map((item) => (
                          <div key={item} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1rem" }}>{item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DOTS */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", paddingBottom: "1.25rem", flexShrink: 0 }}>
            {slides.map((slide, index) => (
              <button key={slide.id} onClick={() => goToSlide(index)} style={{
                height: "12px", width: current === index ? "40px" : "12px",
                borderRadius: "9999px", background: current === index ? "white" : "rgba(255,255,255,0.5)",
                border: "none", cursor: "pointer", transition: "all 0.3s",
              }} aria-label={`Ir al slide ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁS DESTINOS ── */}
      <section id="mas-destinos" style={{ background: "white" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b45309" }}>Más destinos</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, marginTop: "0.75rem" }}>Descubre más paquetes turísticos</h2>
          <p style={{ marginTop: "1rem", color: "#475569" }}>Explora nuevas rutas, próximos paquetes y más experiencias internacionales.</p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/destinos" className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]">
              Ver más destinos
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#f8f6f2" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>
          <p>© 2026 Wonderlust by Villamor S.A.S. Todos los derechos reservados.</p>
          <p>Diseño web moderno para viajes, visas y ventas.</p>
        </div>
      </footer>
    </main>
  );
}