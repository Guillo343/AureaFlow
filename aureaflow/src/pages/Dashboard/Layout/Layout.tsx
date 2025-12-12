import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Navbar />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
