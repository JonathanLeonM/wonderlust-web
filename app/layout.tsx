import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wonderlust | Agencia de viajes y visas en Bogotá",
  description:
    "Visas, paquetes y tiquetes con asesoría personalizada. Estados Unidos, Canadá, China, Costa Rica y Japón. Bogotá, Colombia.",
  icons: {
    icon: "/logo-wonderlust.png",
    apple: "/logo-wonderlust.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Marcellus&family=Karla:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
