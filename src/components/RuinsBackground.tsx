import { motion } from "framer-motion";
import { useMemo } from "react";

export function RuinsBackground() {
  const embers = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 1 + Math.random() * 2.5,
        drift: -20 + Math.random() * 40,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient: ruins */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 110%, color-mix(in oklab, var(--ember) 18%, transparent), transparent 60%), radial-gradient(80% 60% at 50% -10%, color-mix(in oklab, var(--ember) 8%, transparent), transparent 70%), var(--color-background)",
        }}
      />
      {/* Silhouette ruins */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[55vh] opacity-70 dark:opacity-80"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ruinG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.12 0.02 260)" stopOpacity="0.0" />
            <stop offset="1" stopColor="oklch(0.08 0.02 260)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ruinG)"
          d="M0,600 L0,420 L60,420 L80,300 L120,300 L130,380 L200,380 L210,260 L260,260 L280,200 L320,200 L330,360 L420,360 L440,250 L520,250 L530,180 L580,180 L590,330 L700,330 L720,220 L820,220 L830,140 L900,140 L920,310 L1020,310 L1040,240 L1120,240 L1140,180 L1200,180 L1220,340 L1320,340 L1340,260 L1440,260 L1440,600 Z"
        />
      </svg>
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, transparent, color-mix(in oklab, var(--color-background) 80%, black) 100%)",
        }}
      />
      {/* Embers / dust */}
      {embers.map((e) => (
        <motion.span
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: -10,
            width: e.size,
            height: e.size,
            background: "var(--ember)",
            boxShadow: "0 0 8px var(--ember)",
            opacity: 0.55,
          }}
          animate={{
            y: [0, -window?.innerHeight || -800],
            x: [0, e.drift],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
