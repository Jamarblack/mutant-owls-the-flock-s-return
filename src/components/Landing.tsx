import { motion } from "framer-motion";
import wordmark from "@/assets/wordmark.png.asset.json";
import owlLogo from "@/assets/owl-logo.png.asset.json";
import owlChar from "@/assets/owl-character.png.asset.json";

interface Props {
  onEnter: () => void;
}

const lore = [
  "Long before the flock, there was the fall — kingdoms vanished and the old world fell to ruins.",
  "Yet something remained, born of evolution and shaped by chaos. THE MUTANT OWLS.",
  "The ruins remember their shadows. The stories remember their names.",
  "The flock is coming. Choose your place now, before the story moves on without you.",
];

export function Landing({ onEnter }: Props) {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.img
          src={wordmark.url}
          alt="Mutant Owls — Legend of the Owls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-3xl mx-auto mb-12 select-none pointer-events-none"
          style={{ filter: "drop-shadow(0 0 30px color-mix(in oklab, var(--ember) 40%, transparent))" }}
        />

        <div className="max-w-2xl space-y-7">
          {lore.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.6, duration: 1 }}
              className={
                i === 1
                  ? "font-serif text-2xl md:text-3xl text-foreground text-ember-glow tracking-wide"
                  : "font-sans text-base md:text-lg text-muted-foreground italic"
              }
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="btn-ember mt-16 px-12 py-5 rounded-full font-display text-lg md:text-xl uppercase tracking-[0.35em] text-foreground relative"
        >
          <span className="relative z-10">Enter The Flock</span>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            style={{
              boxShadow:
                "0 0 40px color-mix(in oklab, var(--ember) 60%, transparent), 0 0 90px color-mix(in oklab, var(--ember) 40%, transparent)",
            }}
          />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          ↓ Scroll into the ruins
        </motion.div>
      </section>

      {/* About */}
      <section className="min-h-screen flex items-center px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div
              className="absolute -inset-8 rounded-full blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--ember) 40%, transparent), transparent 70%)" }}
            />
            <img
              src={owlChar.url}
              alt="A Mutant Owl"
              className="relative w-full max-w-md mx-auto rounded-3xl border border-border"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={owlLogo.url} alt="" className="w-10 h-10" />
              <span className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Codex I</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-foreground mb-8 text-ember-glow">
              About<br />Mutant Owls
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Mutant Owls is a story-driven, community-powered digital collectible project
              built around a world shaped by change, resilience, and evolution. The project
              explores a universe where the extraordinary outlasted the ordinary. Every
              Mutant Owl is a unique character within an expanding narrative, giving
              collectors the opportunity to own a piece of a larger story.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
