import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface RankData {
  id: string;
  name: string;
  correctCount: number;
  totalTime: number;
  attemptCount: number;
}

export async function GET() {
  try {
    const rankQuery = query(
      collection(db, "quizSessions"),
      orderBy("correctCount", "desc"),
      orderBy("totalTime", "asc"),
      limit(50)
    );

    const querySnapshot = await getDocs(rankQuery);
    const rankData: RankData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.userName || "匿名用戶",
        correctCount: data.correctCount,
        totalTime: data.totalTime,
        attemptCount: data.attemptCount,
      };
    });

    return NextResponse.json(rankData);
  } catch (error) {
    console.error("Error fetching rank data:", error);
    return NextResponse.json(
      { error: "Failed to fetch rank data" },
      { status: 500 }
    );
  }
} 