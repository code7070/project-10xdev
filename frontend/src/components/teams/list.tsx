"use client";

import { useTeamsList } from "@/services/useTeams";
import { RandomUser } from "@/types";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";

export default function TeamsList() {
  const { data, isLoading } = useTeamsList();

  const [list, setList] = useState<RandomUser[]>([]);
  const [showHeader, setShowHeader] = useState(false);

  const [isPending, startTransition] = useTransition();

  function copyData() {
    setShowHeader(true);
    startTransition(() => {
      setList(data?.results || []);
    });
  }

  function reload() {
    if (typeof window !== "undefined") window.location.reload();
  }

  return (
    <div className="space-y-3">
      {isLoading && (
        <div className="flex text-sm gap-2 items-center">
          <Loader className="size-5 animate-spin" /> Tunggu yah...
        </div>
      )}
      {data?.error && (
        <div className="flex flex-col gap-4">
          <div className="text-red-500 w-full max-w-2xl">{data.error}</div>
          <div>
            <Button onClick={reload}>Reload Page</Button>
          </div>
        </div>
      )}
      {showHeader ? (
        <div>Yay! We have {data?.results?.length} members 🎉</div>
      ) : (
        data &&
        data?.results && (
          <Button onClick={copyData} disabled={isLoading}>
            <span>Show {data?.results?.length} Members</span>
          </Button>
        )
      )}
      {isPending ? (
        <Loader className="size-14 animate-spin" />
      ) : (
        <div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.2, staggerChildren: 0.25 },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {list.map((i) => (
            <div
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 5 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              key={i.login.uuid}
              className="bg-gray-100 p-3 border-2 border-b-gray-300 rounded-app-radius flex gap-2"
            >
              <img
                alt={`${i.name.first} ${i.name.last}`}
                src={i.picture.large}
                className="block size-10 rounded-full"
              />
              <div>
                {i.name.first} {i.name.last}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
