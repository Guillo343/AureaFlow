import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-150px 0px -150px 0px",
  });

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#0f0f0f] to-[#181818] text-white">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 slide-up">
            Welcome to <span className="text-indigo-400">AureaFlow</span>
          </h1>

          <p className="text-xl max-w-2xl mx-auto opacity-80 mb-8 fade-in">
            Your financial peace starts with clarity. Track income, expenses,
            savings — effortlessly.
          </p>

          <button className="btn-primary hover-scale-md">Get Started</button>
        </motion.div>
      </section>
      {/* Scroll Section */}
      <section
        ref={sectionRef}
        className="section flex items-center justify-center container-main"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-semibold text-center shadow-soft p-8 rounded-2xl hover-lift hover-scale-sm bg-[#151515]"
        >
          Smart tools for managing your money
        </motion.div>
      </section>
    </div>
  );
}
