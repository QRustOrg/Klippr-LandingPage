import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PainPointsSection } from "@/components/PainPointsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PainPointsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SocialProofSection />
      <ComparisonSection />
      <Footer />
    </>
  );
}
