import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.25 }}
      className="h-screen bg-[#0f0f0f] border-r border-white/10 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4">
        {!collapsed && (
          <span className="text-lg font-bold text-white">AureaFlow</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        <SidebarLink to="/dashboard" label="Overview" collapsed={collapsed} />
        <SidebarLink
          to="/dashboard/transactions"
          label="Transactions"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/goals"
          label="Goals"
          collapsed={collapsed}
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2
                     text-red-400 hover:text-red-300 transition"
        >
          ⏻ {!collapsed && "Logout"}
        </button>
      </div>
    </motion.aside>
  );
}

function SidebarLink({
  to,
  label,
  collapsed,
}: {
  to: string;
  label: string;
  collapsed: boolean;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-lg
        transition
        ${isActive ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-white/5"}
      `
      }
    >
      <span className="text-sm font-medium">
        {!collapsed && label}
      </span>
    </NavLink>
  );
}
