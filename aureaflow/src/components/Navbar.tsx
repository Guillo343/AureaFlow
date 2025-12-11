export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b">
      <h2 className="text-xl font-bold">AureaFlow</h2>

      <div className="hidden md:flex gap-6">
        <a href="#" className="hover:text-gray-600">Inicio</a>
        <a href="#" className="hover:text-gray-600">Características</a>
        <a href="#" className="hover:text-gray-600">Planes</a>
      </div>

      <button className="px-4 py-2 rounded-lg bg-black text-white">
        Ingresar
      </button>
    </nav>
  );
}
