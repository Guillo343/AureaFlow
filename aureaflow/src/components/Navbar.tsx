import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          w-full max-w-6xl
          rounded-2xl
          backdrop-blur-xl
          bg-black/40
          border border-white/10
          shadow-[0_0_30px_rgba(139,92,246,0.15)]
        ">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-wide text-white">
            Aurea<span className="text-violet-400">Flow</span>
          </Link>

          {/* Right side */}
          {!user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                className="
                  relative px-6 py-2.5 rounded-xl
                  font-medium text-white
                  bg-violet-600
                  shadow-lg shadow-violet-600/30
                  hover:bg-violet-500
                  transition-colors">
                Get Started
              </Link>
            </motion.div>
          ) : (
            <Link
              to="/dashboard"
              className="
                flex items-center gap-3
                text-sm text-gray-200
                hover:text-white transition">
              <div
                className="
                  w-9 h-9 rounded-full
                  bg-violet-600
                  flex items-center justify-center
                  text-white font-semibold
                  shadow-md shadow-violet-600/40">
                {user.email?.[0].toUpperCase()}
              </div>
              <span>Dashboard</span>
            </Link>
          )}
        </div>
      </motion.nav>
    </header>
  );
}
