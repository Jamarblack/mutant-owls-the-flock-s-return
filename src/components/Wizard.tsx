import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { OwlInput } from "./OwlInput";
import { PerchingOwl } from "./PerchingOwl";
import owlLogo from "@/assets/owl-logo.png.asset.json";

interface Props {
  onExit: () => void;
}

interface FormState {
  handle: string;
  followed: boolean;
  liked: boolean;
  quoteLink: string;
  commentLink: string;
  wallet: string;
}

const initial: FormState = {
  handle: "",
  followed: false,
  liked: false,
  quoteLink: "",
  commentLink: "",
  wallet: "",
};

const STEPS = ["Initiation", "Rites", "Vault", "Arrival"] as const;

export function Wizard({ onExit }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [focused, setFocused] = useState<HTMLElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.handle.startsWith("@") || form.handle.length < 2)
        e.handle = "Handle must begin with @";
    }
    if (step === 1) {
      if (!form.followed) e.followed = "Required";
      if (!form.liked) e.liked = "Required";
      if (!form.quoteLink.startsWith("http")) e.quoteLink = "Paste a valid link";
      if (!form.commentLink.startsWith("http")) e.commentLink = "Paste a valid link";
    }
    if (step === 2) {
      if (!/^0x[a-fA-F0-9]{40}$/.test(form.wallet))
        e.wallet = "Must start with 0x and be 42 chars";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStep(0);
    onExit();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative">
      <PerchingOwl target={focused} />

      {/* Stepper */}
      <div className="mb-10 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className={
                "h-9 w-9 rounded-full grid place-items-center text-xs font-display border transition-all " +
                (i <= step
                  ? "border-[color:var(--ember)] text-foreground bg-[color-mix(in_oklab,var(--ember)_15%,transparent)] shadow-[0_0_18px_color-mix(in_oklab,var(--ember)_40%,transparent)]"
                  : "border-border text-muted-foreground")
              }
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-10 h-px bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <img src={owlLogo.url} alt="" className="w-8 h-8 opacity-80" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Step {step + 1} · {STEPS[step]}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl text-foreground text-ember-glow">
                  Identify Yourself to the Flock.
                </h2>
                <p className="text-muted-foreground">
                  Your name will be inscribed in the ruins.
                </p>
                <OwlInput
                  label="X (Twitter) Handle"
                  placeholder="@yourname"
                  value={form.handle}
                  onChange={(e) => update("handle", e.target.value)}
                  onFocusElement={setFocused}
                  error={errors.handle}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl text-foreground text-ember-glow">
                  Prove Your Loyalty.
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <RuneTask
                    label="Follow the Flock"
                    href="https://x.com/intent/follow?screen_name=MutantOwls"
                    done={form.followed}
                    onDone={() => update("followed", true)}
                  />
                  <RuneTask
                    label="Like the Prophecy"
                    href="https://x.com/MutantOwls"
                    done={form.liked}
                    onDone={() => update("liked", true)}
                  />
                </div>
                <OwlInput
                  label="Quote the Prophecy (Retweet link)"
                  placeholder="https://x.com/..."
                  value={form.quoteLink}
                  onChange={(e) => update("quoteLink", e.target.value)}
                  onFocusElement={setFocused}
                  error={errors.quoteLink}
                />
                <OwlInput
                  label="Speak the Lore (Comment link)"
                  placeholder="https://x.com/..."
                  value={form.commentLink}
                  onChange={(e) => update("commentLink", e.target.value)}
                  onFocusElement={setFocused}
                  error={errors.commentLink}
                />
                {(errors.followed || errors.liked) && (
                  <p className="text-xs text-destructive">
                    Complete all rites to continue.
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl text-foreground text-ember-glow">
                  Prepare for the Drop.
                </h2>
                <p className="text-muted-foreground">
                  Seal your vault — the flock will know where to find you.
                </p>
                <OwlInput
                  label="EVM Wallet Address"
                  placeholder="0x..."
                  value={form.wallet}
                  onChange={(e) => update("wallet", e.target.value)}
                  onFocusElement={setFocused}
                  error={errors.wallet}
                  spellCheck={false}
                />
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6 py-6">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 140, damping: 14 }}
                  className="w-24 h-24 rounded-full mx-auto grid place-items-center btn-ember"
                >
                  <Check size={42} className="text-foreground" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-4xl text-foreground text-ember-glow">
                  The Ruins Remember Your Name.
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You have successfully joined the flock. Await the return.
                </p>
                <button
                  onClick={reset}
                  className="btn-ember mt-4 px-8 py-3 rounded-full font-display uppercase tracking-[0.3em] text-sm"
                >
                  Return to Ruins
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={step === 0 ? onExit : back}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} />
              {step === 0 ? "Back to Ruins" : "Back"}
            </button>
            <button
              onClick={next}
              className="btn-ember inline-flex items-center gap-2 px-7 py-3 rounded-full font-display uppercase tracking-[0.3em] text-xs"
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RuneTask({
  label,
  href,
  done,
  onDone,
}: {
  label: string;
  href: string;
  done: boolean;
  onDone: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => setTimeout(onDone, 400)}
      className={
        "rune-card group rounded-xl px-4 py-4 flex items-center justify-between gap-3 transition-all hover:-translate-y-0.5 " +
        (done ? "ring-1 ring-[color:var(--ember)]" : "")
      }
    >
      <span className="font-display tracking-wider text-sm">{label}</span>
      <span
        className={
          "h-7 w-7 rounded-full grid place-items-center border " +
          (done
            ? "bg-[color-mix(in_oklab,var(--ember)_30%,transparent)] border-[color:var(--ember)] text-foreground"
            : "border-border text-muted-foreground")
        }
      >
        {done ? <Check size={14} /> : <ChevronRight size={14} />}
      </span>
    </a>
  );
}
