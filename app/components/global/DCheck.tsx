const CheckSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={7} fill="none">
    <path
      fill="#FAFAFA"
      d="M3.085 5.119 8.028.175A.56.56 0 0 1 8.437 0a.56.56 0 0 1 .408.175.568.568 0 0 1 .175.416c0 .16-.058.299-.175.415L3.493 6.373a.56.56 0 0 1-.408.175.56.56 0 0 1-.409-.175L.168 3.865A.543.543 0 0 1 0 3.449a.595.595 0 0 1 .183-.416.568.568 0 0 1 .415-.175c.16 0 .3.059.416.175l2.07 2.086Z"
    />
  </svg>
);

export default function DCheck({
  onChange,
  checked,
  caption,
  className,
}: {
  onChange?: (checked: boolean) => void;
  checked: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      onClick={() => onChange?.(!checked)}
      className={`flex gap-2 items-center cursor-pointer ${className || ""}`}
    >
      <div
        className={`h-5 w-5 border border-solid border-secondary-border hover:border-brand-primary rounded-sm flex items-center justify-center duration-300 active:shadow-[0_0_0_2px_rgb(0,0,0)] active:shadow-brand-primary/30 ${
          checked ? "bg-brand-primary" : ""
        }`}
      >
        {checked && <CheckSvg />}
      </div>
      {caption && <div className="text-primary">{caption}</div>}
    </div>
  );
}
