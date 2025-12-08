import { ReactNode } from "react";
import { toRGBA } from "../../utils";

export default function Tag({
  caption,
  color,
  icon,
}: {
  caption: string;
  color: string;
  icon?: ReactNode;
}) {
  return (
    <div
      className="font-medium text-sm leading-5 px-3 py-1.5 rounded-md gap-1.5 w-fit items-center flex"
      style={{ backgroundColor: toRGBA(color, 0.1), color }}
    >
      {icon || null}
      {caption}
    </div>
  );
}
