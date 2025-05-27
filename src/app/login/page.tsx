"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsInAppBrowser(
      userAgent.includes("instagram") || userAgent.includes("fbav")
    );
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push("/enter-name");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  if (isInAppBrowser) {
    return (
      <div className="relative min-h-screen bg-background py-8 px-4 overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FaInstagram className="text-4xl text-pink-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">請使用外部瀏覽器</h1>
          <p className="text-gray-600 mb-4">
            為了確保最佳的使用體驗，請使用 Chrome、Safari
            或其他外部瀏覽器開啟此網站。
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">如何開啟外部瀏覽器：</p>
            <ol className="text-left text-sm text-gray-600 list-decimal list-inside">
              <li>點擊右上角的三個點</li>
              <li>選擇「在瀏覽器中開啟」</li>
              <li>使用外部瀏覽器登入</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background py-8 px-4 overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-8">登入後即可參加測驗</h1>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-6 py-3 text-secondary hover:bg-gray-50 transition-colors"
        >
          <FaGoogle className="text-xl mr-3" />
          使用 Google 帳號登入
        </button>
      </div>
    </div>
  );
}
