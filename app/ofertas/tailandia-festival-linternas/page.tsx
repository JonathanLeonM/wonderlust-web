import Link from "next/link";
import Image from "next/image";

export default function TailandiaFestivalLinternasPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">
              VL Viajes
            </p>
            <p className="text-xs text-slate-500">
              Tailandia · Festival de linternas
            </p>
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
            src="/ofertas/tailandia-festival-linternas.png"
            alt="Tailandia Festival de linternas"
            fill
            className="object-cover opacity-45"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Bloqueo Tailandia
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Tailandia · Festival de linternas
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Una oferta impactante, visual y lista para vender una experiencia
            inolvidable por Asia con un enfoque mucho más premium en la web.
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
            <p className="mt-2 text-3xl font-black text-slate-950">USD 4.759</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Duración</p>
            <p className="mt-2 text-3xl font-black text-slate-950">16 días</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Noches</p>
            <p className="mt-2 text-3xl font-black text-slate-950">14 noches</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-slate-500">Salida</p>
            <p className="mt-2 text-3xl font-black text-slate-950">Bogotá</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/ofertas/tailandia-festival-linternas.png"
              alt="Tailandia Festival de linternas"
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
                Una experiencia asiática con gran impacto visual
              </h2>
              <p className="mt-4 text-slate-600">
                Esta oferta te permite vender un viaje muy aspiracional y
                emocional, apoyado por una imagen potente y una ficha de oferta
                mucho más ordenada.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Fechas
              </p>
              <p className="mt-3 text-2xl font-bold">Noviembre 17 a diciembre 02</p>
              <p className="mt-4 text-slate-600">
                Puedes usar esta sección para próximas salidas, temporada o
                vigencias especiales.
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
                destinos incluidos y condiciones de esta experiencia.
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
                Aquí puedes poner vuelos, equipaje, traslados, desayunos,
                asistencia médica, cenas especiales y demás servicios incluidos.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-semibold">Destinos</h3>
              <p className="mt-3 text-slate-600">
                También puedes listar Tailandia, Turquía y las ciudades o
                experiencias destacadas del itinerario.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}