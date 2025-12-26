import { motion } from "framer-motion";

export default function ShowcaseSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }} className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Your Money, Clearly Organized</h2>

        <div className="w-full h-[400px] rounded-xl border shadow bg-white flex items-center justify-center">
          {/* Aquí luego pondremos una imagen del dashboard */}
          <p className="text-gray-400 text-lg">Dashboard Preview Coming Soon</p>
        </div>
      </motion.div>
    </section>
  );
}
