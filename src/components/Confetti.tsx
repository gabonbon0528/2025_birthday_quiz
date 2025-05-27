"use client";
import { useEffect, useRef } from "react";

const EMOJIS = ["🎉", "✨", "🎊", "🥳", "🎂", "🍰", "🧁", "🎈"];
const CONFETTI_COUNT = 30;

function randomInt(n: number) {
  return Math.floor(Math.random() * n);
}

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 觸發重繪
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
        const emoji = EMOJIS[randomInt(EMOJIS.length)];
        const left = Math.random() * 100;
        const duration = 2.5 + Math.random() * 2.5;
        const delay = Math.random() * 2;
        const size = 24 + Math.random() * 16;
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              fontSize: `${size}px`,
            }}
            className="absolute top-0 animate-confetti"
          >
            {emoji}
          </span>
        );
      })}
      <style jsx>{`
        .animate-confetti {
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 0.8; }
          80% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
} 