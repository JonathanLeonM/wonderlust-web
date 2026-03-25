import Link from "next/link";

const visas = [
  {
    title: "Visa Americana",
    description:
      "Acompañamiento en perfilamiento, formulario DS-160 y preparación para entrevista.",
    tag: "Estados Unidos",
    href: "/visas/americana",
  },
  {
    title: "Visa Canadá",
    description:
      "Orientación en requisitos, documentación y proceso de aplicación.",
    tag: "Canadá",
    href: "/visas/canada",
  },
  {
    title: "Visa Costa Rica",
    description:
      "Guía clara para revisión de requisitos y organización documental.",
    tag: "Costa Rica",
    href: "/visas/costa-rica",
  },
];

export default function VisasPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">
              VL Viajes
            </p>
            <p className="text-xs text-slate-500">Visas internacionales</p>
          </div>

          <Link
            href="/"
            className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Procesos de visa
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Diferentes tipos de visas
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Explora nuestras opciones de acompañamiento para distintos procesos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {visas.map((visa) => (
            <article
              key={visa.title}
              className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-700">
                {visa.tag}
              </p>
              <h2 className="mt-3 text-2xl font-bold">{visa.title}</h2>
              <p className="mt-4 text-slate-600">{visa.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={visa.href}
                  className="inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
                >
                  Ver detalles
                </Link>

                <a
                  href="https://wa.me/573212620948"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Solicitar información
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}