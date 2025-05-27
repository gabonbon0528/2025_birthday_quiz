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
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-t border-gray-200 shadow-t">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-2">
        <Link
          href="/"
          aria-label="首頁"
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的Chiikawa 角色介紹.png"
            alt="Loading"
            width={22}
            height={22}
          />
          <span className="text-xs">首頁</span>
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
            src="/去背的Chiikawa 角色介紹.png"
            alt="Loading"
            width={22}
            height={22}
          />
          <span className="text-xs">測驗</span>
        </Link>
        <Link
          href="/rank"
          aria-label="排行榜"
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/rank" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的Chiikawa 角色介紹.png"
            alt="Loading"
            width={22}
            height={22}
          />
          <span className="text-xs">排行</span>
        </Link>
        <Link
          href="/profile"
          aria-label="個人成績"
          className={`flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors ${
            pathname === "/profile" ? "text-primary" : ""
          }`}
        >
          <Image
            src="/去背的Chiikawa 角色介紹.png"
            alt="Loading"
            width={22}
            height={22}
          />
          <span className="text-xs">成績</span>
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            aria-label="登出"
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors focus:outline-none"
          >
            <Image
              src="/去背的Chiikawa 角色介紹.png"
              alt="Loading"
              width={22}
              height={22}
            />
            <span className="text-xs">登出</span>
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
              src="/去背的Chiikawa 角色介紹.png"
              alt="Loading"
              width={22}
              height={22}
            />
            <span className="text-xs">登入</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
