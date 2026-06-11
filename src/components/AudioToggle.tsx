import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStarted = useRef(false); // track if audio has ever played

  useEffect(() => {
    const audio = new Audio("/owl-ambient.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const startOnInteraction = () => {
      // Only do this once
      if (hasStarted.current) return;

      audio
        .play()
        .then(() => {
          hasStarted.current = true;
          setIsPlaying(true);
          window.removeEventListener("click", startOnInteraction);
          window.removeEventListener("touchstart", startOnInteraction);
          window.removeEventListener("keydown", startOnInteraction);
          window.removeEventListener("scroll", startOnInteraction);
        })
        .catch((err) => {
          console.log("Playback failed:", err);
        });
    };

    // Try immediately (works if user already interacted, e.g. navigated from another page)
    audio
      .play()
      .then(() => {
        hasStarted.current = true;
        setIsPlaying(true);
      })
      .catch(() => {
        // Blocked — wait for literally any interaction
        window.addEventListener("click", startOnInteraction);
        window.addEventListener("touchstart", startOnInteraction);
        window.addEventListener("keydown", startOnInteraction);
        window.addEventListener("scroll", startOnInteraction); // 👈 scroll counts too
      });

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      window.removeEventListener("scroll", startOnInteraction);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleSound}
      aria-label="Toggle ambient sound"
      className="relative h-10 w-10 rounded-full grid place-items-center border border-[#FFBF00]/30 bg-[#0B0F19]/60 backdrop-blur hover:bg-[#0B0F19] hover:border-[#FFBF00] transition-colors z-50"
    >
      <motion.span
        key={isPlaying ? "playing" : "muted"}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-[#FFBF00]"
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.span>
    </button>
  );
}
