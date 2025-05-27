"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";

interface QuizSession {
  id: string;
  correctCount: number;
  totalTime: number;
  createdAt: { seconds: number };
}

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.authLoaded);
  const router = useRouter();
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      const q = query(
        collection(db, "quizSessions"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setSessions(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as QuizSession))
      );
      setLoading(false);
    };
    fetchData();
  }, [user, authLoaded, router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom">
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">個人成績</h1>
        {sessions.length === 0 ? (
          <div className="text-center text-gray-500">尚無測驗紀錄</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">日期</th>
                <th className="px-4 py-2 text-center">答對題數</th>
                <th className="px-4 py-2 text-center">完成時間</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(s.createdAt.seconds * 1000).toLocaleString(
                      "zh-TW",
                      { dateStyle: "short", timeStyle: "short" }
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">{s.correctCount}</td>
                  <td className="px-4 py-2 text-center">
                    {formatTime(s.totalTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
