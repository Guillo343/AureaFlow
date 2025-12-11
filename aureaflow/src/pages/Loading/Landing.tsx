import Hero from "../../components/Landing/HeroSection";
import Features from "../../components/Landing/FeaturesSection";
import Stats from "../../components/Landing/StatsSection";
import CTA from "../../components/Landing/CTASection";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#0f0f0f] to-[#181818] text-white">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
}
