"use client";

import { createContext } from "react";
import useSWR, { KeyedMutator } from "swr";
import { FetchService } from "./fetcher";

export interface IUserData {
  name?: string;
  photo?: string;
  id?: number;
}

export interface IResponse {
  status: number;
  data: IUserData;
}

export type mutateUserData = KeyedMutator<IUserData>;

interface IUseAuth {
  isLoading: boolean;
  data: IResponse;
  mutate: mutateUserData;
}

export interface IContextUserData extends IUserData {
  isLoading: boolean;
  mutate: mutateUserData;
}

export const AuthContext = createContext({} as IContextUserData);

const fetch = new FetchService();

export default function useAuth(token: string = ""): IUseAuth {
  async function checkUser() {
    return await fetch.POST(`/api/v1/user/get`, { token });
  }

  const { isLoading, data, mutate } = useSWR("/check-user", checkUser, {
    refreshInterval: 30000,
  });

  return { isLoading, data, mutate };
}
