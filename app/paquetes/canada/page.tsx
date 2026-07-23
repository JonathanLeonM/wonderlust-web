"use client";


import { useState } from "react";
import Link from "next/link";

const WA = "https://wa.me/573134883629";

const WhatsIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.463 3.488" />
  </svg>
);

type Day = { num: string; title: string; desc: string };

const itineraryA: Day[] = [
  { num: "01", title: "Toronto", desc: "El sueño empieza aquí: aterrizas en Toronto Pearson y, de camino al hotel, la ciudad te recibe con sus luces. Esta noche no hay planes — solo la certeza de que por fin lo hiciste. Alojamiento." },
  { num: "02", title: "Toronto – Niagara Falls", desc: "Desayuno americano. La mañana es para caminar Toronto — su alcaldía, el barrio bohemio de Yorkville, la Torre CN recortando el cielo — y la tarde te lleva por la ruta del vino hasta el rugido de las cataratas del Niágara, donde el barco Hornblower te acerca tanto que sientes el agua en la cara. Alojamiento." },
  { num: "03", title: "Niagara Falls – Mil Islas – Ottawa (Hull)", desc: "Desayuno continental. Navegas entre las mil islas donde el lago Ontario se convierte en río, un paisaje que parece pintado. Llegas a Ottawa al atardecer, bordeando el Canal Rideau, capital que se siente a la vez solemne y cercana. Alojamiento." },
  { num: "04", title: "Ottawa – Mt. Tremblant", desc: "Desayuno americano. Recorres el Parlamento y los barrios donde vive la historia de Canadá, y luego dejas la ciudad atrás rumbo a los Montes Laurentinos. Al llegar a Mt. Tremblant, la montaña te regala una tarde libre para simplemente respirar. Alojamiento." },
  { num: "05", title: "Mt. Tremblant – Quebec", desc: "Desayuno americano. Una parada obligada: una cabaña de azúcar donde pruebas el jarabe de arce recién hecho. Luego, Quebec te abre sus puertas de piedra — la única ciudad amurallada de Norteamérica — y caminas entre el Chateau Frontenac y la Plaza Real como si hubieras cruzado a otra época. Alojamiento." },
  { num: "06", title: "Quebec", desc: "Desayuno americano. Un día entero para hacerlo tuyo: perderte en sus calles empedradas, descubrir un café escondido o simplemente disfrutar la ciudad más romántica de Canadá a tu ritmo. Alojamiento." },
  { num: "07", title: "Quebec – Montreal", desc: "Desayuno americano. Llegas a Montreal, la ciudad que mezcla Europa con Norteamérica: la Universidad McGill, el Oratorio San José en lo alto del monte, y el Viejo Montreal con su Basílica de Notre Dame iluminando la tarde. Alojamiento." },
  { num: "08", title: "Montreal", desc: "Desayuno americano. Antes de volver, un último café mirando la ciudad — y la certeza de que esta meta, la que soñaste por tanto tiempo, ya es un recuerdo tuyo. Traslado al aeropuerto. Fin de los servicios." },
];

const itineraryB: Day[] = [
  { num: "01", title: "Toronto", desc: "Pisas Canadá por primera vez. El traslado al hotel es corto, pero el momento se siente enorme — este viaje que planeaste tanto tiempo, por fin es real. Resto del día libre. Alojamiento." },
  { num: "02", title: "Toronto – Niagara Falls", desc: "Desayuno. Caminas Toronto de la mano de tu guía — su alcaldía, Yorkville, la imponente Torre CN — y sigues la ruta del vino hasta el estruendo de las cataratas del Niágara, donde el Hornblower te lleva casi hasta tocarlas. Alojamiento." },
  { num: "03", title: "Niagara Falls – Mil Islas – Ottawa (Hull)", desc: "Desayuno. Un paseo en barco entre las mil islas, donde el paisaje parece detenido en el tiempo. Llegas a Ottawa bordeando el Canal Rideau al caer la tarde. Alojamiento." },
  { num: "04", title: "Ottawa – Mt. Tremblant", desc: "Desayuno. Recorres el Parlamento y la vida tranquila de la capital, y luego partes hacia los Montes Laurentinos. Mt. Tremblant te espera con una tarde para respirar montaña. Alojamiento." },
  { num: "05", title: "Mt. Tremblant – Quebec", desc: "Desayuno. Una parada en una cabaña de azúcar para probar el jarabe de arce recién hecho, y luego Quebec — la ciudad amurallada que parece sacada de Europa — con el Chateau Frontenac como telón de fondo. Alojamiento." },
  { num: "06", title: "Quebec", desc: "Desayuno. Un día libre para hacer tuya la ciudad más encantadora de Canadá, a tu propio ritmo. Alojamiento." },
  { num: "07", title: "Quebec – Montreal", desc: "Desayuno. Montreal te recibe con su mezcla única de Europa y Norteamérica: McGill, el Oratorio San José y el Viejo Montreal con su Basílica de Notre Dame. Alojamiento." },
  { num: "08", title: "Montreal", desc: "Desayuno. Un día libre para explorar por tu cuenta — la ciudad subterránea, el jardín botánico o sus mercados con sabor local. Alojamiento." },
  { num: "09", title: "Montreal", desc: "Desayuno. Antes de partir, un último momento para asimilar todo lo vivido — esta meta que hoy se cumplió. Traslado al aeropuerto. Fin de los servicios." },
];

const hotelsA = [
  { city: "Toronto", hotel: "Chelsea Toronto Hotel" },
  { city: "Niagara Falls", hotel: "Wyndham Garden Niagara Falls Fallsview" },
  { city: "Sainte-Foy (Quebec)", hotel: "Le Classique Ste-Foy" },
  { city: "Montreal", hotel: "Le Nouvel Hotel Montreal" },
];
const hotelsB = [
  { city: "Toronto", hotel: "Chelsea Toronto Hotel", nights: "1" },
  { city: "Niagara Falls", hotel: "Wyndham Garden Niagara Falls", nights: "1" },
  { city: "Hull", hotel: "Four Points Sheraton", nights: "1" },
  { city: "Mont Tremblant", hotel: "Marriott Residence Inn", nights: "1" },
  { city: "Quebec", hotel: "Le Classique Quebec", nights: "2" },
  { city: "Montreal", hotel: "Le Nouvel Hotel Montreal", nights: "2" },
];
const pricingB = [
  { season: "2026 (Jul–Dic)", double: "2.490", triple: "2.230", single: "3.630" },
  { season: "2027 (Feb–Abr)", double: "2.430", triple: "2.170", single: "3.510" },
];
const includesA = [
  "Tiquete aéreo Bogotá – Toronto – Montreal – Bogotá con Air Canadá, clase Economy",
  "1 artículo personal + 1 equipaje de mano de 10kg + 1 maleta facturada de 23kg",
  "Traslados aeropuerto – hotel – aeropuerto en servicio compartido",
  "7 noches de alojamiento (Toronto, Niagara Falls, Ottawa, Mt. Tremblant, 2 Quebec, Montreal)",
  "7 desayunos diarios (6 americanos y 1 continental)",
  "Paseo en barco Mil Islas y Hornblower Niagara (según temporada)",
  "Guía acompañante de habla hispana",
];
const excludesA = [
  "Trámite de pasaporte, visa y valores consulares",
  "Propinas para guías, conductores y meseros",
  "Cargos e impuestos pagados directamente en destino",
  "Tarjeta de asistencia médica y gastos personales",
  "2% de fee bancario sobre la porción terrestre",
];
const includesB = [
  "8 noches de alojamiento en los hoteles previstos o similares",
  "Régimen de alojamiento y desayuno",
  "Transporte en autobús o minibús según número de pasajeros",
  "Guía de habla española durante todo el recorrido",
  "Transporte de 1 maleta durante el recorrido",
  "Seguro de asistencia Mapaplus",
];
const excludesB = [
  "Vuelos internacionales",
  "Early check-in / late check-out (entrada 16:00h, salida 10:00h)",
  "Visados",
  "Gastos personales: propinas, bebidas, bar, teléfono, lavandería",
];
const notesB = [
  "Salidas mínimo 2 personas. Precios no válidos para pasajeros de origen o nacionalidad canadiense.",
  "Propinas obligatorias en Canadá: aprox. 4 CAD/día para el conductor y 5 CAD/día para el guía, por persona.",
  "El barco Hornblower opera de mayo a octubre; fuera de temporada se sustituye por los túneles escénicos.",
  "Vuelos que lleguen entre 21:00–01:00h o 5:00–07:00h tienen suplemento de traslado de 75 USD. Sin traslados entre 1:00–5:00h.",
];

export default function CanadaPage() {
  const [tab, setTab] = useState<"a" | "b">("a");
  const isA = tab === "a";
  const [openA, setOpenA] = useState<Record<string, boolean>>({ "01": true });
  const [openB, setOpenB] = useState<Record<string, boolean>>({ "01": true });

  const pillBase: React.CSSProperties = { border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 700, padding: "12px 22px", borderRadius: 100 };

  return (
    <main style={{ margin: 0, background: "#fdf9f0", fontFamily: "'Karla',system-ui,-apple-system,sans-serif", color: "#3a2c22" }}>
      {/* NAV — igual al home */}
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(14,61,59,.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(231,200,160,.22)" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px clamp(18px,4vw,46px)", gap: 14 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-wonderlust.png" alt="Wonderlust" style={{ width: "clamp(36px,4.4vw,46px)", height: "clamp(36px,4.4vw,46px)", objectFit: "contain" }} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(16px,2vw,22px)", letterSpacing: ".16em", color: "#fdf7ec" }}>WONDERLUST</div>
              <div style={{ fontSize: "clamp(6.5px,.9vw,8.5px)", letterSpacing: ".28em", color: "#e7c8a0", marginTop: 3 }}>AGENCIA DE VIAJES · BOGOTÁ</div>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2.4vw,30px)" }}>
            <Link href="/" style={{ fontSize: "clamp(11px,1.3vw,13.5px)", fontWeight: 600, letterSpacing: ".04em", color: "rgba(253,247,236,.88)", textDecoration: "none" }}>← Inicio</Link>
            <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#128c4a", color: "#fff", fontSize: "clamp(11px,1.3vw,12.5px)", fontWeight: 700, padding: "9px clamp(12px,1.8vw,20px)", borderRadius: 30, whiteSpace: "nowrap", textDecoration: "none" }}>
              <WhatsIcon size={14} />WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ position: "relative", height: "clamp(360px,52vw,560px)", overflow: "hidden" }}>
        <img src="/paquetes/canada-panoramica.png" alt="Canadá" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(20,12,8,.82) 0%,rgba(20,12,8,.28) 55%,rgba(20,12,8,.1) 100%)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(28px,5vw,56px)", color: "#fdf7ec" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ height: 1, width: 34, background: "#e7c8a0" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".3em", color: "#e7c8a0" }}>RUTA DEL ESTE CANADIENSE</span>
          </div>
          <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(32px,6vw,56px)", lineHeight: 1.05, margin: 0, maxWidth: 720 }}>Canadá en Familia</h1>
          <p style={{ fontSize: "clamp(14px,1.6vw,17px)", color: "rgba(253,247,236,.9)", margin: "16px 0 0", maxWidth: 560, lineHeight: 1.6 }}>
            Toronto, Niagara Falls, Ottawa, Mont-Tremblant, Quebec y Montreal — dos formas de vivir la misma ruta, a tu ritmo y a tu presupuesto.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(18px,4vw,40px)" }}>
        {/* SWITCHER */}
        <div style={{ display: "flex", justifyContent: "center", margin: "-28px 0 44px", position: "relative", zIndex: 5 }}>
          <div style={{ display: "inline-flex", background: "#fdf9f0", border: "1px solid rgba(58,44,34,.1)", borderRadius: 100, padding: 6, boxShadow: "0 12px 30px rgba(58,44,34,.12)" }}>
            <button onClick={() => setTab("a")} style={{ ...pillBase, background: isA ? "#14514f" : "transparent", color: isA ? "#fdf7ec" : "#7c6a58" }}>Con vuelo · 8 días</button>
            <button onClick={() => setTab("b")} style={{ ...pillBase, background: !isA ? "#14514f" : "transparent", color: !isA ? "#fdf7ec" : "#7c6a58" }}>Solo terrestre · 9 días</button>
          </div>
        </div>

        {isA ? (
          <div style={{ paddingBottom: 60 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: "#bd5a34", marginBottom: 8 }}>CND-41772 · CON VUELO INTERNACIONAL</div>
                <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,3.4vw,34px)", margin: 0, color: "#14514f" }}>Canadá en 8 Días</h2>
                <div style={{ fontSize: 13.5, color: "#7c6a58", marginTop: 8 }}>8 días / 7 noches · Bogotá–Toronto–Montreal–Bogotá con Air Canadá</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 36, color: "#bd5a34", lineHeight: 1 }}>$2.599</div>
                <div style={{ fontSize: 11, letterSpacing: ".1em", color: "#9a8a76" }}>USD DESDE · TRIPLE</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: 44 }}>
              {itineraryA.map((day) => {
                const open = !!openA[day.num];
                return (
                  <div key={day.num} style={{ borderBottom: "1px solid rgba(58,44,34,.09)" }}>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "20px 4px", cursor: "pointer" }} onClick={() => setOpenA((s) => ({ ...s, [day.num]: !s[day.num] }))}>
                      <img src={`/paquetes/canada-dia-a-${day.num}.png`} alt="" style={{ width: 120, height: 88, flexShrink: 0, borderRadius: 14, objectFit: "cover", background: "rgba(20,81,79,.08)" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#e0a94a", marginBottom: 4 }}>DÍA {day.num}</div>
                        <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(19px,2.4vw,25px)", color: "#14514f", lineHeight: 1.15 }}>{day.title}</div>
                      </div>
                      <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: "rgba(20,81,79,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#14514f" }}>{open ? "−" : "+"}</div>
                    </div>
                    {open && <div style={{ padding: "0 4px 22px 140px", fontSize: 13.5, lineHeight: 1.7, color: "#7c6a58", maxWidth: 620 }}>{day.desc}</div>}
                  </div>
                );
              })}
            </div>

            <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: "#14514f", margin: "0 0 16px" }}>Hoteles previstos</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              {hotelsA.map((h) => (
                <div key={h.city} style={{ flex: "1 1 200px", background: "#fff", border: "1px solid rgba(58,44,34,.08)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, letterSpacing: ".1em", color: "#9a8a76", marginBottom: 6 }}>{h.city}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#14514f" }}>{h.hotel}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: "#14514f", margin: "0 0 16px" }}>Tarifas por persona</h3>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
              {[["SENCILLA", "3.599"], ["DOBLE", "2.799"], ["TRIPLE", "2.599"]].map(([label, price]) => (
                <div key={label} style={{ flex: "1 1 140px", background: "#14514f", borderRadius: 14, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 10.5, letterSpacing: ".14em", color: "#e7c8a0", marginBottom: 8 }}>{label}</div>
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: 26, color: "#fdf7ec" }}>${price}</div>
                </div>
              ))}
              <div style={{ flex: "1 1 140px", background: "#bd5a34", borderRadius: 14, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 10.5, letterSpacing: ".14em", color: "rgba(255,255,255,.85)", marginBottom: 8 }}>NIÑO 3-16</div>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 26, color: "#fff" }}>$1.899</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#9a8a76", marginBottom: 36 }}>No incluye 2% de fee bancario sobre la porción terrestre.</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#14514f", margin: "0 0 12px" }}>Incluye</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {includesA.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 9, fontSize: 13.5, color: "#3a2c22", lineHeight: 1.5 }}><span style={{ color: "#128c4a", flexShrink: 0 }}>✓</span>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#14514f", margin: "0 0 12px" }}>No incluye</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {excludesA.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 9, fontSize: 13.5, color: "#7c6a58", lineHeight: 1.5 }}><span style={{ color: "#bd5a34", flexShrink: 0 }}>✕</span>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ paddingBottom: 60 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: "#bd5a34", marginBottom: 8 }}>SALIDAS MÍN. 2 PERSONAS · SIN TIQUETES AÉREOS</div>
                <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,3.4vw,34px)", margin: 0, color: "#14514f" }}>Canadá Clásico</h2>
                <div style={{ fontSize: 13.5, color: "#7c6a58", marginTop: 8 }}>9 días / 8 noches · solo porción terrestre</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 36, color: "#bd5a34", lineHeight: 1 }}>$2.345</div>
                <div style={{ fontSize: 11, letterSpacing: ".1em", color: "#9a8a76" }}>USD DESDE</div>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid rgba(58,44,34,.08)", borderRadius: 14, padding: "18px 20px", marginBottom: 36 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".14em", color: "#9a8a76", marginBottom: 8 }}>SALIDAS DESDE TORONTO</div>
              <div style={{ fontSize: 13, color: "#3a2c22", lineHeight: 1.7 }}>
                <b>2026:</b> Jul 6, 13, 20, 27 · Ago 3, 10, 17, 24, 31 · Sep 7, 14, 21, 28 · Oct 5, 12 · Dic 27 &nbsp;·&nbsp; <b>2027:</b> Feb 8 · Mar 22 · Abr 12
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: 44 }}>
              {itineraryB.map((day) => {
                const open = !!openB[day.num];
                return (
                  <div key={day.num} style={{ borderBottom: "1px solid rgba(58,44,34,.09)" }}>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "20px 4px", cursor: "pointer" }} onClick={() => setOpenB((s) => ({ ...s, [day.num]: !s[day.num] }))}>
                      <img src={`/paquetes/canada-dia-b-${day.num}.png`} alt="" style={{ width: 120, height: 88, flexShrink: 0, borderRadius: 14, objectFit: "cover", background: "rgba(20,81,79,.08)" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#e0a94a", marginBottom: 4 }}>DÍA {day.num}</div>
                        <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(19px,2.4vw,25px)", color: "#14514f", lineHeight: 1.15 }}>{day.title}</div>
                      </div>
                      <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: "rgba(20,81,79,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#14514f" }}>{open ? "−" : "+"}</div>
                    </div>
                    {open && <div style={{ padding: "0 4px 22px 140px", fontSize: 13.5, lineHeight: 1.7, color: "#7c6a58", maxWidth: 620 }}>{day.desc}</div>}
                  </div>
                );
              })}
            </div>

            <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: "#14514f", margin: "0 0 16px" }}>Hoteles previstos (4★)</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              {hotelsB.map((h) => (
                <div key={h.city} style={{ flex: "1 1 160px", background: "#fff", border: "1px solid rgba(58,44,34,.08)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, letterSpacing: ".1em", color: "#9a8a76", marginBottom: 6 }}>{h.city} · {h.nights}n</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#14514f" }}>{h.hotel}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 19, color: "#14514f", margin: "0 0 16px" }}>Tarifas por temporada</h3>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
              {pricingB.map((p) => (
                <div key={p.season} style={{ flex: "1 1 260px", background: "#fff", border: "1px solid rgba(58,44,34,.08)", borderRadius: 14, padding: "20px 22px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: "#14514f", marginBottom: 12 }}>{p.season}</div>
                  <div style={{ display: "flex", gap: 18 }}>
                    <div><div style={{ fontFamily: "'Marcellus',serif", fontSize: 22, color: "#bd5a34" }}>${p.double}</div><div style={{ fontSize: 10.5, letterSpacing: ".1em", color: "#9a8a76" }}>DOBLE</div></div>
                    <div><div style={{ fontFamily: "'Marcellus',serif", fontSize: 22, color: "#bd5a34" }}>${p.triple}</div><div style={{ fontSize: 10.5, letterSpacing: ".1em", color: "#9a8a76" }}>TRIPLE</div></div>
                    <div><div style={{ fontFamily: "'Marcellus',serif", fontSize: 22, color: "#bd5a34" }}>${p.single}</div><div style={{ fontSize: 10.5, letterSpacing: ".1em", color: "#9a8a76" }}>INDIV.</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#9a8a76", marginBottom: 36 }}>Precios no válidos para pasajeros de origen o nacionalidad canadiense.</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
              <div>
                <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#14514f", margin: "0 0 12px" }}>Incluye</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {includesB.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 9, fontSize: 13.5, color: "#3a2c22", lineHeight: 1.5 }}><span style={{ color: "#128c4a", flexShrink: 0 }}>✓</span>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: 17, color: "#14514f", margin: "0 0 12px" }}>No incluye</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {excludesB.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 9, fontSize: 13.5, color: "#7c6a58", lineHeight: 1.5 }}><span style={{ color: "#bd5a34", flexShrink: 0 }}>✕</span>{item}</div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(189,90,52,.07)", borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".14em", color: "#bd5a34", marginBottom: 10 }}>NOTAS IMPORTANTES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {notesB.map((n) => (
                  <div key={n} style={{ fontSize: 13, lineHeight: 1.55, color: "#7c6a58" }}>— {n}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: "#14514f", borderRadius: 20, padding: "clamp(28px,5vw,44px)", textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,3vw,30px)", color: "#fdf7ec", marginBottom: 12 }}>¿Avanzamos con la reserva?</div>
          <div style={{ fontSize: 14, color: "rgba(253,247,236,.85)", maxWidth: 480, margin: "0 auto 24px" }}>Escríbenos por WhatsApp y confirmamos cupos, fechas y forma de pago.</div>
          <a href={`${WA}?text=Hola%2C%20quiero%20avanzar%20con%20la%20cotizaci%C3%B3n%20de%20Canad%C3%A1%20en%20Familia`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#128c4a", color: "#fff", fontSize: 15, fontWeight: 700, padding: "15px 28px", borderRadius: 30, textDecoration: "none" }}>
            <WhatsIcon size={18} />Escribir por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
