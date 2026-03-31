import Link from "next/link";

export default function MexicoPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          México
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Paquetes y experiencias en México
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Aquí vamos a mostrar tus paquetes turísticos de México.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-900"
          >
            Volver al inicio
          </Link>
          <Link
            href="/destinos"
            className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
          >
            Ver más destinos
          </Link>
        </div>
      </section>
    </main>
  );
}