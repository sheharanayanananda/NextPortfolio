"use client";

import { useState, useEffect } from "react";

const WORDS = ["Hello!", "Moi!"];

export default function TypingText() {
  const [typingText, setTypingText] = useState("Hello!");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(2000);

  useEffect(() => {
    const i = loopNum % WORDS.length;
    const fullText = WORDS[i];

    const handleType = () => {
      if (!isDeleting) {
        setTypingText(fullText.substring(0, typingText.length + 1));
        setTypingSpeed(100 + Math.random() * 80);
        if (typingText === fullText) {
          setTypingSpeed(2500);
          setIsDeleting(true);
        }
      } else {
        setTypingText(fullText.substring(0, typingText.length - 1));
        setTypingSpeed(50 + Math.random() * 30);
        if (typingText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(700);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="flex items-center">
      {typingText}
      <span className="inline-block w-[2px] md:w-[3px] h-[0.95em] rounded-full bg-current ml-[2px] custom-cursor-blink" />
    </span>
  );
}
