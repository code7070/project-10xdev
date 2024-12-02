"use client";

import { createContext } from "react";
import useSWR from "swr";
import { FetchService } from "./fetcher";
import { IUseAuth } from "@/types";

export const AuthContext = createContext({} as IUseAuth);

const fetch = new FetchService();

export default function useAuth(token: string = ""): IUseAuth {
  async function checkUser() {
    return await fetch.POST(`/user/get`, { token });
  }

  const { isLoading, data, mutate } = useSWR("/check-user", checkUser, {
    refreshInterval: 30000,
  });

  return { isLoading, data: data?.data, mutate };
}
