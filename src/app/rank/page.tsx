"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Firework from "@/components/Firework";

interface RankData {
  id: string;
  name: string;
  correctCount: number;
  totalTime: number;
  attemptCount: number;
}

export default function RankPage() {
  const [rankData, setRankData] = useState<RankData[]>([]);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await fetch("/api/rank");
        const data = await response.json();
        setRankData(data);
      } catch (error) {
        console.error("Error fetching rank data:", error);
      }
    };

    fetchRankData();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!rankData || rankData.length === 0) {
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
      <div className="relative max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 z-10">
        <h1 className="text-2xl font-bold mb-6 text-center">排行榜</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">排名</th>
                <th className="px-4 py-2 text-left">姓名</th>
                <th className="px-4 py-2 text-center">答對題數</th>
                <th className="px-4 py-2 text-center">完成時間</th>
              </tr>
            </thead>
            <tbody>
              {rankData?.map((rank, index) => (
                <tr key={rank.id} className="border-t">
                  <td className="px-4 py-2 flex items-center">
                    <span className="relative inline-block">
                      {index < 3 && <Firework />}
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-2">{rank.name}</td>
                  <td className="px-4 py-2 text-center">{rank.correctCount}</td>
                  <td className="px-4 py-2 text-center">
                    {formatTime(rank.totalTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
