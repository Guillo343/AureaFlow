import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowRightLeft, Wallet } from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Overview", path: "/dashboard", icon: Home },
    { name: "Transactions", path: "/dashboard/transactions", icon: ArrowRightLeft },
    { name: "Repositories", path: "/dashboard/repositories", icon: Wallet },
  ];

  return (
    <aside className="w-64 h-screen bg-[#131313] text-white flex flex-col border-r border-white/10">
      {/* Logo */}
      <div className="px-6 py-6 text-2xl font-bold tracking-tight">
        <span className="text-indigo-400">Aurea</span>Flow
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 mt-4 px-4">
        {menu.map(({ name, path, icon: Icon }) => {
          const active = pathname === path;

          return (
            <Link key={path} to={path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition 
                ${active ? "bg-indigo-500/20 text-indigo-400" : "text-white/70 hover:bg-white/5"}`}
              >
                <Icon size={20} />
                <span>{name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
