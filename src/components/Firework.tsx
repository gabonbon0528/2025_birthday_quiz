"use client";
import { useMemo } from "react";

const EMOJIS = ["✨", "🎉", "🎊"];
const COLORS = ["#ffb300", "#ff4081", "#7c4dff", "#00bcd4", "#76ff03"];

function randomInt(n: number) {
  return Math.floor(Math.random() * n);
}

export default function Firework() {
  // 產生 6 個煙火碎片，每個隨機 emoji、顏色、角度
  const pieces = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60) + randomInt(20) - 10; // 360/6=60度，微隨機
        const emoji = EMOJIS[randomInt(EMOJIS.length)];
        const color = COLORS[randomInt(COLORS.length)];
        return { angle, emoji, color, key: i };
      }),
    []
  );

  return (
    <span className="absolute left-1/2 top-1/2 pointer-events-none select-none" style={{ zIndex: 2 }}>
      {pieces.map(({ angle, emoji, color, key }) => (
        <span
          key={key}
          className="absolute animate-firework-burst"
          style={{
            color,
            fontSize: "1rem",
            left: 0,
            top: 0,
            // 用 CSS 變數傳遞角度
            ["--angle" as string]: `${angle}deg`,
          }}
        >
          {emoji}
        </span>
      ))}
      <style jsx>{`
        .animate-firework-burst {
          animation: firework-burst 1.2s infinite linear;
          transform-origin: 0 0;
        }
        @keyframes firework-burst {
          0% { opacity: 0.5; transform: rotate(var(--angle)) scale(0.7) translate(0, 0); }
          60% { opacity: 1; transform: rotate(var(--angle)) scale(1.2) translate(12px, 0); }
          100% { opacity: 0; transform: rotate(var(--angle)) scale(1) translate(18px, 0); }
        }
      `}</style>
    </span>
  );
} 