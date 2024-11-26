"use client";

import { AuthContext } from "@/services/useAuth";
import { startTransition, useContext, useState } from "react";
import style from "@/styles/profile-badge.module.scss";
import { Loader } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { logoutService } from "@/services/logout.actions";
import { DashboardService } from "@/services/dashboard.service";

const service = new DashboardService();

export default function ProfileBadge() {
  const { name, photo, isLoading, mutate, id } = useContext(AuthContext);

  const dummy = service.dummyProfile();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggle() {
    setOpen((current) => !current);
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
      mutate();
    });
  }

  let display = {
    name: dummy.name,
    photo: dummy.photo,
  };

  if (id)
    display = {
      name: name!,
      photo: photo!,
    };

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 100 }}
        >
          <button type="button" className={style.profileBadge} onClick={toggle}>
            <div>
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
          </button>
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
              <motion.button
                variants={variantsBtn}
                className="btn-ghost !transition-none"
              >
                Profile
              </motion.button>
              <motion.button
                variants={variantsBtn}
                type="button"
                onClick={logout}
                className="btn-danger-outline !transition-none"
              >
                {loading ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  "Logout"
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
