"use client";

import { useEmployee } from "@/services/useEmployeeService";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader } from "lucide-react";
import { useMemo, useState } from "react";
import SelectEmployee from "./select-employee";
import { Employee } from "@/types";
import EmployeeAvatar from "./avatar";

export default function PopupSelectEmployee({
  onSelect,
}: {
  onSelect: (data: Partial<Employee>) => void;
}) {
  const { data, isLoading } = useEmployee({ isLogin: true });
  const [selected, setSelected] = useState<false | string>(false);

  const person = useMemo(() => {
    if (data && selected) {
      const item = data.find((i) => i.id === selected);
      return item;
    }
    return false;
  }, [data, selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          {selected && person ? (
            <>
              <EmployeeAvatar size="sm" {...person} />
              {person.name}
            </>
          ) : (
            "Assignment"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {isLoading && <Loader className="animate-spin size-3" />}
        {data && (
          <div className="grid grid-cols-2 gap-1 flex-wrap max-h-[200px] overflow-y-auto">
            <SelectEmployee
              list={data}
              selected={selected || ""}
              onSelect={(e) => {
                setSelected(e);
                const item = data.find((i) => i.id === e);
                if (item) onSelect(item);
              }}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
