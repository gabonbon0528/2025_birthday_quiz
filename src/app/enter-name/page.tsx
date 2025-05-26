"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

export default function EnterNamePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.authLoaded);
  const [name, setName] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    setName(user.displayName || "");
  }, [user, router, authLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && user) {
      setUser(Object.assign(Object.create(Object.getPrototypeOf(user)), { ...user, displayName: name }));
      router.push("/quiz");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center"
      >
        <h1 className="text-2xl font-bold mb-6">請輸入您的姓名</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="請輸入姓名"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-colors font-semibold"
        >
          確認
        </button>
      </form>
    </div>
  );
} 