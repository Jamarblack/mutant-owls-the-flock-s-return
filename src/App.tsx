import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeToggle } from "./components/ThemeToggle";
// 👇 Import the newly created AudioToggle component
import { AudioToggle } from "./components/AudioToggle";
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
  const [isNight, setIsNight] = useState(
    document.documentElement.classList.contains("dark")
  );

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
        className="min-h-screen text-stone-300 overflow-x-hidden"
        style={{
          backgroundImage: isNight ? "url('/night-ruins.webp')" : "url('/day-ruins.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0B0F19",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay so text stays readable */}
        <div className="fixed inset-0 bg-[#0B0F19]/60 pointer-events-none z-0" />

        {/* Responsive Header */}
        <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-5 bg-[#0B0F19]/30 backdrop-blur-md border-b border-[#FFBF00]/10">
          
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0 group" aria-label="Mutant Owls home">
            <div className="w-12 sm:w-16 md:w-20 h-auto rounded-full bg-transparent flex items-center justify-center text-[#FFBF00] transition-transform group-hover:scale-110 shadow-[0_0_10px_rgba(255,191,0,0.3)]">
              <img src="/owl-head.png" alt="Mutant Owl" className="rounded-full w-full h-auto object-cover" />
            </div>
          </a>

          {/* Middle Text SVG */}
          <img 
            src="/owl-text.svg" 
            alt="Mutant Owls"
            className="w-32 sm:w-48 md:w-64 lg:w-80 h-auto mx-2 md:mx-4 shrink" 
          />   

          {/* Toggles Container:
            Groups both control buttons side-by-side cleanly with responsive gaps.
          */}
          <div className="shrink-0 flex items-center gap-2 sm:gap-3 md:gap-4">
            <AudioToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pt-24 md:pt-32 pb-10">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}