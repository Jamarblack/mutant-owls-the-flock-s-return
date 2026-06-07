import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Repeat2, CheckCircle, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { OwlInput } from "./OwlInput";

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function Wizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [xHandle, setXHandle] = useState("");
  const [retweetLink, setRetweetLink] = useState("");
  const [wallet, setWallet] = useState("");

  // Task "Auto-mark" State
  const [tasks, setTasks] = useState({
    follow: false,
    quote: false,
    tag: false,
  });

 
  const handleTaskClick = (taskKey: keyof typeof tasks, url: string) => {
    window.open(url, "_blank");
    setTimeout(() => {
      setTasks((prev) => ({ ...prev, [taskKey]: true }));
    }, 1500);
  };

  // Google Sheets Submission Handler
  const handleSubmitToSheet = async () => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Securing your place in the ruins...");

    const formData = new FormData();
    formData.append("X_Handle", xHandle);
    formData.append("Retweet_Link", retweetLink);
    formData.append("Wallet_Address", wallet);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.result === "success") {
        toast.success("Flock entry secured!", { id: loadingToast });
        setStep(4); // Move to success screen
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("The ruins rejected the entry. Try again.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation Logic
  const isStep1Valid = xHandle.startsWith("@") && xHandle.length > 2;
  const isStep2Valid = tasks.follow && tasks.quote && tasks.tag && retweetLink.includes("x");
  const isStep3Valid = wallet.startsWith("0x") && wallet.length === 42;

  // Framer Motion Variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, type: "spring", bounce: 0.2 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="relative min-h-screen bg-transparent text-stone-300 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Toast Notifications Provider - Styled to match the theme */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0B0F19',
            color: '#FFBF00',
            border: '1px solid #FFBF00',
          },
        }} 
      />

      {/* Idle Owl Position (Top Right Corner) */}
      <div className="absolute top-24 right-12 hidden md:block z-50">
        <motion.div
          layoutId="global-flying-owl"
          className="opacity-40 hover:opacity-100 transition-opacity"
        >
          <img
            src="/owl-perching.png"
            alt="Idle Owl"
            className="w-12 h-12 grayscale hover:grayscale-0 transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0B0F19]/90 backdrop-blur-xl border border-stone-800 p-8 shadow-2xl min-h-[500px] flex flex-col rounded-sm">
        {/* Progress Indicators */}
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= i ? "bg-[#FFBF00] shadow-[0_0_10px_rgba(255,191,0,0.5)]" : "bg-stone-800"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={1}>
          {/* STEP 1: X Handle */}
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full flex-1">
              <h2 className="text-3xl font-serif text-[#FFBF00] mb-2 uppercase tracking-widest">
                Identify Yourself
              </h2>
              <p className="text-stone-400 mb-8">Enter your X handle to join the flock.</p>

              <div className="relative mb-auto">
                <OwlInput
                  value={xHandle}
                  onChange={(e) => setXHandle(e.target.value)}
                  placeholder="@yourhandle"
                  isValid={xHandle.length === 0 || isStep1Valid}
                />
              </div>

              <button
                disabled={!isStep1Valid}
                onClick={() => setStep(2)}
                className={`mt-8 py-4 flex justify-center items-center gap-2 uppercase tracking-widest font-bold transition-all ${isStep1Valid ? "bg-[#FFBF00] text-black hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]" : "bg-stone-800 text-stone-500 cursor-not-allowed"}`}
              >
                Proceed <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: The Rites */}
          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full flex-1">
              <h2 className="text-3xl font-serif text-[#FFBF00] mb-2 uppercase tracking-widest">
                Prove Your Loyalty
              </h2>
              <p className="text-stone-400 mb-6 text-sm">
                Click go, complete the rite, come back — it auto-marks itself.
              </p>

              <div className="space-y-3 mb-auto">
                {/* Task 1: Follow */}
                <div className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${tasks.follow ? "border-[#FFBF00]/50 bg-[#FFBF00]/5" : "border-stone-800 bg-stone-900/50 hover:border-stone-600"}`}>
                  <div>
                    <h3 className="text-stone-200 text-sm font-medium tracking-wide">
                      Follow @MutantOwls on X
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">Hit follow on the main account</p>
                  </div>
                  <button onClick={() => handleTaskClick("follow", "https://x.com/MutantOwls")} className="shrink-0 ml-4">
                    {tasks.follow ? (
                      <CheckCircle className="text-[#FFBF00]" size={24} />
                    ) : (
                      <span className="flex items-center gap-1 border border-stone-600 text-stone-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:text-[#FFBF00] hover:border-[#FFBF00] transition-colors">
                        Go <ExternalLink size={12} />
                      </span>
                    )}
                  </button>
                </div>

                {/* Task 2: Like & Quote */}
                <div className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${tasks.quote ? "border-[#FFBF00]/50 bg-[#FFBF00]/5" : "border-stone-800 bg-stone-900/50 hover:border-stone-600"}`}>
                  <div>
                    <h3 className="text-stone-200 text-sm font-medium tracking-wide">
                      Like & Quote the Prophecy
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">
                      Quote RT with "The ruins remember"
                    </p>
                  </div>
                  <button onClick={() => handleTaskClick("quote", "https://x.com/MutantOwls")} className="shrink-0 ml-4">
                    {tasks.quote ? (
                      <CheckCircle className="text-[#FFBF00]" size={24} />
                    ) : (
                      <span className="flex items-center gap-1 border border-stone-600 text-stone-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:text-[#FFBF00] hover:border-[#FFBF00] transition-colors">
                        Go <ExternalLink size={12} />
                      </span>
                    )}
                  </button>
                </div>

                {/* Task 3: Tag Friends */}
                <div className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${tasks.tag ? "border-[#FFBF00]/50 bg-[#FFBF00]/5" : "border-stone-800 bg-stone-900/50 hover:border-stone-600"}`}>
                  <div>
                    <h3 className="text-stone-200 text-sm font-medium tracking-wide">
                      Tag 2 friends in your post
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">Bring the crew into the flock</p>
                  </div>
                  <button onClick={() => handleTaskClick("tag", "https://x.com/MutantOwls")} className="shrink-0 ml-4">
                    {tasks.tag ? (
                      <CheckCircle className="text-[#FFBF00]" size={24} />
                    ) : (
                      <span className="flex items-center gap-1 border border-stone-600 text-stone-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:text-[#FFBF00] hover:border-[#FFBF00] transition-colors">
                        Go <ExternalLink size={12} />
                      </span>
                    )}
                  </button>
                </div>

                {/* Input Verification */}
                <div className="pt-4">
                  <span className="text-xs uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-2">
                    Your Quote Tweet Link 🔗
                  </span>
                  <OwlInput
                    value={retweetLink}
                    onChange={(e) => setRetweetLink(e.target.value)}
                    placeholder="https://x.com/yourhandle/status/..."
                    icon={Repeat2}
                  />
                  <p className="text-stone-600 text-[10px] mt-2 uppercase tracking-wider">
                    Paste the link to your quote post so we can verify.
                  </p>
                </div>
              </div>

              <button
                disabled={!isStep2Valid}
                onClick={() => setStep(3)}
                className={`mt-6 py-4 flex justify-center items-center gap-2 uppercase tracking-widest font-bold transition-all ${isStep2Valid ? "bg-[#FFBF00] text-black hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]" : "bg-stone-800 text-stone-500 cursor-not-allowed"}`}
              >
                Proceed <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 3: The Vault */}
          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full flex-1">
              <h2 className="text-3xl font-serif text-[#FFBF00] mb-2 uppercase tracking-widest">
                Prepare for the Drop
              </h2>
              <p className="text-stone-400 mb-8">Secure your place in the ruins.</p>

              <div className="relative mb-auto">
                <OwlInput
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder="0x... EVM Wallet Address"
                  isValid={wallet.length === 0 || isStep3Valid}
                />
              </div>

              <button
                disabled={!isStep3Valid || isSubmitting}
                onClick={handleSubmitToSheet}
                className={`mt-8 py-4 flex justify-center items-center gap-2 uppercase tracking-widest font-bold transition-all ${isStep3Valid && !isSubmitting ? "bg-[#FFBF00] text-black hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]" : "bg-stone-800 text-stone-500 cursor-not-allowed"}`}
              >
                {isSubmitting ? "Connecting..." : "Connect"} {!isSubmitting && <ArrowRight size={20} />}
              </button>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center justify-center h-full flex-1 text-center">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src="/owl-head.png"
                alt="Welcome to the Flock"
                className="w-48 h-48 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(255,191,0,0.6)] rounded-xl object-cover border border-[#FFBF00]/30"
              />

              <h2 className="text-4xl font-serif text-[#FFBF00] mb-4 uppercase tracking-widest">
                The Ruins Remember
              </h2>
              <p className="text-stone-400 mb-8 max-w-sm">
                You have successfully joined the flock. Await the return.
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full py-4 uppercase tracking-widest font-bold bg-transparent border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black transition-all"
              >
                Return to Ruins
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}