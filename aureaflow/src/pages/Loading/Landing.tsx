import Hero from "../Landing/HeroSection";
import Features from "../Landing/FeaturesSection";
import Stats from "../Landing/StatsSection";
import CTA from "../Landing/CTASection";

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
