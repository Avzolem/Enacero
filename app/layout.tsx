import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://enacero.vercel.app"),
  title: "Enacero — Encuentro Acerero MX · Distribución de Acero B2B",
  description:
    "Distribución y suministro de aceros planos, perfiles estructurales y aceros de refuerzo para construcción, industria y estructuras metálicas en México.",
  keywords: [
    "acero",
    "distribución de acero",
    "aceros planos",
    "perfiles estructurales",
    "varilla",
    "lámina galvanizada",
    "viga IPR",
    "construcción",
    "CDMX",
    "Encuentro Acerero MX",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://enacero.vercel.app",
    siteName: "Enacero — Encuentro Acerero MX",
    title: "Enacero — Encuentro Acerero MX · Distribución de Acero B2B",
    description:
      "Acero que mueve proyectos. Distribución de aceros planos, perfiles estructurales y de refuerzo en México.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enacero — Encuentro Acerero MX",
    description:
      "Acero que mueve proyectos. Distribución de acero para construcción e industria en México.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
