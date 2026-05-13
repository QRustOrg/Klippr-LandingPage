import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Montserrat } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import "./globals.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Klippr — Descuentos reales. Canjes seguros.",
    template: "%s | Klippr",
  },
  description:
    "Klippr conecta tu negocio favorito con un QR único e irrepetible. Escanea, ahorra y comparte tu experiencia. Promociones verificadas para consumidores y métricas claras para negocios.",
  keywords: [
    "Klippr",
    "descuentos",
    "cupones digitales",
    "cupones QR",
    "código QR promocional",
    "canje seguro",
    "ofertas locales",
    "promociones restaurantes",
    "fidelización clientes",
    "marketing local",
    "anti fraude cupones",
    "descuentos app",
    "Klippr B2B",
    "redenciones",
    "QR único",
  ],
  authors: [{ name: "Klippr" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}
