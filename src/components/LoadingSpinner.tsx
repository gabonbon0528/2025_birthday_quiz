"use client";
import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="animate-spin flex justify-center items-center h-full w-full py-12">
      <Image src="/去背的Chiikawa 角色介紹.png" alt="Loading" width={100} height={100} />
    </div>
  );
} 