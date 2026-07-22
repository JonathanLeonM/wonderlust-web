"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const salidas = [
  {
    fecha: "19 Jun – 6 Jul 2026",
    tarifas: [
      { tipo: "Doble / Triple", precio: "$3.506 USD" },
      { tipo: "Sencilla", precio: "$4.540 USD" },
      { tipo: "Niño (2–7 años)", precio: "$3.069 USD" },
    ],
  },
  {
    fecha: "14 – 31 Ago 2026",
    tarifas: [
      { tipo: "Doble / Triple", precio: "$3.371 USD" },
      { tipo: "Sencilla", precio: "$4.405 USD" },
      { tipo: "Niño (2–7 años)", precio: "$2.934 USD" },
    ],
  },
];

const incluye = [
  { icon: "✈️", texto: "Tiquetes aéreos BOG–CDG // MAD–BOG con impuestos (Air Europa)" },
  { icon: "🧳", texto: "Equipaje de bodega (23 kg) + cabina (10 kg) + artículo personal (8 kg)" },
  { icon: "🏨", texto: "Alojamiento en hoteles turista/primera según itinerario" },
  { icon: "🍳", texto: "Desayunos diarios" },
  { icon: "🚌", texto: "Traslados aeropuerto y transporte en autocar turístico" },
  { icon: "🧭", texto: "Guía acompañante colombiano durante todo el recorrido" },
  { icon: "🚤", texto: "Crucero por el río Rhin" },
  { icon: "🛥️", texto: "Traslado en vaporetto en Venecia" },
  { icon: "🏛️", texto: "Visita con guía local en los lugares indicados" },
  { icon: "🏥", texto: "Asistencia médica hasta 75 años (USD 60.000 – MOK)" },
  { icon: "💳", texto: "Fee bancario del 2%" },
];

const noIncluye = [
  "Gastos personales y alimentación no especificada",
  "Asistencia médica para mayores de 76 años",
  "Propinas y maleteros",
  "Tours opcionales y actividades en días libres",
  "City Tax (2 € por día/pasajero, se paga en destino)",
  "Visas (responsabilidad del pasajero según nacionalidad)",
  "Suplementos por Early Check-in",
];

const itinerario = [
  { dia: "Día 1", titulo: "América – París", desc: "Salida en vuelo internacional hacia París. Noche a bordo." },
  { dia: "Día 2", titulo: "París", desc: "Llegada al aeropuerto de París. Traslado al hotel. Día libre." },
  { dia: "Día 3", titulo: "París", desc: "Visita panorámica: Campos Elíseos, Arco del Triunfo, Torre Eiffel, Barrio Latino, Los Inválidos y Medalla Milagrosa. Tarde libre." },
  { dia: "Día 4", titulo: "París", desc: "Día libre. Opcionales: Torre Eiffel, Palacio de Versalles (Patrimonio UNESCO)." },
  { dia: "Día 5", titulo: "París – Brujas – Ámsterdam", desc: "Visita a Brujas (Patrimonio UNESCO). Continuación a Ámsterdam." },
  { dia: "Día 6", titulo: "Ámsterdam", desc: "Visita panorámica: canales, casa de Rembrandt, taller de diamantes. Opcional: Marken y Volendam." },
  { dia: "Día 7", titulo: "Ámsterdam – Colonia – Crucero por el Rhin – Frankfurt", desc: "Colonia y su catedral gótica. Crucero por el Rhin (Roca de Loreley, castillos y viñedos). Llegada a Frankfurt." },
  { dia: "Día 8", titulo: "Frankfurt – Nuremberg – Praga", desc: "Nuremberg medieval. Visita panorámica de Praga: Reloj Astronómico, Puente de Carlos, ciudad vieja y barrio judío." },
  { dia: "Día 9", titulo: "Praga – Innsbruck", desc: "Mañana libre en Praga. Opcional: Castillo de Praga. Tarde: Innsbruck, Tejadillo de Oro, María Theresiam Strasse." },
  { dia: "Día 10", titulo: "Innsbruck – Padova – Venecia", desc: "Paso Alpino de Brenner, viaducto más alto de Europa. Parada en Padova. Llegada a Venecia." },
  { dia: "Día 11", titulo: "Venecia – Ferrara – Florencia", desc: "Vaporetto a Plaza de San Marcos, Palacio Ducal, Puente de los Suspiros. Ferrara. Florencia." },
  { dia: "Día 12", titulo: "Florencia – Asís – Roma", desc: "Catedral, Baptisterio, Puente Vecchio, Plaza Michelangelo. Asís: Basílica de San Francisco. Llegada a Roma." },
  { dia: "Día 13", titulo: "Roma", desc: "Vaticano, Audiencia Papal, Foros Romanos, Coliseo, Arco de Constantino. Opcional: Museos Vaticanos y Capilla Sixtina." },
  { dia: "Día 14", titulo: "Roma", desc: "Día libre. Opcional: Nápoles y Capri." },
  { dia: "Día 15", titulo: "Roma – Pisa – Niza", desc: "Torre Inclinada de Pisa. Llegada a Niza, Costa Azul. Opcional: Mónaco y Montecarlo." },
  { dia: "Día 16", titulo: "Niza – Nimes – Barcelona", desc: "Panorámica de Niza. Nimes. Llegada a Barcelona por la Provenza." },
  { dia: "Día 17", titulo: "Barcelona – Zaragoza – Madrid", desc: "Visita panorámica de Barcelona. Zaragoza: Basílica del Pilar. Llegada a Madrid." },
  { dia: "Día 18", titulo: "Madrid – América", desc: "Desayuno. Traslado al aeropuerto. Vuelo de regreso." },
];

const paises = ["Francia", "Bélgica", "Holanda", "Alemania", "Austria", "República Checa", "Italia", "España"];

export default function EuroLeyendasPage() {
  const [scrolled, setScrolled] = useState(false);
  const [salida, setSalida] = useState(0);
  const [showWA, setShowWA] = useState(false);
  const [diaOpen, setDiaOpen] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowWA(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "system-ui, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(2,6,23,0.97)" : "linear-gradient(180deg, rgba(2,6,23,0.85) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #f59e0b, #fcd34d, #f59e0b, transparent)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0.75rem clamp(1.5rem, 4vw, 3.5rem)", gap: "1rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ width: "clamp(54px, 7vw, 70px)", height: "clamp(54px, 7vw, 70px)", borderRadius: "50%", border: "1.5px solid rgba(251,191,36,0.8)", boxShadow: "0 0 20px rgba(251,191,36,0.4)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle, rgba(15,23,42,0.95), rgba(2,6,23,0.98))", position: "relative" }}>
              <div style={{ position: "relative", width: "clamp(38px, 5vw, 50px)", height: "clamp(38px, 5vw, 50px)" }}>
                <Image src="/logo-wonderlust.png" alt="Wonderlust" fill className="object-contain scale-[1.55]" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", fontWeight: 800, letterSpacing: "0.22em", backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #fcd34d, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>WONDERLUST</div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", margin: "2px 0" }}>
                <div style={{ height: "1px", width: "18px", background: "rgba(251,191,36,0.6)" }} />
                <span style={{ fontSize: "0.5rem", color: "rgba(253,211,77,0.8)" }}>✦</span>
                <div style={{ height: "1px", width: "18px", background: "rgba(251,191,36,0.6)" }} />
              </div>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(253,211,77,0.65)", textTransform: "uppercase" }}>by Villamor S.A.S</div>
            </div>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {([["/#explorar", "Inicio"], ["/destinos", "Destinos"], ["/visas", "Visas"]] as [string,string][]).map(([href, label], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {i > 0 && <span style={{ color: "rgba(251,191,36,0.35)" }}>|</span>}
                <Link href={href} style={{ fontSize: "clamp(0.8rem, 1.4vw, 1.1rem)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fcd34d")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}>{label}</Link>
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="https://wa.me/573144327782?text=Hola! Me interesa el paquete Euro Leyendas" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "linear-gradient(135deg, #f59e0b, #fcd34d)", color: "#0f172a", fontWeight: 700, fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", padding: "0.55rem 1.2rem", borderRadius: "9999px", textDecoration: "none", boxShadow: "0 0 16px rgba(245,158,11,0.35)", whiteSpace: "nowrap" }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO – Flyer completo ── */}
      <section style={{ paddingTop: "0", background: "#020617" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Image
            src="/paquetes/europa/euro-leyendas-flyer.png"
            alt="Euro Leyendas – Wonderlust by Villamor S.A.S"
            width={1200}
            height={1800}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
      </section>

      {/* ── PAÍSES QUE RECORRE ── */}
      <section style={{ background: "#020617", paddingBottom: "3rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
            {paises.map((p) => (
              <span key={p} style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", borderRadius: "9999px", padding: "0.4rem 1rem", fontSize: "0.82rem", fontWeight: 600, color: "#fcd34d", letterSpacing: "0.04em" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <section style={{ background: "#f8fafc", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,380px)", gap: "2rem", alignItems: "start" }}>

          {/* COLUMNA IZQUIERDA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* Resumen */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "9999px", padding: "0.3rem 0.9rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#b45309", fontWeight: 700 }}>✦ Bloqueo · Desde Bogotá</span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1, color: "#0f172a", marginBottom: "0.5rem" }}>
                Euro <span style={{ backgroundImage: "linear-gradient(135deg, #f59e0b, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Leyendas</span>
              </h1>
              <p style={{ fontSize: "1rem", color: "#64748b", lineHeight: 1.6 }}>
                El plan más completo del mercado. 8 países, 18 días y 16 noches recorriendo las ciudades más legendarias de Europa, operado por Air Europa desde Bogotá.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a" }}>18</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Días ☀️</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a" }}>16</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Noches 🌙</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a" }}>8</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Países</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: "#b45309" }}>$3.371</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Desde USD</p>
                </div>
              </div>
            </div>

            {/* Qué incluye */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem", color: "#0f172a" }}>✅ Qué incluye</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {incluye.map((item) => (
                  <div key={item.texto} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.icon}</span>
                    <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.5 }}>{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* No incluye */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem", color: "#0f172a" }}>❌ No incluye</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {noIncluye.map((item) => (
                  <p key={item} style={{ fontSize: "0.87rem", color: "#64748b", lineHeight: 1.5, paddingLeft: "0.5rem", borderLeft: "2px solid #e2e8f0" }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Itinerario */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem", color: "#0f172a" }}>🗓 Itinerario día a día</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {itinerario.map((d, i) => (
                  <div key={i} style={{ borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                    <button
                      onClick={() => setDiaOpen(diaOpen === i ? null : i)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", background: diaOpen === i ? "#f8fafc" : "white", border: "none", cursor: "pointer", textAlign: "left" }}>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#b45309", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "9999px", padding: "0.2rem 0.65rem", whiteSpace: "nowrap" }}>{d.dia}</span>
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>{d.titulo}</span>
                      </div>
                      <span style={{ color: "#94a3b8", fontSize: "0.8rem", flexShrink: 0 }}>{diaOpen === i ? "▲" : "▼"}</span>
                    </button>
                    {diaOpen === i && (
                      <div style={{ padding: "0.75rem 1rem 1rem", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
                        <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65 }}>{d.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notas importantes */}
            <div style={{ background: "#fffbeb", borderRadius: "1.25rem", padding: "1.75rem", border: "1px solid rgba(245,158,11,0.3)" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1rem", color: "#92400e" }}>⚠️ Información importante</h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "0" }}>
                {[
                  "Precios en USD, pago en pesos colombianos según TRM vigente.",
                  "Habitación triple: la 3ª persona ocupa sofá cama o catre.",
                  "Pasaporte vigente con mínimo 6 meses de validez al día de viaje.",
                  "Visas son responsabilidad del pasajero según su nacionalidad.",
                  "City Tax: 2 € por día/pasajero, se paga directamente en destino.",
                  "Asistencia médica para mayores de 76 años requiere suplemento.",
                  "Habitaciones matrimoniales/twin no garantizadas, sujetas a disponibilidad.",
                ].map((nota) => (
                  <li key={nota} style={{ fontSize: "0.85rem", color: "#78350f", lineHeight: 1.5, display: "flex", gap: "0.5rem" }}>
                    <span style={{ flexShrink: 0, marginTop: "2px" }}>›</span>
                    {nota}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* COLUMNA DERECHA — Cotizador sticky */}
          <div style={{ position: "sticky", top: "7rem" }}>
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
              <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: "0.4rem" }}>Paquete</p>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", marginBottom: "0.25rem" }}>Euro Leyendas</h3>
              <p style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "1.5rem" }}>18 días · 16 noches · 8 países · Desde Bogotá</p>

              <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>Selecciona tu fecha de salida</h4>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {salidas.map((s, i) => (
                  <button key={i} onClick={() => setSalida(i)} style={{
                    flex: 1, padding: "0.65rem 0.5rem", borderRadius: "0.75rem", border: "none", cursor: "pointer",
                    fontSize: "0.72rem", fontWeight: 700, transition: "all 0.2s",
                    background: salida === i ? "#0f172a" : "#f1f5f9",
                    color: salida === i ? "#fcd34d" : "#64748b",
                    lineHeight: 1.3,
                  }}>
                    {s.fecha}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                {salidas[salida].tarifas.map((t) => (
                  <div key={t.tipo} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "0.87rem", color: "#475569", fontWeight: 500 }}>{t.tipo}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 900, color: "#b45309" }}>{t.precio}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginBottom: "1.25rem", textAlign: "center" }}>
                * Por persona en acomodación doble. Pago en COP según TRM vigente.
              </p>

              <a
                href={`https://wa.me/573144327782?text=Hola! Me interesa el paquete Euro Leyendas - ${salidas[salida].fecha}`}
                target="_blank" rel="noreferrer"
                style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg, #f59e0b, #fcd34d)", color: "#0f172a", fontWeight: 700, fontSize: "1rem", padding: "0.9rem", borderRadius: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(245,158,11,0.3)" }}>
                Cotizar por WhatsApp 💬
              </a>

              <Link href="/europa" style={{ display: "block", textAlign: "center", marginTop: "0.75rem", fontSize: "0.82rem", color: "#94a3b8", textDecoration: "none" }}>
                ← Ver todos los paquetes de Europa
              </Link>

              {/* Operado por */}
              <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
                <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "0.4rem" }}>Vuelos operados por</p>
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", letterSpacing: "0.05em" }}>✈ Air Europa</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#020617", borderTop: "1px solid rgba(251,191,36,0.15)", marginTop: "2rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
          <p>© 2026 Wonderlust by Villamor S.A.S. Todos los derechos reservados.</p>
          <p>Agencia de viajes · Paquetes Europa · Visas Colombia</p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a
        href="https://wa.me/573144327782?text=Hola! Me interesa el paquete Euro Leyendas"
        target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 100, width: "60px", height: "60px", borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,0.5)", transition: "transform 0.2s, opacity 0.4s", opacity: showWA ? 1 : 0, pointerEvents: showWA ? "auto" : "none" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

    </main>
  );
}