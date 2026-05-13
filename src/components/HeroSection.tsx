"use client";

import Image from "next/image";
import { KlipprScissorsIcon } from "./icons";
import { useTranslation } from "@/i18n/useTranslation";

function scrollToSection4() {
  const el = document.getElementById("para-negocios");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function HeroSection() {
  const { dict } = useTranslation();
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white dark:bg-[#0F0F1A]"
    >
      {/* ── Dark-mode radial gradient overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #7161ef33 0%, #0F0F1A 70%)",
        }}
      />

      {/* ── Subtle light-mode background accent ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 50%, #7161ef0d 0%, transparent 70%)",
        }}
      />

      {/* ── Main container ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

          {/* ══════════════════ LEFT COLUMN ══════════════════ */}
          <div className="flex flex-col items-start gap-6 lg:w-[55%] animate-fade-in-up">

            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <KlipprScissorsIcon className="w-10 h-10 md:w-12 md:h-12" />
              <span className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight text-[#1a1a1a] dark:text-white">
                Klippr
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-heading text-[28px] md:text-[48px] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] dark:text-white m-0">
              {dict.hero.headline1}{" "}
              <span className="text-[#7161ef]">{dict.hero.headline2}</span>{" "}
              {dict.hero.headline3}
            </h1>

            {/* Subheadline */}
            <p className="text-[16px] md:text-[18px] leading-relaxed text-[#6b7280] dark:text-white/75 max-w-[500px]">
              {dict.hero.subtitle}
            </p>

            {/* ── CTA block ── */}
            <div className="flex flex-col items-start gap-4 w-full">
              {/* Primary CTA */}
              <button
                id="hero-cta-explore"
                type="button"
                className="font-heading flex items-center gap-2 bg-[#7161ef] hover:bg-[#5d4edf] active:scale-[0.98] text-white font-semibold rounded-full px-7 py-3.5 text-[15px] shadow-lg shadow-[#7161ef]/30 transition-all duration-200 w-full md:w-auto justify-center"
              >
                {dict.hero.ctaPrimary}
              </button>

              {/* Secondary text link */}
              <button
                id="hero-cta-businesses"
                type="button"
                onClick={scrollToSection4}
                className="text-[14px] md:text-[15px] text-[#6b7280] dark:text-white/70 underline underline-offset-4 hover:text-[#7161ef] dark:hover:text-white transition-colors duration-150 bg-transparent border-none cursor-pointer p-0 text-left"
              >
                {dict.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* ══════════════════ RIGHT COLUMN ══════════════════ */}
          <div className="relative flex justify-center mt-10 lg:mt-0 lg:w-[45%]">
            <Image
              src="/klippr/klippr-hero.png"
              alt={dict.hero.imageAlt}
              width={400}
              height={520}
              priority
              className="w-full max-w-[280px] md:max-w-[380px] xl:max-w-[400px] h-auto"
            />
          </div>

        </div>
      </div>

      {/* Bottom fade for light mode so it blends into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 dark:hidden"
        style={{
          background: "linear-gradient(to bottom, transparent, white)",
        }}
      />
    </section>
  );
}


