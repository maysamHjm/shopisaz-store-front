"use client";

import { ReactNode, useState } from "react";
import Select, { SingleValue } from "react-select";
import DSelect from "./global/DSelect";

type Option = {
  value: string;
  label: string | ReactNode;
};

export default function ProductVariation() {
  const options: Option[] = [
    { value: "chocolate", label: <p className="text-red-500">fsdsdsd</p> },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-primary font-medium leading-6">
          Sizes and Styles <span className="text-error">*</span>
        </label>
        <DSelect
          isClearable
          value={selectedOption}
          onChange={(newValue: SingleValue<Option>) => {
            console.log(newValue);
            setSelectedOption(newValue);
          }}
          options={options}
          placeholder="Select size and style"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-primary font-medium leading-6">
          Color <span className="text-error">*</span>
        </label>
        <DSelect
          isClearable
          value={selectedOption}
          onChange={(newValue: SingleValue<Option>) => {
            console.log(newValue);
            setSelectedOption(newValue);
          }}
          options={options}
          placeholder="Select a color"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-primary font-medium leading-6">
          Quantity <span className="text-error">*</span>
        </label>
        <div className="border border-solid border-secondary-border rounded-lg h-12 flex items-center">
          <button className="h-12 w-12 flex items-center justify-center">
            <span className="material-symbols-rounded">remove</span>
          </button>
          <input
            readOnly
            className="flex-1 text-primary text-center outline-none"
            value={1}
          />
          <button className="h-12 w-12 flex items-center justify-center">
            <span className="material-symbols-rounded">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
