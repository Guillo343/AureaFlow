import { useEffect, useState } from "react";

import Hero from "../Landing/HeroSection";
import Features from "../Landing/FeaturesSection";
import Stats from "../Landing/StatsSection";
import CTA from "../Landing/CTASection";

export default function LandingPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-b from-[#0f0f0f] to-[#181818] text-white">
      
      {/* Mouse light background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(
            600px at ${mouse.x}px ${mouse.y}px,
            rgba(139, 92, 246, 0.12),
            transparent 70%
          )`,}}
      />

      {/* Page content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </div>
    </div>
  );
}
