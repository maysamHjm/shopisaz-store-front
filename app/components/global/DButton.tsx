import { MouseEventHandler, ReactNode } from "react";

export default function DButton({
  caption,
  onClick,
  disabled = false,
  loading = false,
  className,
  size,
  icon,
  type = "primary",
}: {
  caption: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  size: "large" | "xlarge";
  icon?: ReactNode;
  type?: "primary";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center active:shadow-[0_0_0_2px_rgba(0,0,0)] duration-300 cursor-pointer ${
        className || ""
      } ${
        size === "large"
          ? " px-5 py-3 h-12 gap-1.5 font-medium rounded-[10px]"
          : ""
      }
      ${
        size === "xlarge" ? " px-5 h-14 gap-1.5 font-medium rounded-[10px]" : ""
      }
      ${
        type === "primary"
          ? "bg-brand-primary text-white hover:bg-brand-primary-hover shadow-brand-primary/30"
          : ""
      }`}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {icon ? icon : null}
          {caption}
        </>
      )}
    </button>
  );
}
