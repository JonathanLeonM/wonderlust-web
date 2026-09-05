// app/devolucion-pasaportes/layout.tsx

const TITULO = "Devolución de pasaportes | Wonderlust";
const DESCRIPCION =
  "Consulta el estado de tu visa y elige cómo quieres recibir tu pasaporte.";
// Cambia esta ruta por la imagen que quieras que aparezca en WhatsApp.
// Debe vivir en /public (ej: public/og/devolucion.jpg) y ser 1200x630 px.
const IMAGEN = "https://wonderslust.com/og/devolucion.jpg";

export const metadata = {
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: "https://wonderslust.com/devolucion-pasaportes",
    siteName: "Wonderlust",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: IMAGEN,
        width: 1200,
        height: 630,
        alt: "Devolución de pasaportes Wonderlust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: [IMAGEN],
  },
};

export default function Layout(props: any) {
  return props.children;
}
