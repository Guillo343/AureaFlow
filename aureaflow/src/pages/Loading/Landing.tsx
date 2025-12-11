import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="w-full min-h-screen">
      {/* Hero section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold">Welcome to AureaFlow</h1>
      </section>

      {/* Content appears when scrolling */}
      <section
        ref={sectionRef}
        className="h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl"
        >
          Smart tools for managing your money
        </motion.div>
      </section>
    </div>
  );
}
