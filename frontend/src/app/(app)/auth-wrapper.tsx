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
  const auth = useAuth(token);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
