import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">
              Wonderlust
            </p>
            <p className="text-xs text-white/60">
              Experiencias y servicios globales
            </p>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#inicio" className="transition hover:text-amber-300">
              Inicio
            </a>
            <a href="#ofertas" className="transition hover:text-amber-300">
              Ofertas
            </a>
            <a href="#sim" className="transition hover:text-amber-300">
              SIM
            </a>
            <a href="#visas" className="transition hover:text-amber-300">
              Visas
            </a>
            <a href="#paquetes" className="transition hover:text-amber-300">
              Paquetes
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
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white"
      >
        <div className="absolute inset-0 opacity-[0.18]">
          <svg
            viewBox="0 0 1200 700"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g stroke="white" strokeWidth="1.2">
              <path d="M120 180C170 150 220 145 270 155C320 165 350 145 390 135C450 120 510 135 560 160C590 175 640 180 700 175C760 170 820 145 880 150C940 155 1000 190 1060 220" />
              <path d="M130 240C170 225 220 215 270 220C320 225 350 210 395 200C445 188 500 198 555 225C595 245 650 250 705 245C760 240 820 220 870 225C930 230 975 255 1030 285" />
              <path d="M160 320C200 300 240 290 290 295C340 300 380 285 420 275C470 262 520 272 565 300C610 328 665 336 720 330C780 324 840 300 895 305C945 310 990 330 1040 355" />
              <path d="M180 410C230 390 280 382 330 390C380 398 420 385 460 375C505 364 555 372 600 396C640 418 690 425 745 420C800 415 860 395 915 398C965 400 1010 420 1055 440" />
              <path d="M420 130C410 170 408 210 420 250C432 290 430 330 425 370C420 410 425 455 445 500" />
              <path d="M560 145C550 180 548 220 555 260C562 300 560 340 555 380C550 425 555 470 570 515" />
              <path d="M710 150C700 190 700 225 708 268C716 310 714 350 710 392C706 432 712 472 726 520" />
              <path d="M860 160C852 195 850 235 856 278C862 320 860 358 855 398C850 438 854 474 865 515" />
              <path d="M300 210C330 190 370 185 405 190C450 196 475 215 510 220C550 226 580 210 618 204C670 196 720 205 760 230C790 248 830 255 875 250" />
              <path d="M285 365C325 345 365 338 410 345C450 352 480 370 520 375C560 380 595 364 635 356C690 345 740 355 785 382C815 400 855 410 900 406" />
            </g>

            <g fill="white" opacity="0.45">
              <circle cx="250" cy="210" r="3" />
              <circle cx="430" cy="185" r="3" />
              <circle cx="610" cy="225" r="3" />
              <circle cx="790" cy="248" r="3" />
              <circle cx="960" cy="255" r="3" />
              <circle cx="320" cy="365" r="3" />
              <circle cx="520" cy="375" r="3" />
              <circle cx="740" cy="355" r="3" />
              <circle cx="915" cy="398" r="3" />
            </g>
          </svg>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.18),_transparent_25%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
              Conectividad, visas y viajes
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
              Todo lo que necesitas para viajar, en un solo lugar
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/80">
              Compra SIM internacionales, recibe asesoría para visas y descubre
              paquetes de viaje con una experiencia elegante, clara y pensada
              para convertir visitantes en clientes.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/573212620948"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg transition hover:scale-[1.02]"
              >
                Cotizar por WhatsApp
              </a>

              <Link
                href="/visas"
                className="rounded-2xl border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Ver visas
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-8 text-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Lo más solicitado
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  Soluciones prácticas para viajar mejor
                </h2>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold">SIM internacionales</p>
                    <p className="text-sm text-slate-600">
                      Conexión antes, durante y después del viaje.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold">Asesoría para visas</p>
                    <p className="text-sm text-slate-600">
                      Acompañamiento claro para orientar al cliente en su
                      proceso.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold">Paquetes de viaje</p>
                    <p className="text-sm text-slate-600">
                      Ofertas por destino, presupuesto y estilo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ofertas" className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <Link
            href="/ofertas"
            className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl lg:col-span-2"
          >
            <div className="grid h-full md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative p-8 md:p-10">
                <div className="absolute -right-10 top-0 h-full w-24 rounded-l-full bg-amber-400/95" />
                <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Wonderlust
                </p>

                <h3 className="relative mt-2 text-5xl font-extrabold leading-none text-orange-500 md:text-7xl">
                  ¡OFERTAS!
                </h3>

                <div className="relative mt-6 flex items-end gap-2">
                  <span className="text-6xl font-black leading-none text-slate-950 md:text-8xl">
                    20
                  </span>
                  <div className="pb-2">
                    <span className="text-3xl font-black text-slate-950 md:text-5xl">
                      %
                    </span>
                    <p className="text-xl text-slate-700 md:text-2xl">dto.</p>
                  </div>
                </div>

                <p className="relative mt-5 max-w-md text-lg leading-snug text-slate-700">
                  En paquetes a destinos de playa, escapadas, hoteles y
                  experiencias especiales.
                </p>

                <div className="relative mt-7 inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white">
                  Ver super ofertas
                </div>
              </div>

              <div className="min-h-[280px] bg-[linear-gradient(135deg,#7dd3fc_0%,#38bdf8_20%,#0ea5e9_45%,#0369a1_100%)]">
                <div className="flex h-full items-center justify-center p-6">
                  <div className="flex h-full min-h-[240px] w-full items-center justify-center rounded-[1.5rem] border border-white/30 bg-white/10 p-6 text-center text-white backdrop-blur-sm">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-white/75">
                        Super promociones
                      </p>
                      <h4 className="mt-3 text-3xl font-bold">
                        Viajes con descuentos reales
                      </h4>
                      <p className="mt-3 text-white/80">
                        Haz clic y descubre nuestras mejores ofertas
                        disponibles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-5">
            <article className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border-[24px] border-lime-400" />
              <div className="relative p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Paquetes y hoteles
                </p>
                <h3 className="mt-4 text-5xl font-black text-slate-950">
                  $600.000
                </h3>
                <p className="mt-2 text-xl font-semibold text-slate-800">
                  de descuento
                </p>
                <p className="mt-4 text-slate-600">
                  En selecciones especiales con atención personalizada.
                </p>

                <div className="mt-6">
                  <span className="inline-flex rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
                    Código: VIAJAVL
                  </span>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Aplican condiciones según destino y temporada.
                </p>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
              <div className="absolute -right-12 top-6 h-44 w-44 rounded-full border-[24px] border-lime-400" />
              <div className="relative p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Hoteles en México
                </p>
                <h3 className="mt-4 text-5xl font-black text-slate-950">
                  $400.000
                </h3>
                <p className="mt-2 text-xl font-semibold text-slate-800">
                  dto. extra
                </p>
                <p className="mt-4 text-slate-600">
                  Promociones seleccionadas para reservas y paquetes.
                </p>

                <div className="mt-6">
                  <span className="inline-flex rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
                    Código: DESTINOVL
                  </span>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Válido en campañas específicas.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-full bg-[linear-gradient(90deg,#00df9a_0%,#15f5ba_40%,#22e37a_100%)] px-6 py-5 shadow-lg">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">
                ✈️
              </div>
              <div>
                <p className="rounded-md bg-black px-3 py-1 text-lg font-black uppercase tracking-wide text-yellow-300">
                  Nuevo carrito
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-950 md:text-2xl">
                  Arma tu viaje completo
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-bold text-slate-950 md:text-2xl">
                Agrega fácilmente y paga menos
              </p>
              <p className="text-sm text-slate-900/80">
                Próximamente: paquetes + hoteles + servicios en una sola compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="sim" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            SIM internacionales
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Viaja conectado desde el primer momento
          </h2>
          <p className="mt-4 text-slate-600">
            Opciones de conectividad pensadas para viajeros frecuentes, turismo
            y clientes que buscan comodidad desde antes de salir.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="text-2xl font-semibold">Cobertura global</h3>
            <p className="mt-3 text-slate-600">
              Alternativas para múltiples destinos y necesidades de datos.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="text-2xl font-semibold">Activación simple</h3>
            <p className="mt-3 text-slate-600">
              Una oferta clara para que el cliente compre con confianza.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="text-2xl font-semibold">Soporte cercano</h3>
            <p className="mt-3 text-slate-600">
              Acompañamiento para elegir la mejor opción según el viaje.
            </p>
          </article>
        </div>
      </section>

      <section id="visas" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Visas
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Asesoría profesional para procesos de visa
              </h2>
              <p className="mt-4 text-slate-600">
                Presenta tu servicio de visas de forma clara, elegante y
                confiable para que el cliente entienda el proceso y se anime a
                contactarte.
              </p>
            </div>

            <Link
              href="/visas"
              className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Ver todas las visas
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-[#f8f6f2] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
                1
              </div>
              <h3 className="text-xl font-semibold">Perfilamiento</h3>
              <p className="mt-3 text-slate-600">
                Evaluación inicial del perfil del solicitante y orientación
                general según el tipo de visa.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#f8f6f2] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
                2
              </div>
              <h3 className="text-xl font-semibold">Formulario y documentos</h3>
              <p className="mt-3 text-slate-600">
                Acompañamiento en diligenciamiento, revisión documental y
                organización de requisitos.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#f8f6f2] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
                3
              </div>
              <h3 className="text-xl font-semibold">Preparación</h3>
              <p className="mt-3 text-slate-600">
                Guía y entrenamiento previo para que el cliente llegue mejor
                preparado a su proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="paquetes" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Paquetes de viaje
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Organiza tu oferta para que el cliente compre más fácil
          </h2>
          <p className="mt-4 text-slate-600">
            Presenta viajes cortos, experiencias premium o planes personalizados
            con una estructura clara y elegante.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
              Escapadas
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Viajes cortos</h3>
            <p className="mt-3 text-white/75">
              Perfectos para clientes que quieren desconectarse unos días.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-700">
              Internacional
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Experiencias premium</h3>
            <p className="mt-3 text-slate-600">
              Opciones para viajeros que buscan comodidad y mejor experiencia.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-700">
              Flexible
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Plan personalizado</h3>
            <p className="mt-3 text-slate-600">
              Crea propuestas según fechas, presupuesto y destino.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                Contacto directo
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Convierte visitas en clientes reales
              </h2>
              <p className="mt-3 max-w-2xl text-white/75">
                El objetivo es que el usuario vea tu oferta, entienda tu valor y
                te escriba de inmediato por WhatsApp.
              </p>
            </div>

            <a
              href="https://wa.me/573212620948"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Escribir ahora
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/573212620948"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-2xl"
      >
        WhatsApp
      </a>

      <footer className="bg-[#f8f6f2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© 2026 Wonderlust. Todos los derechos reservados.</p>
          <p>Diseño web moderno para viajes, visas y ventas.</p>
        </div>
      </footer>
    </main>
  );
}