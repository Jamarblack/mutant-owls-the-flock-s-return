import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";
import owlHooded from "@/assets/owl-hooded.png.asset.json";

interface Props {
  /** The element the owl should perch on top of (focused input). null = idle */
  target: HTMLElement | null;
  /** Container that owl positions itself within (the wizard card / viewport) */
  container?: HTMLElement | null;
}

const IDLE_OFFSET = { x: -180, y: 40 }; // relative to viewport-right-bottom area

export function PerchingOwl({ target }: Props) {
  const controls = useAnimationControls();
  const idleRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") return;
      idleRef.current = {
        x: window.innerWidth - 220,
        y: window.innerHeight - 240,
      };
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    if (target) {
      const r = target.getBoundingClientRect();
      controls.start({
        x: r.left + r.width - 92,
        y: r.top - 78,
        rotate: [0, -8, 0],
        transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.9 },
      });
    } else {
      controls.start({
        x: idleRef.current.x,
        y: idleRef.current.y,
        rotate: 0,
        transition: { type: "spring", stiffness: 80, damping: 18 },
      });
    }
  }, [target, controls]);

  return (
    <motion.div
      initial={{ x: 9999, y: 9999, opacity: 0 }}
      animate={controls}
      className="fixed top-0 left-0 z-40 pointer-events-none"
      style={{ width: 110, height: 110 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-60"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--ember) 70%, transparent), transparent 65%)" }}
        />
        <img
          src={owlHooded.url}
          alt=""
          className="relative w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
}
