"use client";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ClientQuizCount() {
  const user = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.authLoaded);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoaded || !user) return;
    const fetchCount = async () => {
      const q = query(collection(db, "quizSessions"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      setCount(snap.size);
    };
    fetchCount();
  }, [user, authLoaded]);

  if (!user || count === null) return null;

  return (
    <div className="text-lg text-primary font-semibold text-center">
      你已作答 {count} 次
    </div>
  );
} 