import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeToggle } from "./components/ThemeToggle";
import Landing from "./components/Landing";
import Wizard from "./components/Wizard";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              transition={{ duration: 0.6 }}
            >
              <Landing />
            </motion.div>
          }
        />

        <Route
          path="/initiation"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Wizard />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isNight, setIsNight] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsNight(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <div
        className="min-h-screen text-stone-300 overflow-hidden"
        style={{
          backgroundImage: isNight ? "url('/night-ruins.png')" : "url('/day-ruins.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0B0F19",
        }}
      >
        {/* Overlay so text stays readable */}
        <div className="fixed inset-0 bg-[#0B0F19]/60 pointer-events-none" />

        <header className="fixed top-0 inset-x-0 flex items-center justify-between px-6 md:px-10 py-5">
          <a href="/" className="flex items-center gap-3 group" aria-label="Mutant Owls home">
            <div className="w-20 h-auto rounded-full   flex items-center bg-transperent justify-center text-[#FFBF00] text-xs font-bold transition-transform group-hover:scale-110 shadow-[0_0_10px_rgba(255,191,0,0.3)]"> 
                <img src="/owl-head.png" alt="Mutant OWl" className="rounded-full" />
                <span></span>
            </div>
        <img src="/owl-text.svg" className="md:w-120 w-60 h-auto  " />   
           
          </a>
          <ThemeToggle />
        </header>

        <main className="relative z-10 pt-20">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
