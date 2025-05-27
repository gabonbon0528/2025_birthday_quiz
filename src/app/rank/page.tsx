"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Firework from "@/components/Firework";
import Image from "next/image";

interface RankData {
  id: string;
  name: string;
  correctCount: number;
  totalTime: number;
  attemptCount: number;
}

export default function RankPage() {
  const [rankData, setRankData] = useState<RankData[] | null>(null);

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

  if (!rankData) {
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
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 z-10">
        <div className="flex justify-center items-center">
          <div className="w-full h-full pb-4">
            <Image
              src="/Chiikawa 兔兔戰鬥實力.webp"
              alt="background"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">排行榜</h1>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-center whitespace-nowrap">排名</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">姓名</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">
                答對題數
              </th>
              <th className="px-4 py-2 text-center whitespace-nowrap">
                完成時間
              </th>
            </tr>
          </thead>
          <tbody>
            {rankData?.map((rank, index) => (
              <tr key={rank.id} className="border-t">
                <td className="px-4 py-2 relative text-center">
                  {index < 3 && <Firework />}
                  {index + 1}
                </td>
                <td className="px-4 py-2">{rank.name}</td>
                <td className="px-4 py-2 text-center">{rank.correctCount}</td>
                <td className="px-4 py-2 text-center">
                  {formatTime(rank.totalTime)}
                </td>
              </tr>
            ))}
            {!rankData && (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  排行榜尚未有資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
