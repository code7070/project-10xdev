"use client";

import useSWR, { SWRConfiguration } from "swr";
import { FetchService } from "./fetcher";
import { useEffect } from "react";
import { ApiResponse, IResponse, ProjectDetail } from "@/types";
import { z } from "zod";

const fetch = new FetchService();

const config: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  refreshInterval: 1000 * 60 * 3,
};

type TProjectList = ApiResponse<string[]>;
type TProjectDetail = ApiResponse<ProjectDetail>;

export default function useProjectList(isLogin: boolean) {
  async function fetcher(): Promise<false | TProjectList> {
    if (isLogin) {
      const res = (await fetch.GET("/project")) as TProjectList;
      return res;
    }
    return false;
  }

  const { data, isLoading, mutate } = useSWR("/project/list", fetcher, config);

  useEffect(() => {
    if (isLogin) mutate();
  }, [mutate, isLogin]);

  return { data, isLoading, mutate };
}

export function useProjectDetail(isLogin: boolean, id: string) {
  async function fetcher(): Promise<false | TProjectDetail> {
    if (isLogin) {
      const res = (await fetch.GET(`/project/detail/${id}`)) as TProjectDetail;
      return res;
    }
    return false;
  }

  const { data, isLoading, mutate, isValidating } = useSWR(
    `/project/detail/${id}`,
    fetcher,
    config,
  );

  useEffect(() => {
    if (isLogin) mutate();
  }, [mutate, isLogin]);

  return { data, isLoading, mutate, isValidating };
}

interface TaskSet {
  name: string;
  due_date: string;
}

interface ProjectSet {
  description: string;
  due_date: string;
  tasks: TaskSet[];
}

export async function useAIDescription(
  projectName: string,
): Promise<IResponse<ProjectSet>> {
  const res = (await fetch.GET("/project/generate-ai", {
    projectName,
  })) as IResponse<ProjectSet>;
  return res;
}

export async function generateProjectByAI(projectName: string) {
  const res = (await fetch.GET("/project/generate-ai", {
    projectName,
  })) as IResponse<ProjectSet>;
  return res;
}
