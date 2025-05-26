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
import { collection, addDoc } from "firebase/firestore";

const formSchema = z.object({
  answer: z.string().min(1, "請選擇一個答案"),
});

export default function QuizPage() {
  const router = useRouter();
  const { startTime, startQuiz, endQuiz, setAnswer, answers } = useQuizStore();
  const user = useAuthStore((state) => state.user);
  const authLoaded = useAuthStore((state) => state.authLoaded);
  const [elapsedTime, setElapsedTime] = useState(0);

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
      endQuiz();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("quizState");
      }
    };
  }, [startTime, startQuiz, user, router, endQuiz]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: { answer: string }) => {
    const currentQuestion = questions[Object.keys(answers).length];
    setAnswer(currentQuestion.id, data.answer);

    if (Object.keys(answers).length === questions.length - 1) {
      const correctCount = Object.entries(answers).reduce(
        (count, [id, answer]) => {
          const question = questions.find((q) => q.id === parseInt(id));
          return count + (question?.correctAnswer === answer ? 1 : 0);
        },
        0
      );

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

      endQuiz();
      router.push("/rank");
    }
  };

  const currentQuestionIndex = Object.keys(answers).length;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="relative min-h-screen bg-background py-8 px-4 overflow-hidden bg-[url('/IMG_2486.JPG')] bg-contain bg-no-repeat bg-bottom ">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">
            時間：{formatTime(elapsedTime)}
          </div>
          <div className="text-gray-600">
            題目 {currentQuestionIndex + 1} / {questions.length}
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
