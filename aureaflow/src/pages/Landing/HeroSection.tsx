import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-6">
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(139,92,246,0.15),
              transparent 60%
            )`,}}
      />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold mb-6">
            Take Control of Your{" "}
            <span className="text-violet-400">Money</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-gray-400 max-w-xl mb-10">
            AureaFlow helps you track income, manage expenses, visualize your
            progress, and build financial clarity with confidence.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block">
            <Link
              to="/signup"
              className="
                px-8 py-4 rounded-xl font-medium
                bg-violet-600 text-white
                shadow-lg shadow-violet-600/40
                hover:bg-violet-500 transition">
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Right: Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="
              rounded-2xl bg-[#151515]/90 backdrop-blur-xl
              border border-white/10
              shadow-[0_0_40px_rgba(139,92,246,0.2)]
              p-6">
            {/* Fake widgets */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-20 rounded-xl bg-white/5" />
              <div className="h-20 rounded-xl bg-white/5" />
              <div className="h-20 rounded-xl bg-white/5" />
            </div>

            {/* Fake chart */}
            <div className="h-40 rounded-xl bg-white/5 flex items-end gap-3 p-4">
              {[40, 70, 55, 90, 65].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="w-full rounded-md bg-violet-500/80"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
