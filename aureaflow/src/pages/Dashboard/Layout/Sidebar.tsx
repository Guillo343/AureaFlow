import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { logout } from "../../Auth/Logout";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 240 }}
      className="h-screen bg-[#0f0f0f] border-r border-white/10
                 flex flex-col justify-between px-4 py-6"
    >
      {/* Top */}
      <div className="space-y-8">
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          className="text-gray-400 hover:text-white transition self-end"
        >
          {collapsed ? "→" : "←"}
        </button>

        <nav className="space-y-4">
          <SidebarLink to="/dashboard" collapsed={collapsed}>
            Overview
          </SidebarLink>

          <SidebarLink to="/dashboard/transactions" collapsed={collapsed}>
            Transactions
          </SidebarLink>

          <SidebarLink to="/dashboard/goals" collapsed={collapsed}>
            Goals
          </SidebarLink>
        </nav>
      </div>

      {/* Bottom */}
      <button
        onClick={handleLogout}
        className="w-10 h-10 rounded-full
                   bg-red-500/10 text-red-400
                   hover:bg-red-500 hover:text-white
                   transition flex items-center justify-center"
        aria-label="Logout"
      >
        ⎋
      </button>
    </motion.aside>
  );
}

function SidebarLink({
  to,
  collapsed,
  children,
}: {
  to: string;
  collapsed: boolean;
  children: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-lg text-sm
        transition
        ${isActive ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"}
      `
      }
    >
      <span className="text-lg">•</span>
      {!collapsed && <span>{children}</span>}
    </NavLink>
  );
}
