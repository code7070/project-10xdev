"use client";

import Login from "@/components/login";
import useAuth, { AuthContext } from "@/services/useAuth";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

export default function AuthWrapper({
  children,
  token = "",
}: Readonly<{ children: ReactNode; token: string }>) {
  const { data, isLoading, mutate } = useAuth(token);
  if (isLoading && !data?.status)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <AuthContext.Provider value={{ ...data?.data, isLoading, mutate }}>
      {token ? children : <Login mutate={mutate} />}
    </AuthContext.Provider>
  );
}
