import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Enacero — Encuentro Acerero MX · Distribución de Acero B2B",
  description:
    "Distribución de acero estructural, comercial, plano y de refuerzo para construcción e industria en México.",
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
