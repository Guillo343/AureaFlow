export default function Navbar() {
  return (
    <header className="w-full py-4 shadow-soft hover-lift">
      <nav className="container-main flex items-center justify-between">
        <h1 className="text-2xl font-bold hover-scale-sm">
          <a href="/" aria-label="AureaFlow Home">
            AureaFlow
          </a>
        </h1>
        <button className="btn-primary hover-scale-md" aria-label="Log In">
          Log In
        </button>
      </nav>
    </header>
  );
}
