"use client";

import { useState, useEffect } from "react";

export default function TypingGreeting() {
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("Hello!");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(2000);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const words = ["Hello!", "Moi!"];
    const i = loopNum % words.length;
    const fullText = words[i];

    const handleType = () => {
      if (!isDeleting) {
        setTypingText(fullText.substring(0, typingText.length + 1));
        // Soft organic typing delay (100ms to 180ms)
        setTypingSpeed(100 + Math.random() * 80);

        if (typingText === fullText) {
          setTypingSpeed(2500); // Wait on completed word
          setIsDeleting(true);
        }
      } else {
        setTypingText(fullText.substring(0, typingText.length - 1));
        // Faster organic deletion delay (50ms to 80ms)
        setTypingSpeed(50 + Math.random() * 30);

        if (typingText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(700); // Pause before starting next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, loopNum, typingSpeed, mounted]);

  return (
    <>
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        .custom-cursor-blink {
          animation: cursor-blink 1.2s ease-in-out infinite !important;
        }
      `}</style>
      {!mounted ? (
        <span>Hello!</span>
      ) : (
        <span className="flex items-center">
          {typingText}
          <span className="inline-block w-[2px] md:w-[3px] h-[0.95em] rounded-full bg-current ml-[2px] custom-cursor-blink" />
        </span>
      )}
    </>
  );
}
