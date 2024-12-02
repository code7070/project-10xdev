import { FormEvent } from "react";
import { FetchService } from "./fetcher";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface ResponseLogin {
  status: number;
  data: {
    token: string;
    token_expires: string;
  };
}

export class AuthService {
  private fetch = new FetchService();

  constructor() {}

  async login(args: FormEvent<HTMLFormElement>) {
    const form = new FormData(args.currentTarget);
    const name = form.get("name") as string;
    const password = form.get("password") as string;

    const endpoint = `/user/login`;
    const res = (await this.fetch.POST(endpoint, {
      name,
      password,
    })) as ResponseLogin;

    if (res.status === 200) {
      toast.success("Login Successful");
      Cookies.set("pms-token", res.data.token, {
        expires: new Date(res.data.token_expires),
      });
    } else toast.error("Invalid Credentials");

    return res;
  }
}
