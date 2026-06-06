import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Heart, MessageSquare, Repeat2, ArrowRight } from 'lucide-react';
import { OwlInput } from './OwlInput'; 

export default function Wizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [xHandle, setXHandle] = useState('');
  const [retweetLink, setRetweetLink] = useState('');
  const [commentLink, setCommentLink] = useState('');
  const [wallet, setWallet] = useState('');

  // Validation Logic
  const isStep1Valid = xHandle.startsWith('@') && xHandle.length > 2;
  const isStep2Valid = retweetLink.includes('x.com') && commentLink.includes('x.com');
  const isStep3Valid = wallet.startsWith('0x') && wallet.length === 42;

  // Framer Motion Variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, type: 'spring', bounce: 0.2 }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div className="relative min-h-screen bg-transperent text-stone-300 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Idle Owl Position (Top Right Corner) */}
      <div className="absolute top-24 right-12 hidden md:block z-50">
        <motion.div layoutId="global-flying-owl" className="opacity-40 hover:opacity-100 transition-opacity">
           <img 
            src="/owl-icon.png" 
            alt="Idle Owl" 
            className="w-12 h-12 grayscale hover:grayscale-0 transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0B0F19]/80 backdrop-blur-xl border border-stone-800 p-8 shadow-2xl min-h-[500px] flex flex-col">
        
        {/* Progress Indicators */}
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-[#FFBF00] shadow-[0_0_10px_rgba(255,191,0,0.5)]' : 'bg-stone-800'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={1}>
          
          {/* STEP 1: X Handle */}
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full flex-1">
              <h2 className="text-3xl font-serif text-[#FFBF00] mb-2 uppercase tracking-widest">Identify Yourself</h2>
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
                className={`mt-8 py-4 flex justify-center items-center gap-2 uppercase tracking-widest font-bold transition-all ${isStep1Valid ? 'bg-[#FFBF00] text-black hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]' : 'bg-stone-800 text-stone-500 cursor-not-allowed'}`}
              >
                Proceed <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: The Rites */}
          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full flex-1">
              <h2 className="text-3xl font-serif text-[#FFBF00] mb-2 uppercase tracking-widest">Prove Your Loyalty</h2>
              <p className="text-stone-400 mb-6 text-sm">Complete the rites to proceed.</p>
              
              <div className="space-y-4 mb-auto">
                <a href="#" className="flex items-center gap-3 p-4 border border-stone-700 hover:border-[#FFBF00] hover:text-[#FFBF00] transition-colors group">
                  <Twitter size={20} className="group-hover:text-[#FFBF00] text-stone-400" />
                  <span className="tracking-widest uppercase text-sm">Follow the Flock</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 border border-stone-700 hover:border-[#FFBF00] hover:text-[#FFBF00] transition-colors group">
                  <Heart size={20} className="group-hover:text-[#FFBF00] text-stone-400" />
                  <span className="tracking-widest uppercase text-sm">Like the Prophecy</span>
                </a>
                
                <OwlInput 
                  value={retweetLink} 
                  onChange={(e) => setRetweetLink(e.target.value)} 
                  placeholder="Paste Quote Link" 
                  icon={Repeat2}
                />
                
                <OwlInput 
                  value={commentLink} 
                  onChange={(e) => setCommentLink(e.target.value)} 
                  placeholder="Paste Comment Link" 
                  icon={MessageSquare}
                />
              </div>

              <button disabled={!isStep2Valid} onClick={() => setStep(3)} className={`mt-6 py-4 flex justify-center items-center gap-2 uppercase tracking-widest font-bold transition-all ${isStep2Valid ? 'bg-[#FFBF00] text-black hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]' : 'bg-stone-800 text-stone-500 cursor-not-allowed'}`}>
                Proceed <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 3: The Vault */}
          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col h-full flex-1">
              <h2 className="text-3xl font-serif text-[#FFBF00] mb-2 uppercase tracking-widest">Prepare for the Drop</h2>
              <p className="text-stone-400 mb-8">Secure your place in the ruins.</p>
              
              <div className="relative mb-auto">
                <OwlInput 
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder="0x... EVM Wallet Address"
                  isValid={wallet.length === 0 || isStep3Valid}
                />
              </div>

              <button disabled={!isStep3Valid} onClick={() => setStep(4)} className={`mt-8 py-4 flex justify-center items-center gap-2 uppercase tracking-widest font-bold transition-all ${isStep3Valid ? 'bg-[#FFBF00] text-black hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]' : 'bg-stone-800 text-stone-500 cursor-not-allowed'}`}>
                Connect <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 4: Success (WITH YOUR ACTUAL IMAGE) */}
          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center justify-center h-full flex-1 text-center">
              
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src="/mutant-owl.png" 
                alt="Welcome to the Flock"
                className="w-48 h-48 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(255,191,0,0.6)] rounded-xl object-cover border border-[#FFBF00]/30"
              />

              <h2 className="text-4xl font-serif text-[#FFBF00] mb-4 uppercase tracking-widest">The Ruins Remember</h2>
              <p className="text-stone-400 mb-8 max-w-sm">You have successfully joined the flock. Await the return.</p>
              
              <button onClick={() => navigate('/')} className="w-full py-4 uppercase tracking-widest font-bold bg-transparent border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black transition-all">
                Return to Ruins
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}