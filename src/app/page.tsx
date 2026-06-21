import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VideoSection } from "@/components/VideoSection";
import { PainPointsSection } from "@/components/PainPointsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Klippr — Descuentos reales. Canjes seguros.",
  description:
    "Klippr conecta tu negocio favorito con un QR único e irrepetible. Escanea, ahorra y comparte tu experiencia.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <VideoSection />
      <PainPointsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SocialProofSection />
      <ComparisonSection />
      <Footer />
    </>
  );
}
