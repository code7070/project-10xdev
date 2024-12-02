"use client";

import { AuthService } from "@/services/auth.service";
import { mutateUserData } from "@/types";
import { ArrowUpRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";
import { Button } from "../ui/button";

const authService = new AuthService();

export default function Login({}: { mutate?: mutateUserData; token?: string }) {
  const [flip, setFlip] = useState(false);
  const [see, setSee] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await authService.login(e);
    if (mutate) mutate("/check-user");
    router.refresh();
    setLoading(false);
  }

  return (
    <main className="h-screen container mx-auto max-w-sm flex flex-col gap-10 justify-center items-center">
      <div
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: `rotateY(${flip ? 180 : 0}deg)`,
        }}
        className="w-full relative transition-transform duration-500 "
      >
        <form
          onSubmit={login}
          className={`flex flex-col gap-4 bg-gray-700 text-gray-100 p-5 w-full rounded-app-radius border-2`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue="jojo ganteng"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue="Abcd.987"
          />
          <div className="flex flex-col gap-3 mt-8">
            <Button type="submit" variant="appPrimary" disabled={loading}>
              {loading ? <Loader className="size-4 animate-spin" /> : "Login"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setFlip(true)}>
              Register <ArrowUpRight className="size-5" />
            </Button>
          </div>
        </form>

        {/*  */}

        <form
          className={`absolute left-0 top-0 size-full flex flex-col gap-4 bg-stone-800 text-gray-100 p-5 w-full rounded-app-radius transition-transform duration-500 border-2`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <input name="name" type="text" placeholder="Name" />
          <div className="relative w-full">
            <input
              name="password"
              type={see ? "text" : "password"}
              placeholder="Password"
              className="w-full"
            />
            <button
              type="button"
              className="absolute top-0 right-0 !w-auto"
              onClick={() => setSee((c) => !c)}
            >
              {see ? "🥽" : "👀"}
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <Button type="button" variant="appPrimary">
              Register
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setFlip(false)}
            >
              Login <ArrowUpRight className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
