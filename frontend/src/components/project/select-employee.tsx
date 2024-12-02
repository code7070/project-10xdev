import { Employee } from "@/types";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import EmployeeAvatar from "./avatar";

export default function SelectEmployee({
  list,
  selected,
  onSelect,
}: {
  list: Partial<Employee[]>;
  selected: string;
  onSelect: (data: string) => void;
}) {
  return (
    list &&
    list?.map((i) => (
      <Button
        type="button"
        variant="ghost"
        className={`flex flex-col justify-start bg-transparent hover:bg-gray-200 ${
          i?.id === selected && "!bg-app-green !text-white"
        }`}
        key={i?.id}
        onClick={() => {
          if (i && i.id) onSelect(i.id);
        }}
      >
        {i?.id === selected ? (
          <div className="size-10 flex items-center justify-center">
            <CheckCircle className="!size-6" />
          </div>
        ) : (
          <EmployeeAvatar {...i} key={i?.id} />
        )}
        <div className="line-clamp-1 w-full">{i?.name}</div>
      </Button>
    ))
  );
}
