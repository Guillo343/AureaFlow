import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
