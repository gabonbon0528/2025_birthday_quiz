import Image from "next/image";
import Link from "next/link";
import ClientQuizCount from "@/components/ClientQuizCount";
import Firework from "@/components/Firework";
import Confetti from "@/components/Confetti";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <div className="absolute inset-0 -z-10" />
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start w-full relative">
        <Confetti />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${5 + Math.random() * 40}%`,
              pointerEvents: "none",
            }}
          >
            <Firework />
          </div>
        ))}
        <h1 className="text-4xl font-bold animate-fade-bounce">Gabonbon 的</h1>
        <h2 className="text-3xl font-bold animate-fade-bounce delay-200">
          28歲生日祭
        </h2>
        <Image
          className="dark:invert animate-pulse"
          src="/去背的IMG_2486.png"
          alt="Gabonbon"
          width={150}
          height={100}
          priority
        />
        <ClientQuizCount />
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <Link
            href="/enter-name"
            className="w-full bg-primary text-white text-lg font-bold py-4 rounded-lg shadow hover:opacity-90 text-center transition"
          >
            挑戰素霞
          </Link>
          <Link
            href="/rank"
            className="w-full bg-white border-2 border-primary text-primary text-lg font-bold py-4 rounded-lg shadow hover:bg-primary hover:text-white transition text-center"
          >
            查看英雄榜
          </Link>
          <Link
            href="/profile"
            className="w-full bg-white border-2 border-primary text-primary text-lg font-bold py-4 rounded-lg shadow hover:bg-primary hover:text-white transition text-center"
          >
            個人成績
          </Link>
        </div>
      </main>
    </div>
  );
}
