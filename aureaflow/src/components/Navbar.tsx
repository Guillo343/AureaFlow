import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="w-full py-4 shadow-soft">
      <nav className="container-main flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold">
          AureaFlow
        </Link>

        {!user ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg font-medium
                         bg-violet-600 text-white
                         shadow-lg shadow-violet-600/30
                         hover:bg-violet-500"
            >
              Sign Up
            </Link>
          </motion.div>
        ) : (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm"
          >
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white">
              {user.email?.[0].toUpperCase()}
            </div>
            <span>Dashboard</span>
          </Link>
        )}
      </nav>
    </header>
  );
}
