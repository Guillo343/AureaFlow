import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  const MotionLink = motion.create(Link);
  return (
    <section className="py-24 px-6 text-center bg-gray-900 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6">
        Ready to Start Your Financial Journey?
      </motion.h2>

      <MotionLink
        to="/signup"
        aria-label="Get started with AureaFlow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-mediumbg-violet-600 text-white
                   shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500">
        Create your account for FREE!
      </MotionLink>
    </section>
  );
}
