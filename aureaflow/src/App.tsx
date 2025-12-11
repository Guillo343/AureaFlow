import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./pages/Loading/Footer";
import SplashScreen from "./components/loading/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key="route"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
