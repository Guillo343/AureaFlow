import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { LayoutDashboard, ArrowLeftRight, Target, ChevronLeft, ChevronRight, LogOut, BanknoteArrowUp, WalletMinimal, HandCoins } from "lucide-react";
import { logout } from "../pages/Auth/Logout";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.25 }}
      className="h-screen bg-[#0f0f0f] border-r border-white/10
                 flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Logo + Collapse */}
        <div className="h-16 flex items-center justify-between px-4">
          {!collapsed && (
            <span className="text-lg font-bold text-white">AureaFlow</span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition"
            aria-label="Toggle sidebar">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-2">
          <SidebarLink
            to="/dashboard"
            label="Overview"
            icon={<LayoutDashboard size={20} />}
            collapsed={collapsed}/>

          <SidebarLink
            to="/dashboard/transactions"
            label="Transactions"
            icon={<ArrowLeftRight size={20} />}
            collapsed={collapsed}/>

          <SidebarLink
            to="/dashboard/goals"
            label="Goals"
            icon={<Target size={20} />}
            collapsed={collapsed}/>
          <SidebarLink
            to="/dashboard/incomes"
            label="Incomes"
            icon={<BanknoteArrowUp size={20} />}
            collapsed={collapsed}/>
          <SidebarLink
            to="/dashboard/savings"
            label="Savings"
            icon={<WalletMinimal size={20} />}
            collapsed={collapsed}/>
          <SidebarLink
            to="/dashboard/expenses"
            label="Expenses"
            icon={<HandCoins size={20} />}
            collapsed={collapsed}/>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2
                     text-red-400 hover:text-red-300 transition"
          aria-label="Logout">
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}

function SidebarLink({ to, label, icon, collapsed}: {
  to: string;
  label: string;
  icon: React.ReactNode;
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
        ${
          isActive
            ? "bg-violet-600 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `
      }
    >
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}
