"use client";

import { useState, useEffect } from "react";

const placeholders = [
  "Frontend Developer",
  "React Engineer",
  "Product Designer",
  "AI Engineer",
  "Dev-ops Engineer",
];

export function TypewriterInput() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isFocused) return; // user টাইপ করলে animation বন্ধ

    const currentWord = placeholders[wordIndex];
    let timeout;

    if (!isDeleting) {
      // টাইপ করছে
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);

        if (charIndex + 1 === currentWord.length) {
          // পুরো word লেখা হয়ে গেছে — একটু থেমে delete শুরু
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }, 80);
    } else {
      // delete করছে
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((w) => (w + 1) % placeholders.length);
        }
      }, 40);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, isFocused]);

  return (
    <div className="relative flex-1">
      {/* Animated placeholder — user টাইপ না করলে এবং focus না থাকলে দেখায় */}
      {!value && !isFocused && (
        <span
          className="pointer-events-none absolute inset-0 flex items-center text-sm select-none"
          style={{ color: "rgba(255,255,255,0.35)" }}
          aria-hidden
        >
          {displayText}
          {/* Blinking cursor */}
          <span className="ml-0.5 inline-block w-px h-4 bg-white/30 animate-pulse" />
        </span>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (!value) {
            // animation reset
            setCharIndex(0);
            setDisplayText("");
            setIsDeleting(false);
          }
        }}
        className="w-full bg-transparent px-0 py-3 text-sm text-white outline-none"
      />
    </div>
  );
}
