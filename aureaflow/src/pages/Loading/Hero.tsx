import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center container-main">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to <span className="text-indigo-400">AureaFlow</span>
        </h1>

        <p className="text-xl max-w-2xl mx-auto opacity-80 mb-8">
          Your financial peace starts with clarity. Track income, expenses and savings effortlessly.
        </p>

        <button className="btn-primary hover-scale-md">Get Started</button>
      </motion.div>
    </section>
  );
}
