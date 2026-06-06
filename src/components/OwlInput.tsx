import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface OwlInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: LucideIcon;
  isValid?: boolean;
}

export function OwlInput({ value, onChange, placeholder, icon: Icon, isValid = true }: OwlInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isFocused && (
          <motion.div
            layoutId="global-flying-owl"
            className="absolute -top-10 right-4 z-20 pointer-events-none"
            initial={{ opacity: 0, y: -20, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* THIS USES YOUR IMAGE FROM THE PUBLIC FOLDER */}
            <img 
              src="/owl-icon.png" 
              alt="Perching Owl" 
              className="w-12 h-12 drop-shadow-[0_0_15px_rgba(255,191,0,0.8)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative border-b-2 transition-all duration-300 ${isFocused ? 'border-[#FFBF00] bg-[#FFBF00]/5' : 'border-stone-700 hover:border-stone-500'}`}>
        {Icon && (
          <Icon size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? 'text-[#FFBF00]' : 'text-stone-500'}`} />
        )}
        <input 
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full bg-transparent p-4 text-white outline-none transition-all placeholder:text-stone-600 ${Icon ? 'pl-12' : ''}`}
        />
      </div>
    </div>
  );
}
