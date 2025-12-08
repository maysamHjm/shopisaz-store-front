import { ChangeEvent } from "react";

export default function DInput({
  value,
  onChange,
  type = "text",
  placeholder,
  classNames,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  classNames?: { container: string; input: string };
}) {
  return (
    <div
      className={`border border-solid border-secondary-border rounded-lg h-12 hover:border-brand-primary! duration-300 focus-within:shadow-[0_0_0_2px_rgb(0,0,0)] focus-within:border-brand-primary focus-within:shadow-brand-primary/30  ${
        classNames?.container || ""
      }`}
    >
      <input
        type={type}
        placeholder={placeholder}
        className={`h-full w-full p-3 outline-none ${classNames?.input || ""}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
