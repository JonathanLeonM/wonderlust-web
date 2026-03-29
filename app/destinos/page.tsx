import Link from "next/link";

export default function DestinosPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Más destinos
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Explora más paquetes turísticos
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600">
          Esta página será para mostrar más paquetes, promociones y rutas
          internacionales adicionales.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
            href="/europa"
            className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold">Europa</h2>
            <p className="mt-3 text-slate-600">Circuitos y experiencias premium.</p>
          </Link>

          <Link
            href="/mexico"
            className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold">México</h2>
            <p className="mt-3 text-slate-600">Playa, cultura y escapadas.</p>
          </Link>

          <Link
            href="/china"
            className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold">China</h2>
            <p className="mt-3 text-slate-600">Historia, lujo y descubrimiento.</p>
          </Link>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}