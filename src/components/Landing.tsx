import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  // Animation variants for that cinematic staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent pt-24 pb-12 w-full selection:bg-[#FFBF00] selection:text-black">
      
      {/* Main Lore Container */}
      <motion.div 
        className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center gap-12 min-h-[70vh] justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* THIS IS YOUR ACTUAL WORDMARK LOGO */}
        <motion.img 
          variants={itemVariants}
          src="/wordmark.png" 
          alt="Mutant Owls"
          className="w-full max-w-lg mx-auto drop-shadow-[0_0_15px_rgba(255,191,0,0.3)]"
        />

        {/* The Prophecy */}
        <div className="space-y-6 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto text-stone-300">
          <motion.p variants={itemVariants}>
            Long before the flock, there was the fall, kingdoms vanished and the old world fell to ruins.
          </motion.p>
          <motion.p variants={itemVariants}>
            Yet something remained, born of evolution and shaped by chaos, <span className="text-[#FFBF00] font-semibold">THE MUTANT OWLS</span>.
          </motion.p>
          <motion.p variants={itemVariants}>
            The ruins remember their shadows, the stories remember their names.
          </motion.p>
          <motion.p variants={itemVariants} className="text-stone-400 italic">
            The flock is coming, choose your place now before the story moves on without you.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <button
            onClick={() => navigate('/initiation')}
            className="group relative px-8 py-4 bg-transparent border border-[#FFBF00] text-[#FFBF00] font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,191,0,0.4)]"
          >
            <span className="relative z-10">Enter The Flock</span>
            <div className="absolute inset-0 h-full w-full bg-[#FFBF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-10" />
          </button>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <div className="relative z-10 mt-32 max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-2xl text-stone-400 uppercase tracking-widest mb-6 border-b border-stone-800 pb-4 inline-block">
          About Mutant Owls
        </h2>
        <p className="text-stone-400 leading-relaxed text-sm md:text-base">
          Mutant Owls is a story driven, community powered digital collectible project built around a world shaped by change, resilience, and evolution. The project explores a universe where the extraordinary outlasted the ordinary. Every Mutant Owl is a unique character within an expanding narrative, giving collectors the opportunity to own a piece of a larger story.
        </p>
      </div>
    </div>
  );
}