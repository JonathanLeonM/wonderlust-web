import Link from "next/link";
import Image from "next/image";

export default function BrasilRioIguazuPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">
              VL Viajes
            </p>
            <p className="text-xs text-slate-500">Brasil · Río + Iguazú</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/ofertas"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Volver a ofertas
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

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="/ofertas/brasil-rio-iguazu.png"
            alt="Brasil Río e Iguazú"
            fill
            className="object-cover opacity-45"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Brasil
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Río de Janeiro + Iguazú
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Una oferta más corta, dinámica y muy atractiva para viajeros que
            buscan una escapada internacional visual y fácil de vender.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/573144327782"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Solicitar esta oferta
            </a>

            <Link
              href="/ofertas"
              className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver más ofertas
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Precio desde</p>
            <p className="mt-2 text-3xl font-black text-slate-950">USD 680</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Duración</p>
            <p className="mt-2 text-3xl font-black text-slate-950">4 días</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Noches</p>
            <p className="mt-2 text-3xl font-black text-slate-950">3 noches</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Vigencia</p>
            <p className="mt-2 text-xl font-black text-slate-950">
              Ene - Dic 2026
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/ofertas/brasil-rio-iguazu.png"
              alt="Brasil Río e Iguazú"
              width={900}
              height={1600}
              className="h-auto w-full"
            />
          </div>


          <div className="flex h-full flex-col gap-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Resumen
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Una escapada visual y comercialmente muy fuerte
              </h2>
              <p className="mt-4 text-slate-600">
                Esta oferta funciona muy bien para una página de viajes porque
                combina íconos reconocibles, imágenes impactantes y un precio muy
                visible.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Salidas
              </p>
              <p className="mt-3 text-2xl font-bold">Diarias</p>
              <p className="mt-4 text-slate-600">
                Vigencia enero a diciembre de 2026. Puedes ajustar esta sección
                con temporadas, cierres o campañas puntuales.
              </p>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Contacto
              </p>
              <h3 className="mt-3 text-2xl font-bold">
                Reserva o solicita más información
              </h3>
              <p className="mt-4 text-white/75">
                Escríbenos por WhatsApp para conocer disponibilidad, itinerario,
                servicios incluidos y condiciones de esta oferta.
              </p>

              <a
                href="https://wa.me/573144327782"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Información adicional
          </p>
          <h2 className="mt-3 text-3xl font-bold">Qué puedes mostrar aquí</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-semibold">Incluye</h3>
              <p className="mt-3 text-slate-600">
                Aquí puedes poner acomodación doble, traslados, city tour en Río,
                visita a Iguazú, entradas y guías expertos.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-semibold">Itinerario</h3>
              <p className="mt-3 text-slate-600">
                También puedes listar día por día el recorrido, manteniendo la
                imagen limpia y dejando la información organizada en texto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}