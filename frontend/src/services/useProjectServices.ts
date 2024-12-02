"use client";

import useSWR, { SWRConfiguration } from "swr";
import { FetchService } from "./fetcher";
import { useEffect } from "react";
import { ApiResponse, IResponse, ProjectDetail } from "@/types";
import OpenAI from "openai";
import { z } from "zod";

const fetch = new FetchService();

const config: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  refreshInterval: 1000 * 60 * 3,
};

const tasks = z.array(
  z.object({
    name: z.string(),
    due_date: z.string(),
  })
);
const base = z.object({
  description: z.string(),
  due_date: z.string(),
  tasks: z.array(tasks),
});

type TProjectList = ApiResponse<string[]>;
type TProjectDetail = ApiResponse<ProjectDetail>;
type AICompletionMessage = OpenAI.Chat.Completions.ChatCompletionMessage;

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
    config
  );

  useEffect(() => {
    if (isLogin) mutate();
  }, [mutate, isLogin]);

  return { data, isLoading, mutate, isValidating };
}

export async function useAIDescription(
  projectName: string
): Promise<IResponse<z.infer<typeof base>>> {
  const res = (await fetch.GET("/project/generate-ai/description", {
    projectName,
  })) as IResponse<z.infer<typeof base>>;
  return res;
}
