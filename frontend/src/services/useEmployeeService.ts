import { ApiResponse, Employee } from "@/types";
import { FetchService } from "./fetcher";
import useSWR, { SWRConfiguration } from "swr";
import { useEffect } from "react";

const fetch = new FetchService();

const config: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  refreshInterval: 1000 * 60 * 3,
};

export function useEmployee({ isLogin }: { isLogin: boolean }) {
  async function fetcher(): Promise<Employee[] | false> {
    if (isLogin) {
      const res = (await fetch.GET("/employee/get-all")) as ApiResponse<
        Employee[]
      >;
      return res.data;
    }
    return false;
  }

  const { data, isLoading, mutate } = useSWR("/employee/list", fetcher, config);

  useEffect(() => {
    if (isLogin) mutate();
  }, [mutate, isLogin]);

  return { data, isLoading, mutate };
}
