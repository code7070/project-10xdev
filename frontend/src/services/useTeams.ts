import useSWR from "swr";
import { FetchService } from "./fetcher";
import { RandomUser } from "@/types";

const fetch = new FetchService();

export function useTeamsList() {
  async function fetcher(): Promise<{
    results?: RandomUser[];
    error?: string;
  }> {
    return await fetch.GET("/random-user", { amount: 3000 });
  }

  const { data, isLoading, mutate } = useSWR("/teams/list", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  return { data, isLoading, mutate };
}
