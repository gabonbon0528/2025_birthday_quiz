import { create } from "zustand";

interface QuizState {
  startTime: number | null;
  endTime: number | null;
  currentQuestion: number;
  answers: Record<number, string>;
  isQuizActive: boolean;
  startQuiz: () => void;
  endQuiz: () => void;
  setAnswer: (questionId: number, answer: string) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  startTime: null,
  endTime: null,
  currentQuestion: 0,
  answers: {},
  isQuizActive: false,
  startQuiz: () =>
    set({
      startTime: Date.now(),
      isQuizActive: true,
      currentQuestion: 0,
      answers: {},
    }),
  endQuiz: () =>
    set({
      endTime: Date.now(),
      isQuizActive: false,
    }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  resetQuiz: () =>
    set({
      startTime: null,
      endTime: null,
      currentQuestion: 0,
      answers: {},
      isQuizActive: false,
    }),
})); 