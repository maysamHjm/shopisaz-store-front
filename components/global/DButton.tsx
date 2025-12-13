import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";

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
  size: "md" | "large" | "xlarge";
  icon?: ReactElement<any>;
  type?: "primary" | "neutral";
}) {
  const innerIcon = icon
    ? cloneElement(icon, {
        style: {
          fontSize: "inherit",
          lineHeight: "inherit",
        },
      })
    : null;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center active:shadow-[0_0_0_2px_rgba(0,0,0)] duration-300 cursor-pointer ${
        className || ""
      } 
      ${
        size === "md"
          ? " px-3.5 py-2.5 h-10 gap-1 font-medium text-sm rounded-lg"
          : ""
      }
      ${
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
      }
      ${
        type === "neutral"
          ? "bg-white hover:border-brand-primary border border-transparent shadow-brand-primary/30"
          : ""
      }
     `}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {innerIcon ? (
            <span
              className={`flex items-center justify-center ${
                size === "md" ? "text-xl leading-5" : ""
              }`}
            >
              {innerIcon}
            </span>
          ) : null}
          {caption}
        </>
      )}
    </button>
  );
}
