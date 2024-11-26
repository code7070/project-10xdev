"use client";

import useAuth, { AuthContext } from "@/services/useAuth";
import { ReactNode } from "react";

export default function AuthWrapper({
  children,
  token = "",
}: {
  children: ReactNode;
  token: string;
}) {
  const { data, isLoading, mutate } = useAuth(token);
  return (
    <AuthContext.Provider value={{ ...data?.data, isLoading, mutate }}>
      {children}
    </AuthContext.Provider>
  );
}
