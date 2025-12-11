import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4"
      >
        Take Control of Your Money
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg max-w-2xl text-gray-600 mb-8"
      >
        AureaFlow helps you track income, manage expenses, set savings goals,
        and build lasting financial peace.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg"
      >
        Get Started
      </motion.button>
    </section>
  );
}
