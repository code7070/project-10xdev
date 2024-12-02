"use client";

import useSWR, { SWRConfiguration } from "swr";
import { FetchService } from "./fetcher";
import { ApiResponse, Project, Task, TaskProgress } from "@/types";
import { useEffect } from "react";
import { setTimeout } from "timers";

const fetchService = new FetchService();

type TProject = ApiResponse<Project[]>;
type TTask = ApiResponse<Task[]>;
type TProgress = ApiResponse<TaskProgress[]>;

const config: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  refreshInterval: 1000 * 60 * 3,
};

export function useProjectActive(isLogin: boolean) {
  async function fetcher(): Promise<Project[]> {
    if (isLogin) {
      return new Promise(async (resolve) => {
        const res = (await fetchService.GET("/project/active")) as TProject;
        setTimeout(() => {
          if (res.data) resolve(res.data);
          else resolve([]);
        }, 1500);
      });
    }
    return [];
  }

  const { data, isLoading, mutate } = useSWR(
    "/project/active",
    fetcher,
    config
  );

  useEffect(() => {
    if (isLogin) mutate();
  }, [isLogin, mutate]);

  return { data, isLoading, mutate };
}

export function useTaskSoon(isLogin: boolean) {
  async function fetcher(): Promise<Task[] | false> {
    if (isLogin) {
      return new Promise(async (resolve) => {
        const res = (await fetchService.GET("/task/due-soon")) as TTask;
        setTimeout(() => {
          resolve(res?.data || []);
        }, 1250);
      });
    }
    return false;
  }
  const { data, isLoading, mutate } = useSWR("/task/due-soon", fetcher, config);

  useEffect(() => {
    if (isLogin) mutate();
  }, [isLogin, mutate]);

  return { data, isLoading, mutate };
}

export function useTaskProgress(isLogin: boolean, date: string) {
  const endpoint = `/task/progress/${date}`;

  async function fetcher(): Promise<false | TaskProgress[] | []> {
    if (isLogin) {
      return new Promise(async (resolve) => {
        setTimeout(async () => {
          const res = (await fetchService.GET(endpoint)) as TProgress;
          if (res.data) resolve(res.data);
          else resolve([]);
        }, 1500);
      });
    }
    return false;
  }

  const { data, isLoading, mutate } = useSWR(endpoint, fetcher, config);

  useEffect(() => {
    if (isLogin) mutate();
  }, [isLogin, mutate]);

  return { data, isLoading, mutate };
}
