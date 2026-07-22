import Link from "next/link";
import Image from "next/image";

const ofertas = [
  {
    titulo: "Europa Fantástica",
    precio: "USD 3.319",
    descripcion: "19 días / 17 noches · Salida desde Bogotá",
    href: "/ofertas/europa-fantastica",
    imagen: "/ofertas/europa-fantastica.png",
    destacada: true,
  },
  {
    titulo: "Tailandia · Festival de linternas",
    precio: "USD 4.759",
    descripcion: "16 días / 14 noches · Salida desde Bogotá",
    href: "/ofertas/tailandia-festival-linternas",
    imagen: "/ofertas/tailandia-festival-linternas.png",
    tipo: "overlay",
    color: "from-amber-100 via-white to-orange-100",
  },
  {
    titulo: "Brasil · Río + Iguazú",
    precio: "USD 680",
    descripcion: "4 días / 3 noches · Vigencia enero a diciembre 2026",
    href: "/ofertas/brasil-rio-iguazu",
    imagen: "/ofertas/brasil-rio-iguazu.png",
    tipo: "overlay",
    color: "from-sky-100 via-white to-cyan-100",
  },
  {
    titulo: "Caribe",
    precio: "Hasta 20% dto.",
    descripcion: "Paquetes a playa, descanso y hoteles seleccionados.",
    href: "/ofertas",
    imagen: "",
    tipo: "simple",
    color: "from-orange-100 via-white to-amber-100",
  },
  {
    titulo: "Paquetes + hoteles",
    precio: "$600.000 de descuento",
    descripcion: "Campañas especiales con beneficios adicionales.",
    href: "/ofertas",
    imagen: "",
    tipo: "simple",
    color: "from-lime-100 via-white to-emerald-100",
  },
];

export default function OfertasPage() {
  const ofertaPrincipal = ofertas.find((o) => o.destacada);
  const ofertasSecundarias = ofertas.filter((o) => !o.destacada);

  return (
    <main className="min-h-screen bg-[#eef2f3] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">
              Wonderlust
            </p>
            <p className="text-xs text-slate-500">Super ofertas</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Inicio
            </Link>
            <a
              href="https://wa.me/573144327782"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.03]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="bg-[linear-gradient(90deg,#fb923c_0%,#facc15_45%,#4ade80_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white/90">
            Wonderlust
          </p>
          <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">
            ¡SUPER OFERTAS!
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/90">
            Descubre promociones, descuentos y campañas especiales con una
            presentación mucho más visual y elegante.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        {ofertaPrincipal && (
          <Link
            href={ofertaPrincipal.href}
            className="group block overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[420px] overflow-hidden">
                <Image
                  src={ofertaPrincipal.imagen}
                  alt={ofertaPrincipal.titulo}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />

                <div className="absolute inset-0 flex items-end p-8 md:p-10">
                  <div className="max-w-xl text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                      Oferta destacada
                    </p>
                    <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
                      {ofertaPrincipal.titulo}
                    </h2>
                    <p className="mt-4 text-2xl font-bold text-white md:text-3xl">
                      Desde {ofertaPrincipal.precio}
                    </p>
                    <p className="mt-3 text-base text-white/85 md:text-lg">
                      {ofertaPrincipal.descripcion}
                    </p>

                    <div className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition group-hover:scale-[1.02]">
                      Ver oferta
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center bg-white p-8 md:p-10">
                <div className="w-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Europa
                  </p>
                  <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                    Una oferta visual, limpia y lista para vender mejor
                  </h3>
                  <p className="mt-5 text-slate-600">
                    Haz clic para ver la información organizada de esta oferta:
                    duración, precio, fechas, qué incluye y acceso directo a
                    WhatsApp.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Duración</p>
                      <p className="mt-1 text-lg font-bold">19 días</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Noches</p>
                      <p className="mt-1 text-lg font-bold">17 noches</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Salida</p>
                      <p className="mt-1 text-lg font-bold">Bogotá</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Más promociones
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Otras ofertas para mostrar en tu vitrina
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ofertasSecundarias.map((oferta) => {
            if (oferta.tipo === "overlay" && oferta.imagen) {
              const isBrasil = oferta.href === "/ofertas/brasil-rio-iguazu";
              const isTailandia =
                oferta.href === "/ofertas/tailandia-festival-linternas";

              return (
                <article
                  key={oferta.titulo}
                  className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${oferta.color} p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl`}
                >
                  <Link href={oferta.href} className="group block">
                    <div className="relative mb-6 h-56 overflow-hidden rounded-[1.5rem]">
                      <Image
                        src={oferta.imagen}
                        alt={oferta.titulo}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/15" />

                      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                          Promoción
                        </p>

                        {isBrasil && (
                          <>
                            <h3 className="mt-2 text-2xl font-black leading-tight">
                              Brasil
                            </h3>
                            <p className="text-lg font-semibold text-white/95">
                              Río + Iguazú
                            </p>
                            <p className="mt-3 text-3xl font-black">
                              Desde USD 680
                            </p>
                            <p className="mt-1 text-sm text-white/85">
                              4 días / 3 noches
                            </p>
                          </>
                        )}

                        {isTailandia && (
                          <>
                            <h3 className="mt-2 text-2xl font-black leading-tight">
                              Tailandia
                            </h3>
                            <p className="text-lg font-semibold text-white/95">
                              Festival de linternas
                            </p>
                            <p className="mt-3 text-3xl font-black">
                              Desde USD 4.759
                            </p>
                            <p className="mt-1 text-sm text-white/85">
                              16 días / 14 noches
                            </p>
                          </>
                        )}

                        {!isBrasil && !isTailandia && (
                          <>
                            <h3 className="mt-2 text-2xl font-black leading-tight">
                              {oferta.titulo}
                            </h3>
                            <p className="mt-3 text-3xl font-black">
                              {oferta.precio}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Promoción
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{oferta.titulo}</h3>
                  <p className="mt-4 text-slate-600">{oferta.descripcion}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={oferta.href}
                      className="inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
                    >
                      Ver oferta
                    </Link>

                    <a
                      href="https://wa.me/573144327782"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      WhatsApp
                    </a>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={oferta.titulo}
                className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${oferta.color} p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Promoción
                </p>
                <h3 className="mt-3 text-2xl font-bold">{oferta.titulo}</h3>
                <p className="mt-5 text-4xl font-black text-slate-950">
                  {oferta.precio}
                </p>
                <p className="mt-4 text-slate-600">{oferta.descripcion}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={oferta.href}
                    className="inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
                  >
                    Ver oferta
                  </Link>

                  <a
                    href="https://wa.me/573144327782"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}