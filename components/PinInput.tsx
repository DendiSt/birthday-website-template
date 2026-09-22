"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { motion } from "framer-motion";
import { Delete, Check } from "lucide-react";

interface PinInputProps {
  onSuccess: () => void;
  expectedHash: string;
}

// Function to hash string to SHA-256 hex
async function hashPin(pin: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PinInput({ onSuccess, expectedHash }: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const checkPin = async (currentPin: string) => {
    if (currentPin.length === 6) {
      const hashed = await hashPin(currentPin);
      if (hashed === expectedHash) {
        setError(false);
        onSuccess();
      } else {
        setError(true);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setPin(Array(6).fill(""));
        inputsRef.current[0]?.focus();
        
        if (newAttempts >= 5) {
          setLocked(true);
          setTimeout(() => {
            setLocked(false);
            setAttempts(0);
          }, 30000);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    // Take only the last character in case of multiple inputs quickly
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    const pinString = newPin.join("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!pin[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newPin = [...pin];
    for (let i = 0; i < pastedData.length; i++) {
      newPin[i] = pastedData[i];
    }
    setPin(newPin);
    
    if (pastedData.length === 6) {
      inputsRef.current[5]?.focus();
    } else {
      inputsRef.current[pastedData.length]?.focus();
    }
  };

  const handleNumpadClick = (value: string) => {
    if (locked) return;

    if (value === "backspace") {
      const lastFilledIndex = pin.map((p) => p !== "").lastIndexOf(true);
      if (lastFilledIndex >= 0) {
        const newPin = [...pin];
        newPin[lastFilledIndex] = "";
        setPin(newPin);
        setError(false);
      }
    } else if (value === "enter") {
      const pinString = pin.join("");
      if (pinString.length === 6) {
        checkPin(pinString);
      }
    } else {
      const firstEmptyIndex = pin.indexOf("");
      if (firstEmptyIndex >= 0) {
        const newPin = [...pin];
        newPin[firstEmptyIndex] = value;
        setPin(newPin);
        setError(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <motion.div 
        className="flex gap-1 sm:gap-4"
        animate={error ? "shake" : "default"}
        variants={{
          shake: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
          default: { x: 0 }
        }}
      >
        {pin.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el; }}
            type="password"
            inputMode="none" // Prevent native keyboard from popping up on mobile if they use numpad
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={locked}
            readOnly // Make it read-only so they rely on the numpad, preventing double keyboard on mobile
            className={`w-10 h-12 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 outline-none transition-all cursor-default select-none
              ${error ? "border-red-400 bg-red-50 text-red-500" : 
                digit ? "border-pink-500 bg-pink-50 text-pink-700 shadow-md" : 
                "border-pink-200 bg-white text-gray-700"
              }
              ${locked ? "opacity-50 cursor-not-allowed" : ""}
            `}
          />
        ))}
      </motion.div>

      <div className="h-4 sm:h-6">
        {error && !locked && (
          <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
            PIN salah, coba lagi ya!
          </p>
        )}
        {locked && (
          <p className="text-red-500 text-xs sm:text-sm font-medium">
            Tunggu 30 detik untuk mencoba lagi.
          </p>
        )}
      </div>

      <p className="text-pink-600 font-body text-sm font-medium -mb-2 mt-2 text-center">
        "pinnya tanggal jadian kita sayangg"
      </p>

      {/* Custom Numpad */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumpadClick(num.toString())}
            disabled={locked}
            className="w-full h-12 sm:h-14 bg-white border border-pink-100 shadow-sm hover:shadow-md hover:bg-pink-50 active:bg-pink-100 rounded-xl text-xl sm:text-2xl font-body font-bold text-pink-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleNumpadClick("backspace")}
          disabled={locked}
          className="w-full h-12 sm:h-14 bg-pink-50 border border-pink-100 shadow-sm hover:shadow-md hover:bg-pink-100 active:bg-pink-200 rounded-xl text-pink-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Delete className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button
          onClick={() => handleNumpadClick("0")}
          disabled={locked}
          className="w-full h-12 sm:h-14 bg-white border border-pink-100 shadow-sm hover:shadow-md hover:bg-pink-50 active:bg-pink-100 rounded-xl text-xl sm:text-2xl font-body font-bold text-pink-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          0
        </button>
        <button
          onClick={() => handleNumpadClick("enter")}
          disabled={locked || pin.indexOf("") !== -1}
          className="w-full h-12 sm:h-14 bg-pink-500 border border-pink-600 shadow-sm hover:shadow-md hover:bg-pink-600 active:bg-pink-700 rounded-xl text-white transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
    </div>
  );
}
