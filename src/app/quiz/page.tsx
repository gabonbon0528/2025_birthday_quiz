"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { questions } from "@/data/questions";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { shuffle } from "lodash";

const formSchema = z.object({
  answer: z.string().min(1, "請選擇一個答案"),
});

export default function QuizPage() {
  const router = useRouter();
  const { startTime, startQuiz, endQuiz, setAnswer, answers, setStartTime } =
    useQuizStore();
  const user = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.authLoaded);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questions>(
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!user.displayName) {
      router.push("/enter-name");
      return;
    }

    if (!startTime) {
      startQuiz();
    }

    const timer = setInterval(() => {
      if (startTime) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("quizState");
      }
    };
  }, [startTime, startQuiz, user, router, authLoaded]);

  useEffect(() => {
    const shuffled = shuffle(questions);
    setSelectedQuestions(shuffled.slice(0, 10));
  }, []);

  useEffect(() => {
    return () => {
      setStartTime(0);
    };
  }, [setStartTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: { answer: string }) => {
    const currentQuestion = selectedQuestions[Object.keys(answers).length];
    const isLast = Object.keys(answers).length === selectedQuestions.length - 1;

    if (isLast) {
      const allAnswers = { ...answers, [currentQuestion.id]: data.answer };
      const correctCount = Object.entries(allAnswers).reduce(
        (count, [id, answer]) => {
          const question = selectedQuestions.find((q) => q.id === parseInt(id));
          return count + (question?.correctAnswer === answer ? 1 : 0);
        },
        0
      );

      let canSave = true;
      try {
        // 查詢該 user 的 quizSessions 總數
        const q = query(
          collection(db, "quizSessions"),
          where("userId", "==", user?.uid)
        );
        const snap = await getDocs(q);
        if (snap.size >= 3) {
          canSave = false;
          alert("你已經有三次紀錄，這次不會再存入排行榜，但可以繼續挑戰！");
        }
        // 檢查是否超過 2025/5/28
        const now = new Date();
        const deadline = new Date("2025-05-28T23:59:59+08:00");
        if (now >= deadline) {
          canSave = false;
          alert("已超過活動截止日，這次不會再存入排行榜，但可以繼續挑戰！");
        }
      } catch (error) {
        console.error("Error checking quiz record count:", error);
      }

      if (canSave) {
        try {
          await addDoc(collection(db, "quizSessions"), {
            userId: user?.uid,
            userName: user?.displayName,
            correctCount,
            totalTime: elapsedTime,
            attemptCount: 1,
            createdAt: new Date(),
          });
        } catch (error) {
          console.error("Error saving quiz result:", error);
        }
      }

      setAnswer(currentQuestion.id, data.answer);
      endQuiz();
      router.push("/rank");
    } else {
      setAnswer(currentQuestion.id, data.answer);
    }
  };

  const currentQuestionIndex = Object.keys(answers).length;
  const currentQuestion = selectedQuestions[currentQuestionIndex];

  if (currentQuestionIndex === selectedQuestions.length) {
    return (
      <div className="relative min-h-screen bg-background py-8 px-4 overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom ">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-2">完成</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background py-8 px-4 overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom ">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">
            時間：{formatTime(elapsedTime)}
          </div>
          <div className="text-gray-600">
            題目 {currentQuestionIndex + 1} / {selectedQuestions.length}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {currentQuestion?.question}
            </h2>
            <div className="space-y-3">
              {currentQuestion?.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register("answer")}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.answer && (
              <p className="text-red-500 text-sm mt-2">
                {errors.answer.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg"
          >
            下一題
          </button>
        </form>
      </div>
    </div>
  );
}
