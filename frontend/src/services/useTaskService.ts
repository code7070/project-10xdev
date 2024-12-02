import { ApiResponse, Employee, Task } from "@/types";
import { FetchService } from "./fetcher";
import useSWR, { SWRConfiguration } from "swr";
import { useEffect } from "react";

const fetch = new FetchService();

const config: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  refreshInterval: 1000 * 60 * 3,
};

export default function useTaaskList({ isLogin }: { isLogin: boolean }) {
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

export async function createTask(
  data = { name: "", due_date: "", employee_id: "", project_id: "" }
) {
  const payload = {
    name: data.name,
    due_date: data.due_date,
    employee_id: data.employee_id,
    project_id: data.project_id,
  };
  const res = (await fetch.POST("/task/create", payload)) as ApiResponse<Task>;
  return res;
}
