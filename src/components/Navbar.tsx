"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KlipprScissorsIcon, GithubIcon } from "./icons";
import { useTranslation } from "@/i18n/useTranslation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dict } = useTranslation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "relative flex items-center justify-between transition-all duration-500 mx-auto",
          isScrolled
            ? "w-[95%] md:w-[65%] mt-4 px-4 md:px-6 py-3 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04),0_0_0_1px_#e5e7eb]"
            : "w-full px-4 md:px-10 py-4 bg-white/80 backdrop-blur-sm"
        )}
      >
        {/* Left */}
        <div className="flex items-center gap-6 z-10">
          <Link href="/" className="flex items-center gap-2">
            <KlipprScissorsIcon className="w-7 h-7 text-[#7161ef]" />
            <span className="text-[18px] font-bold text-[#1a1a1a] tracking-tight">Klippr</span>
          </Link>
        </div>

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
          <nav className="flex items-center gap-4 lg:gap-5">
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, "hero")}
              className="text-[13px] lg:text-sm font-medium text-[#6b7280] hover:text-[#7161ef] transition-colors duration-150"
            >
              {dict.navbar.home}
            </a>
            <a
              href="#pain-points"
              onClick={(e) => scrollToSection(e, "pain-points")}
              className="text-[13px] lg:text-sm font-medium text-[#6b7280] hover:text-[#7161ef] transition-colors duration-150"
            >
              {dict.navbar.problem}
            </a>
            <a
              href="#beneficios"
              onClick={(e) => scrollToSection(e, "beneficios")}
              className="text-[13px] lg:text-sm font-medium text-[#6b7280] hover:text-[#7161ef] transition-colors duration-150"
            >
              {dict.navbar.benefits}
            </a>
            <a
              href="#testimonios"
              onClick={(e) => scrollToSection(e, "testimonios")}
              className="text-[13px] lg:text-sm font-medium text-[#6b7280] hover:text-[#7161ef] transition-colors duration-150"
            >
              {dict.navbar.testimonials}
            </a>
            <a
              href="#comparacion"
              onClick={(e) => scrollToSection(e, "comparacion")}
              className="text-[13px] lg:text-sm font-medium text-[#6b7280] hover:text-[#7161ef] transition-colors duration-150"
            >
              {dict.navbar.comparison}
            </a>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 z-10">
          <Link
            href="https://github.com/QRustOrg/Klippr-LandingPage"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[#6b7280] hover:text-[#1a1a1a] transition-colors duration-150 p-2 rounded-full hover:bg-[#f3f4f6]"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-5 h-5" />
          </Link>
          <a
            href="#como-funciona"
            onClick={(e) => scrollToSection(e, "como-funciona")}
            className="text-sm font-semibold text-white bg-[#1a1a1a] rounded-full px-5 py-2 hover:bg-[#333333] transition-colors duration-150 shadow-sm"
          >
            {dict.navbar.howItWorks}
          </a>
        </div>
      </div>
    </div>
  );
}
