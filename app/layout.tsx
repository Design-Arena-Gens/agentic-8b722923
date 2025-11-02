import "./globals.css";
import type { Metadata } from "next";

const title = "Consulta RUC Perú | SUNAT";
const description =
  "Guía interactiva para consultar RUC y razón social en Perú, con integración al servicio oficial de la SUNAT y APIs externas.";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/sunat.svg",
  },
  openGraph: {
    title,
    description,
    url: "https://agentic-8b722923.vercel.app",
    siteName: title,
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
