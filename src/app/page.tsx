import Image from "next/image";
import Link from "next/link";
import ClientQuizCount from "@/components/ClientQuizCount";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Gabonbon 的</h1>
        <h2 className="text-3xl font-bold">28歲生日祭</h2>
        <Image
          className="dark:invert"
          src="/IMG_2486.JPG"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ClientQuizCount />
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <Link
            href="/enter-name"
            className="w-full bg-primary text-white text-lg font-bold py-4 rounded-lg shadow hover:opacity-90 text-center transition"
          >
            去測驗
          </Link>
          <Link
            href="/rank"
            className="w-full bg-white border-2 border-primary text-primary text-lg font-bold py-4 rounded-lg shadow hover:bg-primary hover:text-white transition text-center"
          >
            去看排行
          </Link>
          <Link
            href="/profile"
            className="w-full bg-white border-2 border-primary text-primary text-lg font-bold py-4 rounded-lg shadow hover:bg-primary hover:text-white transition text-center"
          >
            去看個人成績
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* ...原本 footer ... */}
      </footer>
    </div>
  );
}
