import { ReactNode } from "react";
import { toRGBA } from "../../app/utils";

export default function Tag({
  caption,
  color,
  icon,
  size = "lg",
}: {
  caption: string;
  color: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div
      className={`font-medium gap-1.5 w-fit items-center flex
        ${size === "md" ? "text-sm leading-4 px-3 py-1.5 rounded-md h-8" : ""}
        ${size === "lg" ? "text-sm leading-5 px-4 py-2 rounded-md h-10" : ""}
      `}
      style={{ backgroundColor: toRGBA(color, 0.1), color }}
    >
      {icon || null}
      {caption}
    </div>
  );
}
