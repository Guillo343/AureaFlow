import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="py-28 px-6 text-center">
      <motion.h2
        id="cta-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4">
        Take control of your finances today
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-gray-400 mb-10">
        Track expenses, plan goals, and understand your money —
        all in one calm, focused dashboard.
      </motion.p>

      <MotionLink
        to="/signup"
        aria-label="Create a free AureaFlow account"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center
                   px-8 py-4 rounded-xl font-medium
                   bg-violet-600 text-white
                   shadow-lg shadow-violet-600/30
                   hover:bg-violet-500 transition">
        Get started for free
      </MotionLink>

      <p className="mt-4 text-sm text-gray-500">
        No credit card required
      </p>
    </section>
  );
}
