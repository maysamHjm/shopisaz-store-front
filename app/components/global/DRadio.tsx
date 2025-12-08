export default function DRadio({
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
        className={`h-5 w-5 border border-solid border-secondary-border hover:border-brand-primary duration-300 rounded-full flex items-center justify-center active:shadow-[0_0_0_2px_rgb(0,0,0)] active:shadow-brand-primary/30 ${
          checked ? "bg-brand-primary " : "bg-white"
        }`}
      >
        {checked && <div className="bg-white h-2 w-2 rounded-full"></div>}
      </div>
      {caption && <div className="text-primary">{caption}</div>}
    </div>
  );
}
