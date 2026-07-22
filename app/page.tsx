"use client";

import Link from "next/link";

const WA = "https://wa.me/573134883629";
const WOMPI_US = "https://checkout.wompi.co/l/WadHBw";
const WOMPI_CA = "https://checkout.wompi.co/l/urqCID";

const WhatsIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.463 3.488" />
  </svg>
);

const CardIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);

const paquetes = [
  { titulo: "Europa Fantástica", img: "/paquetes/europa-fantastica.png", sub: "Atención personalizada · París · Roma · Barcelona", precio: "USD 3.319", destacado: true },
  { titulo: "Euro Leyendas", img: "/paquetes/euro-leyendas.png", sub: "Atención personalizada · Londres · Ámsterdam · Praga", precio: "USD 2.890", destacado: false },
  { titulo: "Europa Chic", img: "/paquetes/europa-chic.png", sub: "Atención personalizada · París · Venecia · Roma", precio: "USD 2.450", destacado: false },
];

const paisesCompactos = [
  { pais: "Costa Rica", flag: "cr" },
  { pais: "Japón", flag: "jp" },
  { pais: "China", flag: "cn" },
];

export default function Home() {
  return (
    <main style={{ width: "100%", fontFamily: "'Karla', system-ui, -apple-system, sans-serif", color: "#3a2c22", background: "#f7f0e4" }}>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(14,61,59,.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(231,200,160,.22)" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px clamp(18px,4vw,46px)", gap: 14 }}>
          <Link href="#top" style={{ display: "flex", alignItems: "center", gap: 11, flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-wonderlust.png" alt="Wonderlust" style={{ width: "clamp(36px,4.4vw,46px)", height: "clamp(36px,4.4vw,46px)", objectFit: "contain" }} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(16px,2vw,22px)", letterSpacing: ".16em", color: "#fdf7ec" }}>WONDERLUST</div>
              <div style={{ fontSize: "clamp(6.5px,.9vw,8.5px)", letterSpacing: ".28em", color: "#e7c8a0", marginTop: 3 }}>AGENCIA DE VIAJES · BOGOTÁ</div>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2.4vw,30px)" }}>
            <a href="#visas" style={{ fontSize: "clamp(11px,1.3vw,13.5px)", fontWeight: 600, letterSpacing: ".04em", color: "rgba(253,247,236,.88)", textDecoration: "none" }}>Visas</a>
            <a href="#paquetes" style={{ fontSize: "clamp(11px,1.3vw,13.5px)", fontWeight: 600, letterSpacing: ".04em", color: "rgba(253,247,236,.88)", textDecoration: "none" }}>Paquetes</a>
            <a href="#viajeros" style={{ fontSize: "clamp(11px,1.3vw,13.5px)", fontWeight: 600, letterSpacing: ".04em", color: "rgba(253,247,236,.88)", textDecoration: "none" }}>Viajeros</a>
            <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#128c4a", color: "#fff", fontSize: "clamp(11px,1.3vw,12.5px)", fontWeight: 700, padding: "9px clamp(12px,1.8vw,20px)", borderRadius: 30, whiteSpace: "nowrap", textDecoration: "none" }}>
              <WhatsIcon size={14} />WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="top" style={{
        position: "relative", minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "flex-end",
        overflow: "hidden", color: "#fdf7ec",
      }}>
        <video autoPlay loop muted playsInline poster="/europa-pano.png" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0,
        }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          backgroundImage: "linear-gradient(90deg,rgba(24,15,9,.85) 0%,rgba(24,15,9,.5) 48%,rgba(24,15,9,.12) 100%),linear-gradient(180deg,rgba(24,15,9,.15) 0%,transparent 30%,rgba(24,15,9,.35) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1220, width: "100%", margin: "0 auto", padding: "clamp(40px,8vh,90px) clamp(20px,5vw,46px) clamp(30px,5vh,50px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ maxWidth: 660 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <span style={{ height: 1, width: 38, background: "#e7c8a0" }} />
              <span style={{ fontSize: "clamp(10px,1.2vw,11.5px)", fontWeight: 700, letterSpacing: ".3em", color: "#e7c8a0" }}>EUROPA · VISAS USA Y CANADÁ</span>
            </div>
            <h1 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(38px,6.2vw,66px)", lineHeight: 1.04, margin: 0, textShadow: "0 4px 34px rgba(0,0,0,.5)" }}>
              Viaja a Europa como siempre lo soñaste.
            </h1>
            <p style={{ fontSize: "clamp(15px,1.8vw,18.5px)", lineHeight: 1.6, color: "rgba(253,247,236,.92)", margin: "26px 0 0", maxWidth: 540, textShadow: "0 2px 14px rgba(0,0,0,.5)" }}>
              Paquetes cuidados al detalle y asesoría de visa a Estados Unidos y Canadá. Tú sueñas el destino; nosotros nos encargamos de todo lo demás.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 34, flexWrap: "wrap" }}>
              <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#128c4a", color: "#fff", fontSize: "clamp(14px,1.7vw,16px)", fontWeight: 700, padding: "16px clamp(22px,3vw,32px)", borderRadius: 34, boxShadow: "0 14px 32px rgba(0,0,0,.32)", textDecoration: "none" }}>
                <WhatsIcon size={20} />Planea tu viaje por WhatsApp
              </a>
              <a href="#paquetes" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid rgba(253,247,236,.55)", color: "#fdf7ec", fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 600, padding: "15px clamp(20px,2.6vw,28px)", borderRadius: 34, textDecoration: "none" }}>Ver paquetes de Europa</a>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "clamp(16px,2.6vw,28px)", flexWrap: "wrap", padding: "15px clamp(20px,5vw,46px)", background: "rgba(20,12,8,.5)", backdropFilter: "blur(5px)", fontSize: "clamp(10.5px,1.2vw,12px)", color: "#e7d9c4" }}>
          <span style={{ color: "#e7c8a0" }}>★★★★★</span>
          <span>+2.400 viajeros felices</span><span style={{ width: 1, height: 13, background: "rgba(231,200,160,.4)" }} />
          <span>Registro Nacional de Turismo</span><span style={{ width: 1, height: 13, background: "rgba(231,200,160,.4)" }} />
          <span>Acompañamiento de principio a fin</span><span style={{ width: 1, height: 13, background: "rgba(231,200,160,.4)" }} />
          <span>Pagos 100% seguros</span>
        </div>
      </section>

      {/* VISAS */}
      <section id="visas" style={{ background: "#f7f0e4", padding: "clamp(52px,8vw,80px) 0" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(20px,5vw,46px)" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(28px,4vw,42px)" }}>
            <div style={{ maxWidth: 600 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".3em", color: "#bd5a34", marginBottom: 14 }}>CONSULTORÍA DE VISAS · NUESTRA PRIMERA PROMESA</div>
              <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.08, margin: 0, color: "#14514f" }}>
                Tu visa, sin la angustia — y paga tu asesoría en línea.
              </h2>
              <p style={{ fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.65, color: "#7c6a58", margin: "16px 0 0" }}>
                Tramitamos tu visa para Estados Unidos, Canadá, Costa Rica, Japón y China. Te acompañamos en cada paso —formularios, cita, documentos y entrevista— y pagas en línea de forma segura con Wompi.
              </p>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: "#9a8a76", margin: "10px 0 0" }}>
                *Valor de nuestra asesoría. No incluye tarifas consulares, gubernamentales ni de terceros, que se pagan aparte según el país.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(40px,6vw,58px)", color: "#bd5a34", lineHeight: 1 }}>+800</div>
              <div style={{ fontSize: 11, letterSpacing: ".14em", color: "#9a8a76" }}>VISAS APROBADAS</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "clamp(12px,2vw,20px)", flexWrap: "wrap", marginBottom: "clamp(24px,3vw,32px)" }}>
            {[
              { n: "01", t: "Escríbenos", d: "Cuéntanos tu caso por WhatsApp. Evaluamos tu perfil sin costo." },
              { n: "02", t: "Preparamos tu caso", d: "Formularios, documentos y simulacro de entrevista, contigo." },
              { n: "03", t: "Presentas con confianza", d: "Llegas a la cita preparado y con todo en orden." },
            ].map((s) => (
              <div key={s.n} style={{ flex: "1 1 200px", display: "flex", alignItems: "flex-start", gap: 13, background: "#fdf9f0", borderRadius: 14, padding: "20px 22px", border: "1px solid rgba(58,44,34,.07)" }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: 26, color: "#e0a94a", lineHeight: 1, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: "#14514f", marginBottom: 3 }}>{s.t}</div>
                  <div style={{ fontSize: 13, color: "#7c6a58", lineHeight: 1.5 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "clamp(16px,2.4vw,24px)", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 320px", background: "#14514f", borderRadius: 18, padding: "clamp(24px,3vw,34px)", color: "#eaf3f1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
                <img src="https://flagcdn.com/w80/us.png" alt="Estados Unidos" style={{ width: 40, height: "auto", borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,.35)" }} />
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.6vw,27px)", color: "#fff" }}>Visa Estados Unidos</div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 2.05, color: "#c5ddd9", marginBottom: 24 }}>
                ● &nbsp;Diligenciamiento del formulario DS-160<br />● &nbsp;Agenda de tu cita consular<br />● &nbsp;Revisión de documentos y soportes<br />● &nbsp;Preparación de entrevista 1 a 1
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={WOMPI_US} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#bd5a34", color: "#fff", fontSize: 13, fontWeight: 700, padding: "12px 24px", borderRadius: 26, boxShadow: "0 8px 20px rgba(189,90,52,.35)", textDecoration: "none" }}>
                  <CardIcon />Pagar ya
                </a>
                <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1.5px solid #e7c8a0", color: "#e7c8a0", fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: 26, textDecoration: "none" }}>
                  Agenda tu asesoría →
                </a>
              </div>
            </div>
            <div style={{ flex: "1 1 320px", background: "#14514f", borderRadius: 18, padding: "clamp(24px,3vw,34px)", color: "#eaf3f1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
                <img src="https://flagcdn.com/w80/ca.png" alt="Canadá" style={{ width: 40, height: "auto", borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,.35)" }} />
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.6vw,27px)", color: "#fff" }}>Visa Canadá</div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 2.05, color: "#c5ddd9", marginBottom: 24 }}>
                ● &nbsp;Solicitud y armado de perfil migratorio<br />● &nbsp;Carta de solicitud y plan de viaje<br />● &nbsp;Soportes financieros y laborales<br />● &nbsp;Revisión completa antes de enviar
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={WOMPI_CA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#bd5a34", color: "#fff", fontSize: 13, fontWeight: 700, padding: "12px 24px", borderRadius: 26, boxShadow: "0 8px 20px rgba(189,90,52,.35)", textDecoration: "none" }}>
                  <CardIcon />Pagar ya
                </a>
                <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1.5px solid #e7c8a0", color: "#e7c8a0", fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: 26, textDecoration: "none" }}>
                  Agenda tu asesoría →
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "clamp(30px,3.6vw,42px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ height: 1, flex: 1, background: "rgba(58,44,34,.14)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: "#7c6a58", whiteSpace: "nowrap" }}>TAMBIÉN TRAMITAMOS TU VISA PARA</span>
              <span style={{ height: 1, flex: 1, background: "rgba(58,44,34,.14)" }} />
            </div>
            <div style={{ display: "flex", gap: "clamp(14px,2vw,20px)", flexWrap: "wrap" }}>
              {paisesCompactos.map((p) => (
                <div key={p.pais} style={{ flex: "1 1 240px", background: "#fdf9f0", border: "1px solid rgba(58,44,34,.08)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={`https://flagcdn.com/w80/${p.flag}.png`} alt={p.pais} style={{ width: 38, height: "auto", borderRadius: 3, boxShadow: "0 2px 6px rgba(0,0,0,.18)" }} />
                    <div>
                      <div style={{ fontFamily: "'Marcellus',serif", fontSize: 20, color: "#14514f" }}>{p.pais}</div>
                      <div style={{ fontSize: 12, color: "#9a8a76" }}>Asesoría y trámite de visa</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: "auto" }}>
                    <a href={WOMPI_US} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#bd5a34", color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "10px 18px", borderRadius: 22, textDecoration: "none" }}>
                      <CardIcon size={15} />Pagar ya
                    </a>
                    <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", color: "#14514f", fontSize: 12.5, fontWeight: 700, padding: "10px 6px", textDecoration: "none" }}>Asesoría →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#9a8a76", textAlign: "center", margin: "22px 0 0" }}>
            *Los valores corresponden a nuestra asesoría de trámite. Tarifas consulares, de embajada o de terceros no están incluidas.
          </p>
        </div>
      </section>

      {/* PAQUETES */}
      <section id="paquetes" style={{ background: "#efe4d2", padding: "clamp(52px,8vw,80px) 0" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(20px,5vw,46px)" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(30px,4vw,46px)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".3em", color: "#bd5a34", marginBottom: 14 }}>PAQUETES A EUROPA · SALIDAS DESDE BOGOTÁ</div>
            <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.08, margin: 0, color: "#14514f" }}>Circuitos para vivir Europa, no solo verla.</h2>
            <p style={{ fontSize: "clamp(14px,1.6vw,16px)", color: "#7c6a58", margin: "14px auto 0", maxWidth: 560, lineHeight: 1.6 }}>Vuelos, hoteles seleccionados, traslados y tours con guías en español. Todo incluido y sin letra pequeña.</p>
          </div>
          <div style={{ display: "flex", gap: "clamp(16px,2.4vw,24px)", flexWrap: "wrap" }}>
            {paquetes.map((p) => (
              <div key={p.titulo} style={{ flex: "1 1 300px", background: "#fdf9f0", borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 34px rgba(58,44,34,.1)" }}>
                <div style={{ position: "relative", height: 170 }}>
                  <img src={p.img} alt={p.titulo} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {p.destacado && (
                    <span style={{ position: "absolute", top: 12, left: 12, background: "#bd5a34", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: ".08em", padding: "5px 11px", borderRadius: 20 }}>MÁS VENDIDO</span>
                  )}
                </div>
                <div style={{ padding: "clamp(20px,2.4vw,26px)" }}>
                  <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.4vw,26px)", color: "#14514f" }}>{p.titulo}</div>
                  <div style={{ fontSize: 12.5, color: "#9a8a76", margin: "7px 0 14px" }}>{p.sub}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: "#14514f", background: "#e5efe9", padding: "4px 10px", borderRadius: 20 }}>✈ Vuelos</span>
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: "#14514f", background: "#e5efe9", padding: "4px 10px", borderRadius: 20 }}>🏨 Hoteles</span>
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: "#14514f", background: "#e5efe9", padding: "4px 10px", borderRadius: 20 }}>🎟 Tours</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderTop: "1px solid rgba(58,44,34,.1)", paddingTop: 16 }}>
                    <div>
                      <span style={{ fontSize: 11, color: "#9a8a76" }}>Desde</span><br />
                      <span style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.6vw,27px)", color: "#bd5a34" }}>{p.precio}</span>
                    </div>
                    <a href={WA} target="_blank" rel="noreferrer" style={{ background: "#14514f", color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "11px 20px", borderRadius: 24, textDecoration: "none" }}>Ver itinerario</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "clamp(28px,3.5vw,40px)" }}>
            <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-block", color: "#14514f", fontSize: 14, fontWeight: 700, borderBottom: "2px solid #e0a94a", paddingBottom: 3, textDecoration: "none" }}>¿Buscas otro destino? Armamos tu viaje a la medida →</a>
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section id="viajeros" style={{ background: "#f7f0e4", padding: "clamp(52px,8vw,80px) 0" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(20px,5vw,46px)" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(30px,4vw,44px)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".3em", color: "#bd5a34", marginBottom: 14 }}>HISTORIAS REALES</div>
            <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(26px,3.6vw,42px)", lineHeight: 1.08, margin: 0, color: "#14514f" }}>Confían en nosotros para el viaje de su vida.</h2>
          </div>
          <div style={{ display: "flex", gap: "clamp(16px,2.4vw,22px)", flexWrap: "wrap", marginBottom: "clamp(30px,4vw,42px)" }}>
            {[
              { q: "Nos organizaron todo Europa y la visa de Estados Unidos. Viajamos tranquilos, sin una sola sorpresa.", init: "R", grad: "linear-gradient(135deg,#bd5a34,#e0a94a)", name: "Familia Rodríguez", meta: "Bogotá · Europa Fantástica 2025" },
              { q: "Me habían negado la visa antes. Con su asesoría preparé la entrevista y esta vez la aprobaron.", init: "A", grad: "linear-gradient(135deg,#14514f,#2c8a86)", name: "Andrés M.", meta: "Visa Americana aprobada · 2025" },
              { q: "Atención cercana y honesta. Respondían cada duda por WhatsApp, incluso los fines de semana.", init: "C", grad: "linear-gradient(135deg,#a04726,#bd5a34)", name: "Carolina & Julián", meta: "Bogotá · Euro Leyendas 2024" },
            ].map((t) => (
              <div key={t.name} style={{ flex: "1 1 300px", background: "#fdf9f0", borderRadius: 18, padding: "clamp(22px,2.6vw,30px)", border: "1px solid rgba(58,44,34,.07)" }}>
                <div style={{ color: "#e0a94a", letterSpacing: 2, marginBottom: 14, fontSize: 15 }}>★★★★★</div>
                <p style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(17px,2vw,20px)", lineHeight: 1.5, color: "#3a2c22", margin: "0 0 20px" }}>&quot;{t.q}&quot;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: t.grad, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Marcellus',serif", fontSize: 18 }}>{t.init}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#14514f" }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: "#9a8a76" }}>{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(28px,6vw,64px)", flexWrap: "wrap", borderTop: "1px solid rgba(58,44,34,.12)", paddingTop: "clamp(28px,3.5vw,38px)" }}>
            {[["+12", "AÑOS DE EXPERIENCIA"], ["+2.400", "VIAJEROS FELICES"], ["+800", "VISAS APROBADAS"], ["25+", "DESTINOS EN EUROPA"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(30px,4vw,42px)", color: "#14514f" }}>{n}</div>
                <div style={{ fontSize: 11, letterSpacing: ".12em", color: "#9a8a76" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "linear-gradient(135deg,#14514f,#0e3d3b)", padding: "clamp(56px,9vw,90px) 0", textAlign: "center", color: "#eaf3f1" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px,5vw,46px)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".3em", color: "#e7c8a0", marginBottom: 16 }}>EMPIEZA HOY</div>
          <h2 style={{ fontFamily: "'Marcellus',serif", fontSize: "clamp(30px,4.6vw,50px)", lineHeight: 1.1, margin: 0, color: "#fff" }}>¿Listo para tu próximo viaje? Hablemos hoy.</h2>
          <p style={{ fontSize: "clamp(14px,1.7vw,16px)", color: "#c5ddd9", margin: "20px auto 34px", maxWidth: 500, lineHeight: 1.6 }}>Cuéntanos a dónde sueñas ir. Te respondemos por WhatsApp con un plan a tu medida, sin compromiso.</p>
          <a href={WA} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: "#128c4a", color: "#fff", fontSize: "clamp(15px,1.8vw,17px)", fontWeight: 700, padding: "18px clamp(28px,3.4vw,40px)", borderRadius: 34, boxShadow: "0 14px 34px rgba(0,0,0,.32)", textDecoration: "none" }}>
            <WhatsIcon size={21} />Escríbenos por WhatsApp
          </a>
          <div style={{ fontSize: 12.5, color: "#9fc0bb", marginTop: 22 }}>+57 313 488 3629 · Bogotá, Colombia</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0e3d3b", padding: "clamp(36px,5vw,52px) 0 26px" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(20px,5vw,46px)", display: "flex", gap: "clamp(24px,5vw,60px)", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
              <img src="/logo-wonderlust.png" alt="" style={{ width: 38, height: 38, objectFit: "contain" }} />
              <span style={{ fontFamily: "'Marcellus',serif", fontSize: 19, letterSpacing: ".16em", color: "#e7c8a0" }}>WONDERLUST</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a8c0bc", margin: 0 }}>Agencia de viajes en Bogotá. Paquetes a Europa y consultoría de visas a USA y Canadá, con acompañamiento de principio a fin.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: "#e7c8a0", marginBottom: 14 }}>EXPLORA</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5 }}>
              <a href="#visas" style={{ color: "#c5ddd9", textDecoration: "none" }}>Visas USA y Canadá</a>
              <a href="#paquetes" style={{ color: "#c5ddd9", textDecoration: "none" }}>Paquetes a Europa</a>
              <a href="#viajeros" style={{ color: "#c5ddd9", textDecoration: "none" }}>Historias de viajeros</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: "#e7c8a0", marginBottom: 14 }}>CONTACTO</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#c5ddd9" }}>
              <a href={WA} target="_blank" rel="noreferrer" style={{ color: "#c5ddd9", textDecoration: "none" }}>WhatsApp · +57 313 488 3629</a>
              <span>Bogotá, Colombia</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1220, margin: "26px auto 0", padding: "20px clamp(20px,5vw,46px) 0", borderTop: "1px solid rgba(231,200,160,.16)", fontSize: 11.5, color: "#7ea19c" }}>
          © 2026 Wonderlust by Villamor S.A.S · Registro Nacional de Turismo · Todos los derechos reservados.
        </div>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a href={WA} target="_blank" rel="noreferrer" title="Escríbenos por WhatsApp" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 90, width: 60, height: 60, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 26px rgba(37,211,102,.5)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.463 3.488" /></svg>
      </a>
    </main>
  );
}
