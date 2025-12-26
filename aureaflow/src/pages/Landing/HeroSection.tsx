import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-bold mb-4">
        Take Control of Your Money
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-lg max-w-2xl text-gray-600 mb-8">
        AureaFlow helps you track income, manage expenses, set savings goals,
        and build lasting financial peace.
      </motion.p>

      <MotionLink
        to="/signup"
        aria-label="Get started with AureaFlow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-violet-600 text-white
                   shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500">
        Get Started
      </MotionLink>
    </section>
  );
}
