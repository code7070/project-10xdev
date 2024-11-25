import { ArrowUpRight } from "lucide-react";

const sizeSet = {
  sm: {
    arrow: "14px",
    circle: "22px",
  },
  md: {
    arrow: "24px",
    circle: "32px",
  },
  lg: {
    arrow: "32px",
    circle: "40px",
  },
};

interface ArrowProps {
  size?: keyof typeof sizeSet;
  arrowColor?: string;
  circleColor?: string;
}

export default function BrandArrow({
  size = "sm",
  arrowColor = "white",
  circleColor = "black",
}: ArrowProps) {
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: sizeSet[size].circle,
        height: sizeSet[size].circle,
        backgroundColor: circleColor,
      }}
    >
      <ArrowUpRight
        style={{
          width: sizeSet[size].arrow,
          height: sizeSet[size].arrow,
          color: arrowColor,
        }}
      />
    </div>
  );
}
