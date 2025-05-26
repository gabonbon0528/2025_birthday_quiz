"use client";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthLoaded = useAuthStore((state) => state.setAuthLoaded);
  const authLoaded = useAuthStore((state) => state.authLoaded);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoaded(true);
    });
    return () => unsubscribe();
  }, [setUser, setAuthLoaded]);

  if (!authLoaded) {
    return <div />; // 或 loading spinner
  }

  return <>{children}</>;
} 