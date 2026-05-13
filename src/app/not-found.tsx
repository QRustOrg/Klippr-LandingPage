import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o fue movida. Vuelve al inicio de Klippr para descubrir descuentos con canje seguro por QR.",
  keywords: [
    "Klippr",
    "404",
    "descuentos",
    "cupones QR",
    "inicio Klippr",
  ],
  authors: [{ name: "Klippr" }],
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#7161ef]">
        Error 404
      </p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-white">
        No encontramos esta página
      </h1>
      <p className="text-[#6b7280] dark:text-gray-400">
        Comprueba la URL o regresa al inicio para seguir explorando Klippr.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#7161ef] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f52d4]"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
