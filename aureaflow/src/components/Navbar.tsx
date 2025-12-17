import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function Navbar() {
  return (
    <header className="w-full py-4 ">
      <nav className="container-main flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link
            to="/"
            aria-label="AureaFlow Home"
            className="hover:opacity-80 transition"
          >
            AureaFlow
          </Link>
        </h1>

        {/* Call to action */}
        <MotionLink
          to="/signup"
          aria-label="Sign up for AureaFlow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center
                     px-6 py-3 rounded-lg font-medium
                     bg-violet-600 text-white
                     shadow-lg shadow-violet-600/30
                     transition-colors
                     hover:bg-violet-500"
        >
          Sign Up
        </MotionLink>
      </nav>
    </header>
  );
}
