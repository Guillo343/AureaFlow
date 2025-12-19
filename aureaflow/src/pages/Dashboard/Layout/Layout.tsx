import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
