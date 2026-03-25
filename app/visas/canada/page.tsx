import Link from "next/link";

export default function VisaCanadaPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">
              VL Viajes
            </p>
            <p className="text-xs text-slate-500">Visa Canadá</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/visas"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-900"
            >
              Volver a visas
            </Link>
            <Link
              href="/"
              className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white"
            >
              Inicio
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Canadá
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Asesoría para Visa Canadá
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            Te orientamos en la organización del proceso para que presentes tu
            solicitud con mayor orden, claridad y confianza.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/573212620948"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950"
            >
              Solicitar asesoría
            </a>

            <Link
              href="/visas"
              className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white"
            >
              Ver otras visas
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
              1
            </div>
            <h3 className="text-xl font-semibold">Perfilamiento</h3>
            <p className="mt-3 text-slate-600">
              Revisamos tu objetivo de viaje y el tipo de proceso que deseas iniciar.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
              2
            </div>
            <h3 className="text-xl font-semibold">Documentación</h3>
            <p className="mt-3 text-slate-600">
              Te orientamos en la preparación y organización de los documentos.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
              3
            </div>
            <h3 className="text-xl font-semibold">Acompañamiento</h3>
            <p className="mt-3 text-slate-600">
              Te guiamos de forma general durante el proceso para que avances con más seguridad.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}