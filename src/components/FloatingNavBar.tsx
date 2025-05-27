"use client";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function FloatingNavBar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleQuizClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
    } else {
      router.push("/enter-name");
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-2xl z-50 bg-white/90 backdrop-blur border border-gray-200 shadow-lg rounded-2xl px-4 py-2 flex justify-center items-center" style={{boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)'}}>
      <div className="w-full flex items-center justify-between px-2 py-1">
        <Link
          href="/"
          aria-label="首頁"
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的IMG_2487.png"
            alt="Loading"
            width={40}
            height={40}
          />
          <span className="text-xs font-semibold drop-shadow-sm">首頁</span>
        </Link>
        <Link
          href="/enter-name"
          aria-label="開始測驗"
          onClick={handleQuizClick}
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/quiz" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的IMG_2487.png"
            alt="Loading"
            width={40}
            height={40}
          />
          <span className="text-xs font-semibold drop-shadow-sm">測驗</span>
        </Link>
        <Link
          href="/rank"
          aria-label="排行榜"
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/rank" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的IMG_2487.png"
            alt="Loading"
            width={40}
            height={40}
          />
          <span className="text-xs font-semibold drop-shadow-sm">排行</span>
        </Link>
        <Link
          href="/profile"
          aria-label="個人成績"
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/profile" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的IMG_2487.png"
            alt="Loading"
            width={40}
            height={40}
          />
          <span className="text-xs font-semibold drop-shadow-sm">成績</span>
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            aria-label="登出"
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors focus:outline-none"
          >
            <Image
              src="/去背的IMG_2487.png"
              alt="Loading"
              width={40}
              height={40}
            />
            <span className="text-xs font-semibold drop-shadow-sm">登出</span>
          </button>
        ) : (
          <Link
            href="/login"
            aria-label="登入"
            className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
              pathname === "/login" ? "text-primary" : ""
            }`}
          >
            <Image
              src="/去背的IMG_2487.png"
              alt="Loading"
              width={40}
              height={40}
            />
            <span className="text-xs font-semibold drop-shadow-sm">登入</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
