import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className=" p-8 bg-[#0f0f0f] border-t border-white/10">
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}
        className="container-main py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-white font-semibold text-base">
            AureaFlow
          </span>
          <span className="text-xs text-gray-500 mt-1">
            Building financial clarity.
          </span>
        </div>

        <div className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} AureaFlow  
          <span className="mx-2">•</span>
          Early access
        </div>
      </motion.div>
    </footer>
  );
}
