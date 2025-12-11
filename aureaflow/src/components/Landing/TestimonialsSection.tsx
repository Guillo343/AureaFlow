import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 border rounded-xl shadow bg-white text-center"
      >
        <p className="text-gray-600 italic">
          “AureaFlow made managing my finances easier than ever.”
        </p>
        <span className="mt-4 block font-semibold">— Future User</span>
      </motion.div>
    </section>
  );
}
