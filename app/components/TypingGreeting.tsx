"use client";

import { useState, useEffect, useRef } from "react";

export default function TypingGreeting() {
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("Hello!");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isResting, setIsResting] = useState(true);

  const words = ["Hello!", "Moi!", "Hei!"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentWord = words[wordIndex % words.length];

    let timeoutId: NodeJS.Timeout;

    if (isResting) {
      // Resting on a fully typed word before backspacing
      timeoutId = setTimeout(() => {
        setIsResting(false);
        setIsDeleting(true);
      }, 2800);
    } else if (isDeleting) {
      // Smooth, crisp backspacing rhythm
      if (typingText.length > 0) {
        const deleteSpeed = 45 + Math.random() * 25;
        timeoutId = setTimeout(() => {
          setTypingText(currentWord.substring(0, typingText.length - 1));
        }, deleteSpeed);
      } else {
        // Brief pause when empty before typing next word
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
        timeoutId = setTimeout(() => {}, 350);
      }
    } else {
      // Natural organic human typing rhythm
      if (typingText.length < currentWord.length) {
        const nextChar = currentWord[typingText.length];
        // Slightly longer pause for punctuation or initial char, fast flow for normal letters
        const baseSpeed = nextChar === "!" ? 180 : typingText.length === 0 ? 140 : 85;
        const typeSpeed = baseSpeed + Math.random() * 55;

        timeoutId = setTimeout(() => {
          setTypingText(currentWord.substring(0, typingText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing current word, enter resting state
        setIsResting(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [typingText, isDeleting, isResting, wordIndex, mounted]);

  if (!mounted) {
    return <span className="inline-block">Hello!</span>;
  }

  return (
    <>
      <style>{`
        @keyframes cursor-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        .animate-cursor-pulse {
          animation: cursor-pulse 1.1s ease-in-out infinite;
        }
      `}</style>
      <span className="inline-flex items-center">
        <span>{typingText}</span>
        <span
          className={`inline-block w-[2.5px] md:w-[3px] h-[0.95em] bg-[var(--accent-rust)] rounded-full ml-1.5 translate-y-[0.02em] select-none ${
            isResting ? "animate-cursor-pulse" : "opacity-100"
          }`}
          aria-hidden="true"
        />
      </span>
    </>
  );
}
