import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the audio object once when the component mounts
  useEffect(() => {
    // Points to the file in your public folder
    audioRef.current = new Audio("/owl-ambient.mp3");
    audioRef.current.loop = true; // Loops forever
    audioRef.current.volume = 0.4; // 40% volume so it doesn't blast their ears

    // Cleanup when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // .play() returns a promise, handling it prevents browser errors
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
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