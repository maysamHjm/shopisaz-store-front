import { ReactNode } from "react";
import { SingleValue } from "react-select";
import Select from "react-select";

export type DSelectOption = {
  value: string;
  label: string | ReactNode;
};

export default function DSelect({
  value,
  onChange,
  options,
  placeholder,
  isClearable = false,
}: {
  value: DSelectOption | null;
  onChange: (newValue: SingleValue<DSelectOption>) => void;
  options: DSelectOption[];
  placeholder?: string;
  isClearable?: boolean;
}) {
  return (
    <Select
      isClearable={isClearable}
      classNames={{
        control: () => "h-12! rounded-lg! border-secondary-border!",
        indicatorSeparator: () => "hidden!",
        placeholder: () => "text-placeholder!",
        singleValue: () => "text-primary!",
        option: ({ isFocused, isSelected }) =>
          `
            cursor-pointer px-3 py-2
            ${isSelected ? "bg-brand! text-white" : ""}
            ${!isSelected && isFocused ? "bg-gray-100! text-black" : ""}
          `,
      }}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
}
