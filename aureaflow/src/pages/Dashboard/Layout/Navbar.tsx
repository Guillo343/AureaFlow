import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="h-16 bg-[#111111] border-b border-white/10 flex items-center justify-between px-6 text-white">
      {/* Page Title */}
      <motion.h3
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold tracking-wide"
      >
        Dashboard
      </motion.h3>

      {/* User Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
          G
        </div>
        <span className="opacity-80">Guillermo</span>
      </motion.div>
    </header>
  );
}
