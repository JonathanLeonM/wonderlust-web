/**
 * Wonderlust · Guía viaje a China (Alipay, pagos y equipaje)
 * Ruta: app/guia-alipay/page.tsx  →  wviajes.co/guia-alipay
 * Imágenes: public/guia-china/01.jpg … 26.jpg  (las 26 diapositivas originales)
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guía viaje a China: Alipay, pagos y equipaje | Wonderlust",
  description: "Presentación pre-viaje: cómo configurar y pagar con Alipay, WeChat, efectivo, documentos, equipaje de mano y la regla de power banks en China.",
};

const WA = "https://wa.me/573134883629";
const PDF = "https://drive.google.com/file/d/13l9mQPHELmIM19rDyPmGG7wK2qUrqCfZ/view?usp=sharing";
const NAVY = "#002060", INK = "#0b1526", GOLD = "#c8892a";

const ALT = ["Reunión informativa pre-viaje China 2026", "Bienvenidos a China 2026: temas", "Documentos importantes", "¿Debo llevar efectivo?", "Alipay: para qué sirve", "Paso a paso: configurar Alipay", "Paso a paso: descargar Alipay y aceptar términos", "Paso a paso: registro con correo y verificación", "Paso a paso: código de verificación por correo", "Paso a paso: cuenta creada, ir a Bank Card", "Paso a paso: agregar tarjeta bancaria", "Paso a paso: autorizar en el banco y crear contraseña de pago", "Paso a paso: Alipay listo, código para pagar", "¿Cómo pagar con Alipay?", "¿Y si Alipay no acepta mi tarjeta?", "WeChat: otra opción de pago", "¿Qué llevar en el morral o maleta de cabina?", "Líquidos en el equipaje de mano", "Botella para agua", "Snacks para el viaje", "Una muda de ropa", "Medicamentos básicos", "Regla especial en China: power banks", "Siempre contigo", "¿Qué ropa llevar?", "Gracias"];
const IDS: Record<number, string> = { 3: "documentos", 4: "efectivo", 5: "alipay", 6: "paso-a-paso", 14: "pagar", 15: "tarjeta", 16: "wechat", 17: "equipaje", 23: "powerbank", 25: "ropa" };
const INDICE: [string, string][] = [["Documentos", "documentos"], ["Efectivo", "efectivo"], ["Alipay", "alipay"], ["Paso a paso", "paso-a-paso"], ["Cómo pagar", "pagar"], ["Si no acepta mi tarjeta", "tarjeta"], ["WeChat", "wechat"], ["Equipaje de mano", "equipaje"], ["Power banks", "powerbank"], ["Ropa", "ropa"]];

const wrap = { maxWidth: 1080, margin: "0 auto" } as const;

export default function GuiaAlipay() {
  return (
    <div id="top" style={{ background: "#f8f8f5", color: INK, minHeight: "100vh", fontFamily: "'Outfit', system-ui, sans-serif", overflowX: "hidden", scrollBehavior: "smooth" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(251,250,247,.94)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(11,21,38,.09)" }}>
        <div style={{ ...wrap, padding: "12px clamp(16px,3.5vw,44px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: INK, textDecoration: "none" }}>
            <img src="/logo-wonderlust.webp" alt="Wonderlust" width={34} height={34} style={{ width: 34, height: 34, objectFit: "contain", display: "block" }} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.08 }}>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.035em" }}>Wonderlust</span>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".2em", color: "#8b93a1" }}>WVIAJES.CO</span>
            </span>
          </a>
          <a href={WA} target="_blank" rel="noopener" style={{ background: NAVY, color: "#fff", fontSize: 14, fontWeight: 600, padding: "11px 18px", borderRadius: 12, textDecoration: "none" }}>Dudas por WhatsApp</a>
        </div>
      </header>

      <section style={{ ...wrap, padding: "clamp(32px,5vw,56px) clamp(16px,3.5vw,44px) clamp(20px,3vw,28px)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", color: GOLD }}>GUÍA GRATUITA · VIAJE A CHINA</div>
        <h1 style={{ fontSize: "clamp(30px,5vw,50px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.04, margin: "12px 0 0", maxWidth: "18ch", textWrap: "pretty", color: NAVY }}>Alipay, pagos y equipaje para tu viaje a China</h1>
        <p style={{ fontSize: "clamp(15.5px,1.7vw,18px)", lineHeight: 1.55, fontWeight: 300, color: "#3c4452", margin: "12px 0 0", maxWidth: "56ch", textWrap: "pretty" }}>Nuestra presentación pre-viaje completa. Toca cualquier diapositiva para verla en grande.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
          <a href={PDF} target="_blank" rel="noopener" style={{ background: GOLD, color: "#fff", fontSize: 14.5, fontWeight: 700, padding: "12px 18px", borderRadius: 12, textDecoration: "none" }}>Descargar en PDF</a>
        </div>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {INDICE.map(([t, id]) => (
            <a key={id} href={`#${id}`} style={{ fontSize: 13.5, fontWeight: 500, color: NAVY, textDecoration: "none", background: "#fff", border: "1px solid rgba(11,21,38,.12)", borderRadius: 999, padding: "8px 14px" }}>{t}</a>
          ))}
        </nav>
      </section>

      <main style={{ ...wrap, padding: "0 clamp(12px,3.5vw,44px) clamp(48px,7vw,88px)", display: "flex", flexDirection: "column", gap: "clamp(12px,2vw,22px)" }}>
        {ALT.map((alt, i) => {
          const n = String(i + 1).padStart(2, "0");
          const src = `/guia-china/${n}.jpg`;
          return (
            <a key={n} id={IDS[i + 1] || `d${n}`} href={src} target="_blank" rel="noopener" style={{ display: "block", scrollMarginTop: 72, borderRadius: "clamp(10px,1.4vw,16px)", overflow: "hidden", background: "#eef1f7", boxShadow: "0 1px 2px rgba(11,21,38,.06),0 8px 28px rgba(11,21,38,.08)", aspectRatio: "1672 / 941" }}>
              <img src={src} alt={alt} loading={i < 2 ? "eager" : "lazy"} decoding="async" width={1672} height={941} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </a>
          );
        })}

        <section style={{ marginTop: "clamp(16px,3vw,32px)", background: NAVY, color: "#fff", borderRadius: 24, padding: "clamp(26px,4.5vw,44px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ minWidth: 0, flex: "1 1 300px" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.1, margin: 0 }}>¿Te quedó alguna duda?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, fontWeight: 300, color: "rgba(255,255,255,.84)", margin: "8px 0 0" }}>Escríbenos y te ayudamos a configurar Alipay antes de tu viaje.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href={WA} target="_blank" rel="noopener" style={{ background: GOLD, color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 22px", borderRadius: 12, textDecoration: "none" }}>Escribir por WhatsApp</a>
            <a href="/visa-china" style={{ background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 15, fontWeight: 600, padding: "14px 22px", borderRadius: 12, textDecoration: "none" }}>Tramitar visa China</a>
          </div>
        </section>
      </main>
    </div>
  );
}
