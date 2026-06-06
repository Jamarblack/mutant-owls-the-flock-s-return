
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function RuinsBackground() {
  const [isNight, setIsNight] = useState(
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
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
    // ✅ Use style z-index instead of Tailwind z-[-1] — more reliable with stacking contexts
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#0B0F19]" style={{ zIndex: -1 }}>

      {/* DAY IMAGE */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/day-ruins.png')" }}
        // ✅ Remove initial entirely — let animate drive it from the start
        animate={{ opacity: isNight ? 0 : 0.6 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* NIGHT IMAGE */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/night-ruins.png')" }}
        animate={{ opacity: isNight ? 0.6 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
    </div>
  );
}