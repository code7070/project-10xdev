import { AnimatePresence, motion } from "framer-motion";
import { Loader, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../ui/button";

export default function DashboardSearch() {
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debounced = useDebouncedCallback(async (term: string) => {
    if (term) {
      setSearching(true);
      console.log("Searching ", term);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearching(false);
    }
  }, 500);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target?.value || "";
    setSearchTerm(value);
    debounced(value);
  }

  return (
    <section className="w-full">
      <div className="relative flex max-w-[520px] mx-auto border border-gray-400 rounded-full p-1 bg-white">
        <input
          type="text"
          className=" text-gray-400 flex-1 block !ring-transparent !border-transparent !outline-none !ring-offset-transparent"
          placeholder="Search project, tasks, anything..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Button
          type="button"
          className="!w-28 !h-12 bg-black text-white rounded-full"
        >
          <Search className="!size-5" />
        </Button>
        <AnimatePresence>
          {searching && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="absolute left-[50%] top-full w-[90%] rounded-b-full py-1 px-5 bg-white/40 border border-gray-400 -z-[1] text-xs"
            >
              <div className="flex gap-1 items-center">
                <Loader className="size-3 animate-spin" /> Searching...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
