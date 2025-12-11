import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 px-6 text-center bg-gray-900 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Ready to Start Your Financial Journey?
      </motion.h2>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-3 bg-blue-600 rounded-lg font-medium shadow-lg"
      >
        Create Your Account
      </motion.button>
    </section>
  );
}
