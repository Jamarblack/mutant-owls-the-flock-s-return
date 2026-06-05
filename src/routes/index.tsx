import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RuinsBackground } from "@/components/RuinsBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Landing } from "@/components/Landing";
import { Wizard } from "@/components/Wizard";
import owlLogo from "@/assets/owl-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mutant Owls — Legend of the Owls" },
      { name: "description", content: "A story-driven NFT collection from a world of fallen kingdoms and the flock that remained. Join the ruins." },
      { property: "og:title", content: "Mutant Owls — Legend of the Owls" },
      { property: "og:description", content: "The flock is coming. Choose your place before the story moves on without you." },
    ],
  }),
  component: Index,
});

type View = "landing" | "wizard";

function Index() {
  const [view, setView] = useState<View>("landing");

  return (
    <div className="relative min-h-screen text-foreground">
      <RuinsBackground />

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-10 py-5">
        <button
          onClick={() => setView("landing")}
          className="flex items-center gap-3 group"
          aria-label="Mutant Owls home"
        >
          <img src={owlLogo.url} alt="" className="w-9 h-9 transition-transform group-hover:scale-110" />
          <span className="font-display tracking-[0.4em] text-sm uppercase hidden sm:block">
            Mutant Owls
          </span>
        </button>
        <ThemeToggle />
      </header>

      <main>
        <AnimatePresence mode="wait">
          {view === "landing" ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              transition={{ duration: 0.6 }}
            >
              <Landing onEnter={() => setView("wizard")} />
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Wizard onExit={() => setView("landing")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
