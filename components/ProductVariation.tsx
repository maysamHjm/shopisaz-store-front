"use client";

import { ReactNode, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import DSelect from "./global/DSelect";
import { ProductDetail } from "../types/product.types";
import { useProductStore } from "@/stores/product";

type Option = {
  value: string;
  label: string | ReactNode;
};

export interface ExtractedVariants {
  minVariantId: number | null;
  minPrice: number | null;
  minSellPrice: number | null;
  variations: Record<
    string,
    {
      value: string;
      isDefault: boolean;
    }[]
  >;
}

export function extractVariantOptions(
  variants: ProductDetail.Variation[]
): ExtractedVariants {
  // Handle empty variant list
  if (!variants || variants.length === 0) {
    return {
      minVariantId: null,
      minPrice: null,
      minSellPrice: null,
      variations: {},
    };
  }

  // Find the cheapest variant based on sellPrice
  const minVariant = variants.reduce((min, v) =>
    v.sellPrice < min.sellPrice ? v : min
  );

  // Collect unique option values for each variation title
  const variationMap: Record<string, Set<string>> = {};

  for (const variant of variants) {
    for (const v of variant.values) {
      if (!variationMap[v.title]) {
        variationMap[v.title] = new Set();
      }
      variationMap[v.title].add(v.value);
    }
  }

  // Convert Set to Array and mark default (based on minVariant)
  const finalMap: ExtractedVariants["variations"] = {};

  for (const title in variationMap) {
    finalMap[title] = [...variationMap[title]].map((optionValue) => ({
      value: optionValue,
      isDefault: minVariant.values.some((v) => v.value === optionValue),
    }));
  }

  return {
    minVariantId: minVariant.id,
    minPrice: minVariant.price,
    minSellPrice: minVariant.sellPrice,
    variations: finalMap,
  };
}

export default function ProductVariation({
  variants,
}: {
  variants: ProductDetail.Variation[];
}) {
  const variantOptions = extractVariantOptions(variants);

  const { setOption, resolvePrice, selectedOptions } = useProductStore();

  const handleChange = (title: string, newValue: SingleValue<Option>) => {
    if (!newValue) return;

    setOption(title, newValue.value);

    resolvePrice(
      variants,
      variantOptions.minSellPrice // fallback
    );
  };

  useEffect(() => {
    for (const [title, options] of Object.entries(variantOptions.variations)) {
      const def = options.find((o) => o.isDefault);
      if (def) {
        setOption(title, def.value);
      }
    }

    resolvePrice(variants, variantOptions.minSellPrice);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(variantOptions.variations).map(
        ([variantTitle, options]) => {
          // find currently selected
          const selected = selectedOptions[variantTitle];

          // controlled value for DSelect
          const value: Option | null = selected
            ? { value: selected, label: selected }
            : options.find((o) => o.isDefault)
            ? {
                value: options.find((o) => o.isDefault)!.value,
                label: options.find((o) => o.isDefault)!.value,
              }
            : null;
          return (
            <div className="flex flex-col gap-2">
              <label className="text-primary font-medium leading-6 first-letter:uppercase">
                {variantTitle} <span className="text-error">*</span>
              </label>
              <DSelect
                value={value}
                onChange={(newValue) => handleChange(variantTitle, newValue)}
                options={options.map((o) => ({
                  value: o.value,
                  label: o.value,
                }))}
                placeholder={`Select ${variantTitle}`}
              />
            </div>
          );
        }
      )}

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
