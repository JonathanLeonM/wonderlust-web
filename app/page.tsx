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
    title: "Visas",
    description:
      "Acompañamiento profesional en perfilamiento, formularios, documentos y preparación para distintos procesos de visa.",
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
    }, 320);
  };

  const goPrev = () =>
    changeSlide((current - 1 + slides.length) % slides.length);

  const goNext = () => changeSlide((current + 1) % slides.length);

  const currentSlide = slides[current];

  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/10 bg-transparent">
              <Image
                src="/logo-wonderlust.png"
                alt="Wonderlust"
                fill
                className="object-contain scale-125"
              />
            </div>

            <div className="leading-tight">
              <p className="text-lg font-semibold tracking-[0.22em] uppercase">
                WONDERLUST
              </p>
              <p className="text-xs text-white/65">by Villamor S.A.S</p>
            </div>
          </Link>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#explorar" className="transition hover:text-amber-300">
              Explorar
            </a>
            <a href="#mas-destinos" className="transition hover:text-amber-300">
              Más destinos
            </a>
            <a href="/ofertas" className="transition hover:text-amber-300">
              Ofertas
            </a>
            <a href="/visas" className="transition hover:text-amber-300">
              Visas
            </a>
          </nav>

          <a
            href="https://wa.me/573212620948"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <section
        id="explorar"
        className="relative overflow-hidden bg-slate-950 text-white"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero/mapamundi-wonderlust.png"
            alt="Mapamundi Wonderlust"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 pb-24 lg:px-12 lg:py-20 lg:pb-28">
          <div
            className={`relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-700 md:p-8 lg:p-10 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <div className="grid min-h-[620px] items-center gap-10">
              {currentSlide.type === "destinos" && (
                <div>
                  <div className="mb-10 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
                      {currentSlide.eyebrow}
                    </p>
                    <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
                      {currentSlide.title}
                    </h1>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3">
                    <Link
                      href="/europa"
                      className="group text-center transition hover:-translate-y-1.5"
                    >
                      <div className="flex h-[430px] items-end justify-center">
                        <Image
                          src="/destinos/europa.png"
                          alt="Europa"
                          width={1121}
                          height={2048}
                          className="max-h-full w-auto object-contain transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/95">
                          Destino
                        </p>
                        <h3 className="mt-3 text-[2.6rem] font-semibold tracking-tight">
                          Europa
                        </h3>
                      </div>
                    </Link>

                    <Link
                      href="/mexico"
                      className="group text-center transition hover:-translate-y-1.5"
                    >
                      <div className="flex h-[430px] items-end justify-center">
                        <Image
                          src="/destinos/mexico.png"
                          alt="México"
                          width={1121}
                          height={2048}
                          className="max-h-full w-auto object-contain transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/95">
                          Destino
                        </p>
                        <h3 className="mt-3 text-[2.6rem] font-semibold tracking-tight">
                          México
                        </h3>
                      </div>
                    </Link>

                    <Link
                      href="/china"
                      className="group text-center transition hover:-translate-y-1.5"
                    >
                      <div className="flex h-[430px] items-end justify-center">
                        <Image
                          src="/destinos/china.png"
                          alt="China"
                          width={1121}
                          height={2048}
                          className="max-h-full w-auto object-contain transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/95">
                          Destino
                        </p>
                        <h3 className="mt-3 text-[2.6rem] font-semibold tracking-tight">
                          China
                        </h3>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Link
                      href="/destinos"
                      className="rounded-2xl bg-amber-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02]"
                    >
                      Ver más destinos
                    </Link>
                  </div>
                </div>
              )}

              {currentSlide.type === "visas" && (
                <div className="grid min-h-[620px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
                      {currentSlide.eyebrow}
                    </p>
                    <h1 className="mt-3 text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
                      {currentSlide.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/78">
                      {currentSlide.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href="/visas"
                        className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
                      >
                        Ver visas
                      </Link>

                      <a
                        href="https://wa.me/573212620948"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        Asesoría por WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-[540px] rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                        Wonderlust Visas
                      </p>
                      <h2 className="mt-3 text-4xl font-bold leading-tight">
                        Procesos más claros y profesionales
                      </h2>
                      <div className="mt-8 space-y-4">
                        <div className="rounded-2xl bg-white/[0.05] p-4">
                          Perfilamiento
                        </div>
                        <div className="rounded-2xl bg-white/[0.05] p-4">
                          Formularios y documentos
                        </div>
                        <div className="rounded-2xl bg-white/[0.05] p-4">
                          Preparación para entrevista
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide.type === "sim" && (
                <div className="grid min-h-[620px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
                      {currentSlide.eyebrow}
                    </p>
                    <h1 className="mt-3 text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
                      {currentSlide.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/78">
                      {currentSlide.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <a
                        href="https://wa.me/573212620948"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
                      >
                        Consultar SIM
                      </a>

                      <a
                        href="https://wa.me/573212620948"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        Hablar con asesor
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-[540px] rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                        Wonderlust Connect
                      </p>
                      <h2 className="mt-3 text-4xl font-bold leading-tight">
                        Viaja conectado desde el primer momento
                      </h2>
                      <div className="mt-8 space-y-4">
                        <div className="rounded-2xl bg-white/[0.05] p-4">
                          Cobertura internacional
                        </div>
                        <div className="rounded-2xl bg-white/[0.05] p-4">
                          Activación fácil
                        </div>
                        <div className="rounded-2xl bg-white/[0.05] p-4">
                          Soporte cercano
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/55 px-3 py-8 text-lg text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition hover:scale-[1.04] hover:bg-slate-950/85"
              aria-label="Slide anterior"
            >
              ←
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/55 px-3 py-8 text-lg text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition hover:scale-[1.04] hover:bg-slate-950/85"
              aria-label="Siguiente slide"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section id="mas-destinos" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Más destinos
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Descubre más paquetes turísticos
            </h2>
            <p className="mt-4 text-slate-600">
              Explora nuevas rutas, próximos paquetes y más experiencias
              internacionales.
            </p>

            <div className="mt-8">
              <Link
                href="/destinos"
                className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
              >
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