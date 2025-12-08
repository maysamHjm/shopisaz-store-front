"use client";
import { useState } from "react";
import Input from "./global/DInput";
import DSelect, { DSelectOption } from "./global/DSelect";
import DCheck from "./global/DCheck";
import PersonalizationCheckbox from "./PersonalizationCheckbox";
import PersonalizationRadio from "./PersonalizationRadio";

export default function ProductPersonalization() {
  const [selected, setSelected] = useState<DSelectOption | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-primary font-medium leading-6">
          Text Print <span className="text-error">*</span>
        </label>
        <Input value={"11"} onChange={() => {}} />
        <span className="text-sm text-tertiary">
          Organic Cotton Baby Romper Set - Soft & Comfortable Newborn Essentials
          with Snap Closures, Hypoallergenic Fabric for Sensitive Skin, Perfect
          for Daily Wear and Special Occasions
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-primary font-medium leading-6">
          Material <span className="text-error">*</span>
        </label>
        <DSelect options={[]} value={selected} onChange={setSelected} />
        <span className="text-sm text-tertiary">
          Pick the material for this t-shirt”
        </span>
      </div>
      <PersonalizationCheckbox
        checked
        onChange={() => {}}
        title="Head flower"
        description="Buyer Instructions shows here"
        price="$2.15"
      />
      <PersonalizationCheckbox
        onChange={() => {}}
        title="Head flower"
        description="Buyer Instructions shows here"
        price="$2.15"
        image="dd"
      />
      <PersonalizationRadio
        checked
        onChange={() => {}}
        title="Head flower"
        description="Buyer Instructions shows here"
        price="$2.15"
      />
      <PersonalizationRadio
        onChange={() => {}}
        title="Head flower"
        description="Buyer Instructions shows here"
        price="$2.15"
      />
    </div>
  );
}
