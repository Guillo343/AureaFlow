import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Todas las rutas se renderizan aquí */}
      <Outlet />
    </div>
  );
}

export default App;
