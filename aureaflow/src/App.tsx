import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./pages/Loading/Footer";
import SplashScreen from "./components/loading/SplashScreen";
import LandingPage from "./pages/Loading/Landing";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
