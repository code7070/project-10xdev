import { FormEvent } from "react";
import { FetchService } from "./fetcher";
import { toast } from "sonner";

export class AuthService {
  private fetch = new FetchService();

  constructor() {}

  async login(args: FormEvent<HTMLFormElement>) {
    const form = new FormData(args.currentTarget);
    const name = form.get("name") as string;
    const password = form.get("password") as string;

    const endpoint = `/api/v1/user/login`;
    const res = await this.fetch.POST(endpoint, { name, password });

    if (res.status === 200) toast.success("Login Successful");
    else toast.error("Invalid Credentials");

    return res;
  }
}
