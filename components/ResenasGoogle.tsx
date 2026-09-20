// → components/ResenasGoogle.tsx
"use client";

import { useEffect, useState } from "react";

const NAVY = "#002060";
const INK = "#0b1526";
const GOLD = "#c8892a";
const LINE = "rgba(11,21,38,.09)";
const MUTED = "#5d6673";

type Review = {
  rating: number;
  text: string;
  when: string;
  author: string;
  photo: string;
  url: string;
};

// Se muestran mientras cargan las de Google, o si la API no responde.
const FALLBACK: Review[] = [
  { rating: 5, text: "Nos organizaron todo Europa y la visa de Estados Unidos. Viajamos tranquilos, sin una sola sorpresa.", when: "Familia Rodríguez", author: "Familia Rodríguez", photo: "", url: "" },
  { rating: 5, text: "Me habían negado la visa antes. Con su asesoría preparé la entrevista y esta vez la aprobaron.", when: "Visa aprobada", author: "Andrés M.", photo: "", url: "" },
  { rating: 5, text: "Atención cercana y honesta. Respondían cada duda por WhatsApp, incluso los domingos.", when: "Euro Leyendas", author: "Carolina & Julián", photo: "", url: "" },
];

const AV_BG = [GOLD, NAVY, INK];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ fontSize: 14, color: "#e0a521", letterSpacing: ".14em", marginBottom: 14 }}>
      {"★★★★★".slice(0, Math.round(n))}
    </div>
  );
}

export default function ResenasGoogle() {
  const [data, setData] = useState<{ rating: number | null; total: number; reviews: Review[] } | null>(null);

  useEffect(() => {
    fetch("/api/resenas")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && d.reviews?.length) setData(d);
      })
      .catch(() => {});
  }, []);

  const reviews = data?.reviews?.length ? data.reviews.slice(0, 4) : FALLBACK;
  const real = Boolean(data?.reviews?.length);

  return (
    <>
      {real && data?.rating ? (
        <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 2 }}>
          <div style={{ fontSize: "clamp(38px,5vw,54px)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 1, color: INK }}>
            {data.rating.toFixed(1)}
          </div>
          <div>
            <div style={{ fontSize: 17, color: "#e0a521", letterSpacing: ".14em", lineHeight: 1 }}>
              {"★★★★★".slice(0, Math.round(data.rating))}
            </div>
            <div style={{ fontSize: 13.5, color: MUTED, fontWeight: 400, marginTop: 6 }}>
              {data.total} {data.total === 1 ? "reseña" : "reseñas"} en Google
            </div>
          </div>
        </div>
      ) : null}

      {reviews.map((t, i) => (
        <div
          key={t.author + i}
          style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: "clamp(22px,2.8vw,32px)", display: "flex", flexDirection: "column" }}
        >
          <Stars n={t.rating} />
          <blockquote style={{ margin: 0, fontSize: "clamp(15px,1.5vw,16.5px)", lineHeight: 1.65, color: INK, fontWeight: 300, textWrap: "pretty", display: "-webkit-box", WebkitLineClamp: 9, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            “{t.text}”
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", paddingTop: 22 }}>
            {t.photo ? (
              <img
                src={t.photo}
                alt=""
                width={42}
                height={42}
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
            ) : (
              <div
                style={{ width: 42, height: 42, borderRadius: "50%", background: AV_BG[i % 3], color: "#fff", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 700, flexShrink: 0 }}
              >
                {t.author.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-.01em" }}>{t.author}</div>
              <div style={{ fontSize: 12.5, color: "#8b93a1", fontWeight: 400, marginTop: 2 }}>
                {real ? `Google · ${t.when}` : t.when}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
