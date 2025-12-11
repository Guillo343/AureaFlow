export default function Navbar() {
  return (
    <nav className="w-full py-4 shadow-soft hover-lift">
      <div className="container-main flex items-center justify-between">
        <h1 className="text-2xl font-bold hover-scale-sm">AureaFlow</h1>
        <button className="btn-primary hover-scale-md">Log In</button>
      </div>
    </nav>
  );
}
