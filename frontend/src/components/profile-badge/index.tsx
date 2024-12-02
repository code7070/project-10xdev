"use client";

import { IUseAuth } from "@/types";
import { startTransition, useState } from "react";
import style from "@/styles/profile-badge.module.scss";
import { Loader } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { logoutService } from "@/services/logout.actions";
import { DashboardService } from "@/services/dashboard.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

const service = new DashboardService();

export default function ProfileBadge({ mutate, data, isLoading }: IUseAuth) {
  const dummy = service.dummyProfile();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  function toggle() {
    if (data?.id) setOpen((current) => !current);
    else router.push("/login");
  }

  const variantsMenu: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 10,
      transition: { staggerChildren: 0.15 },
    },
  };

  const variantsBtn: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  async function logout() {
    startTransition(async () => {
      toggle();
      await logoutService();
      if (typeof mutate === "function") mutate();
      toast.success("Logout Successful");
      setTimeout(() => {
        if (typeof window !== "undefined") window.location.reload();
      }, 500);
    });
  }

  let display = {
    name: dummy.name,
    photo: dummy.photo,
  };

  if (data?.id)
    display = {
      name: data.name!,
      photo: data.photo!,
    };

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 100 }}
        >
          <Button
            type="button"
            variant="appWhite"
            className={style.profileBadge}
            onClick={toggle}
          >
            <div className="font-bold">
              {isLoading ? "" : display.name?.split(" ").slice(0, 2).join(" ")}
            </div>
            <div className={style.photo}>
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <img
                  alt={display.name}
                  title={display.name}
                  src={display.photo}
                />
              )}
            </div>
          </Button>
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={variantsMenu}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={style.menu}
            >
              <motion.div variants={variantsBtn}>
                <Button variant="ghost" className="w-full">
                  Profile
                </Button>
              </motion.div>
              <motion.div variants={variantsBtn}>
                <Button
                  type="button"
                  className="w-full"
                  onClick={logout}
                  variant="destructive"
                >
                  Logout
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
