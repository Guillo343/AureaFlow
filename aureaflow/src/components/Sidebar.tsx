import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#0f0f0f] border-r border-white/10 p-6">
      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold mb-10"
      >
        AureaFlow
      </motion.h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavItem to="/dashboard" label="Overview" />
        <NavItem to="/dashboard/transactions" label="Transactions" />
        <NavItem to="/dashboard/goals" label="Goals" />
      </nav>
    </aside>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-violet-600 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}
