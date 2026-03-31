"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 0,
    eyebrow: "DESTINOS",
    title: "Destinos destacados",
    type: "destinos",
  },
  {
    id: 1,
    eyebrow: "VISAS",
    title: "Visas americanas",
    description:
      "Acompañamiento profesional en perfilamiento, revisión documental y preparación del proceso para una presentación mucho más clara y confiable.",
    type: "visas",
  },
  {
    id: 2,
    eyebrow: "SIM",
    title: "SIM internacionales",
    description:
      "Conectividad para viajeros que quieren llegar preparados, evitar complicaciones y mantenerse siempre conectados.",
    type: "sim",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [current]);

  const changeSlide = (nextIndex: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(nextIndex);
      setVisible(true);
    }, 260);
  };

  const goToSlide = (index: number) => {
    if (index !== current) changeSlide(index);
  };

  const currentSlide = slides[current];

  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "linear-gradient(180deg, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.75) 70%, transparent 100%)",
      }}>
        {/* Línea dorada top */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #f59e0b, #fcd34d, #f59e0b, transparent)" }} />

        <div style={{ padding: "0.9rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
            <div style={{
              width: "110px", height: "110px", borderRadius: "50%", flexShrink: 0,
              border: "2px solid rgba(251,191,36,0.9)",
              boxShadow: "0 0 28px rgba(251,191,36,0.6), 0 0 10px rgba(251,191,36,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "radial-gradient(circle, rgba(15,23,42,0.95), rgba(2,6,23,0.98))",
              position: "relative",
            }}>
              <div style={{ position: "relative", width: "82px", height: "82px" }}>
                <Image src="/logo-wonderlust.png" alt="Wonderlust" fill className="object-contain scale-[1.55]" />
              </div>
            </div>
            <div>
              <div style={{
                fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.22em",
                backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #fcd34d, #d97706)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", backgroundColor: "transparent",
              }}>
                WONDERLUST
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "2px 0" }}>
                <div style={{ height: "1px", width: "24px", background: "rgba(251,191,36,0.6)" }} />
                <span style={{ fontSize: "0.6rem", color: "rgba(253,211,77,0.8)" }}>✦</span>
                <div style={{ height: "1px", width: "24px", background: "rgba(251,191,36,0.6)" }} />
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(253,211,77,0.65)", textTransform: "uppercase" }}>
                by Villamor S.A.S
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {[["#explorar","Explorar"],["#mas-destinos","Más destinos"],["/ofertas","Ofertas"],["/visas","Visas"]].map(([href, label]) => (
              <a key={label} href={href} style={{
                fontSize: "0.92rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.95)", textDecoration: "none", fontWeight: 600,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}>
                {label}
              </a>
            ))}
          </nav>

          {/* WhatsApp */}
          <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer" style={{
            flexShrink: 0,
            backgroundImage: "linear-gradient(135deg, #f59e0b, #fcd34d, #f59e0b)",
            backgroundColor: "#f59e0b",
            color: "#0f172a", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.65rem 1.4rem", borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 0 18px rgba(245,158,11,0.45)",
          }}>
            WhatsApp
          </a>
        </div>

        {/* Línea dorada bottom */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)" }} />
      </header>

      <section id="explorar" className="relative bg-slate-950 text-white overflow-hidden" style={{ height: "100vh" }}>
        <div className="absolute inset-0">
          <Image src="/hero/mapamundi-wonderlust.png" alt="Mapamundi Wonderlust" fill priority quality={100} sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-950/60" />

        {/* Contenido con transición */}
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          {currentSlide.type === "destinos" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Título compacto arriba */}
              <div style={{ textAlign: "center", paddingTop: "7.5rem", paddingBottom: "0.5rem" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#fcd34d", marginBottom: "0.5rem", textShadow: "0 2px 10px rgba(0,0,0,1)" }}>
                  {currentSlide.eyebrow}
                </p>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,1), 0 4px 40px rgba(0,0,0,0.9)" }}>
                  {currentSlide.title}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", marginTop: "0.4rem", textShadow: "0 2px 10px rgba(0,0,0,1)" }}>
                  Explora nuestros destinos más populares
                </p>
              </div>

              {/* Arcos que llenan el resto de la pantalla */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", minHeight: 0 }}>
                {[
                  { href: "/europa", src: "/destinos/europa.png", alt: "Europa", label: "Europa" },
                  { href: "/mexico", src: "/destinos/mexico.png", alt: "México", label: "México" },
                  { href: "/china", src: "/destinos/china.png", alt: "China", label: "China" },
                ].map((dest) => (
                  <Link
                    key={dest.label}
                    href={dest.href}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      textDecoration: "none",
                      color: "white",
                      padding: "0 0.5rem",
                      overflow: "hidden",
                      transition: "transform 0.3s",
                    }}
                    className="group hover:-translate-y-2"
                  >
                    <img
                      src={dest.src}
                      alt={dest.alt}
                      style={{
                        width: "100%",
                        maxWidth: "380px",
                        height: "auto",
                        objectFit: "contain",
                        maxHeight: "calc(100vh - 450px)",
                        transition: "transform 0.5s",
                      }}
                      className="group-hover:scale-[1.02]"
                    />
                    <div style={{ textAlign: "center", paddingBottom: "1.5rem", paddingTop: "0.5rem" }}>
                      <p style={{ fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(253,211,77,0.9)" }}>
                        Destino
                      </p>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "0.25rem" }}>{dest.label}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Botón ver más */}
              <div style={{ textAlign: "center", paddingBottom: "1.5rem" }}>
                <Link href="/destinos"
                  className="inline-block rounded-2xl bg-amber-400 px-7 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
                  Ver más destinos
                </Link>
              </div>
            </div>
          )}

          {currentSlide.type === "visas" && (
            <div className="mx-auto grid w-full max-w-[1220px] px-6 lg:px-8 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]" style={{ flex: 1 }}>
              <div className="order-2 lg:order-1">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{currentSlide.eyebrow}</p>
                <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">{currentSlide.title}</h1>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/85">
                  Acompañamiento para visas con una presentación más clara, confiable y profesional. Perfilamiento,
                  revisión documental y preparación del proceso en una experiencia mucho más ordenada para el cliente.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/visas" className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">Ver visas</Link>
                  <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                    className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                    Asesoría por WhatsApp
                  </a>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {["Perfilamiento", "Documentos", "Preparación"].map((paso, i) => (
                    <div key={paso} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Paso {i + 1}</p>
                      <h3 className="mt-2 text-xl font-semibold">{paso}</h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 flex justify-center lg:order-2">
                <div className="relative w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172a]/25 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <Image src="/visas/visa-usa.png" alt="Asesoría de visas Wonderlust" width={1600} height={900} quality={100} className="h-auto w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide.type === "sim" && (
            <div className="grid w-full max-w-[1320px] mx-auto px-6 lg:px-8 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" style={{ flex: 1 }}>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{currentSlide.eyebrow}</p>
                <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">{currentSlide.title}</h1>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/85">{currentSlide.description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                    className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">Consultar SIM</a>
                  <a href="https://wa.me/573212620948" target="_blank" rel="noreferrer"
                    className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Hablar con asesor</a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-[560px] rounded-[1.75rem] border border-white/10 bg-transparent p-8">
                  <p className="text-sm uppercase tracking-[0.22em] text-amber-300">Wonderlust Connect</p>
                  <h2 className="mt-3 text-4xl font-bold leading-tight">Viaja conectado desde el primer momento</h2>
                  <div className="mt-8 space-y-4">
                    {["Cobertura internacional", "Activación fácil", "Soporte cercano"].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-transparent p-4">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dots navegación */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", paddingBottom: "1.5rem" }}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                style={{
                  height: "12px",
                  width: current === index ? "40px" : "12px",
                  borderRadius: "9999px",
                  background: current === index ? "white" : "rgba(255,255,255,0.6)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="mas-destinos" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Más destinos</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Descubre más paquetes turísticos</h2>
            <p className="mt-4 text-slate-600">Explora nuevas rutas, próximos paquetes y más experiencias internacionales.</p>
            <div className="mt-8">
              <Link href="/destinos" className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]">
                Ver más destinos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f8f6f2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© 2026 Wonderlust by Villamor S.A.S. Todos los derechos reservados.</p>
          <p>Diseño web moderno para viajes, visas y ventas.</p>
        </div>
      </footer>
    </main>
  );
}