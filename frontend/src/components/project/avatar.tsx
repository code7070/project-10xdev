import { Employee } from "@/types";

interface AvatarProps extends Partial<Employee> {
  size?: "sm" | "md" | "lg";
}

const sizing = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export default function EmployeeAvatar({
  id,
  name,
  photo,
  size = "md",
}: AvatarProps) {
  return (
    <img
      alt={name}
      title={name}
      src={photo}
      className={`${sizing[size]} rounded-full border-2 border-white aspect-square`}
    />
  );
}
