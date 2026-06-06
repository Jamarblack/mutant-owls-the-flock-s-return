import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import owlHooded from "public/owl-perching.png";

interface Props {
  
  target: HTMLElement | null;
 
  targetLabel?: string;
}

export function PerchingOwl({ target, targetLabel }: Props) {
  const controls = useAnimationControls();
  const idleRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const [announcement, setAnnouncement] = useState("");

  
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
    if (!target) {
      controls.start({
        x: idleRef.current.x,
        y: idleRef.current.y,
        rotate: 0,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 80, damping: 18 },
      });
      setAnnouncement("");
      return;
    }

    const perch = (animate = true) => {
      const r = target.getBoundingClientRect();
      const x = r.left + r.width - 92;
      const y = r.top - 78;
      if (prefersReducedMotion || !animate) {
        controls.set({ x, y, rotate: 0 });
      } else {
        controls.start({
          x,
          y,
          rotate: [0, -8, 0],
          transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.9 },
        });
      }
    };

    perch();

    // Announce focus change to assistive tech
    const label =
      targetLabel ||
      target.getAttribute("aria-label") ||
      (target.getAttribute("aria-labelledby") &&
        document.getElementById(target.getAttribute("aria-labelledby")!)
          ?.textContent) ||
      (target as HTMLInputElement).labels?.[0]?.textContent ||
      target.getAttribute("placeholder") ||
      "input";
    setAnnouncement(`Owl perched on ${label?.trim()} field.`);

    const onReflow = () => perch(false);
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);
    return () => {
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [target, targetLabel, controls, prefersReducedMotion]);

  return (
    <>
      <motion.div
        initial={{ x: 9999, y: 9999, opacity: 0 }}
        animate={controls}
        aria-hidden="true"
        className="fixed top-0 left-0 z-40 pointer-events-none"
        style={{ width: 110, height: 110 }}
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--ember) 70%, transparent), transparent 65%)",
            }}
          />
          <img
            src={owlHooded.url}
            alt=""
            className="relative w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </motion.div>

      {/* Screen reader announcements for focus/perch changes */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
    </>
  );
}
