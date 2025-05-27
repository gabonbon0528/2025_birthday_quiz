"use client";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function ClientQuizCount() {
  const user = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.authLoaded);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoaded || !user) return;
    const fetchCount = async () => {
      const q = query(
        collection(db, "quizSessions"),
        where("userId", "==", user.uid)
      );
      const snap = await getDocs(q);
      setCount(snap.size);
    };
    fetchCount();
  }, [user, authLoaded]);

  if (!count)
    return (
      <div className="text-lg text-primary font-semibold text-center flex items-center">
        <Image
          src="/去背的Chiikawa 角色介紹.png"
          alt="登入後可查看作答次數"
          width={50}
          height={50}
        />
        <span className="text-md text-primary">Loading...</span>
      </div>
    );

  if (!user || count === null)
    return (
      <div className="text-lg text-primary font-semibold text-center flex items-center">
        <Image
          src="/去背的Chiikawa 角色介紹.png"
          alt="登入後可查看作答次數"
          width={50}
          height={50}
        />
        <Link href="/login" className="text-md text-primary">
          登入查看作答次數
        </Link>
      </div>
    );

  return (
    <div className="text-lg text-primary font-semibold text-center flex items-center">
      <Image
        src="/去背的Chiikawa 角色介紹.png"
        alt="登入後可查看作答次數"
        width={50}
        height={50}
      />
      已作答 {count} 次
    </div>
  );
}
