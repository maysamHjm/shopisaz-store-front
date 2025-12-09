import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";

export default function DTextButton({
  caption,
  onClick,
  disabled = false,
  loading = false,
  className,
  size,
  icon,
  postfix,
}: {
  caption: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  size: "md" | "large" | "xlarge";
  icon?: ReactElement<any>;
  postfix?: ReactElement<any>;
}) {
  const innerIcon = icon
    ? cloneElement(icon, {
        style: {
          fontSize: "inherit",
          lineHeight: "inherit",
        },
      })
    : null;
  const innerPostfix = postfix
    ? cloneElement(postfix, {
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
      className={`flex items-center justify-center active:shadow-[0_0_0_2px_rgba(0,0,0)] shadow-brand-primary/30 duration-100 cursor-pointer ${
        className || ""
      } 
      ${size === "md" ? "gap-1 font-medium text-sm rounded-lg" : ""}
      
     `}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {innerIcon ? (
            <span className={`${size === "md" ? "text-xl leading-5" : ""}`}>
              {innerIcon}
            </span>
          ) : null}
          {caption}
          {innerPostfix ? (
            <span className={`${size === "md" ? "text-xl leading-5" : ""}`}>
              {innerPostfix}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
}
