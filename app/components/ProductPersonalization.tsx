"use client";

import Input from "./global/DInput";
import DSelect from "./global/DSelect";
import PersonalizationCheckbox from "./PersonalizationCheckbox";
import PersonalizationRadio from "./PersonalizationRadio";
import { ProductDetail } from "../types/product.types";
import { useProductStore } from "../stores/product";
import { useEffect } from "react";

export default function ProductPersonalization({
  personalization,
}: {
  personalization: ProductDetail.Personalization[];
}) {
  const {
    setText,
    setDropdown,
    toggleCheckbox,
    setRadio,
    personalizations,
    setPersonalizationOrder,
  } = useProductStore();

  /* -------------------------------------------------------
    SET ORDER ONCE WHEN PERSONALIZATION ARRIVES
  ------------------------------------------------------- */
  useEffect(() => {
    if (personalization.length > 0) {
      setPersonalizationOrder(personalization.map((p) => p.id));
    }
  }, [personalization]);

  return (
    <div className="flex flex-col gap-6">
      {personalization.map((p) => {
        const type = Number(p.personalizationType);

        return (
          <div key={p.id} className="flex flex-col gap-2">
            <label className="text-primary font-medium leading-6 first-letter:uppercase">
              {p.personalizationName}
              {!p.optionalPersonalization && (
                <span className="text-error">*</span>
              )}
            </label>

            {/* TEXT INPUT */}
            {type === 1 && (
              <Input
                placeholder={p.buyerInstructions}
                onChange={(e) =>
                  setText(
                    p.id,
                    e.target.value,
                    p.sellPrice ?? 0,
                    p.personalizationName
                  )
                }
                value={personalizations[p.id]?.value ?? ""}
              />
            )}

            {/* DROPDOWN */}
            {type === 2 && (
              <DSelect
                value={
                  personalizations[p.id]?.itemId
                    ? {
                        value: personalizations[p.id]!.itemId!.toString(),
                        label:
                          p.items.find(
                            (x) => x.id === personalizations[p.id]!.itemId
                          )?.label ?? "",
                      }
                    : null
                }
                options={p.items.map((it) => ({
                  value: it.id.toString(),
                  label: it.label,
                }))}
                onChange={(v) =>
                  v &&
                  setDropdown(
                    p.id,
                    Number(v.value),
                    p.items.find((i) => i.id === Number(v.value))?.sellPrice ??
                      0,
                    p.personalizationName
                  )
                }
              />
            )}

            {/* CHECKBOX */}
            {type === 3 &&
              p.items.map((item) => (
                <PersonalizationCheckbox
                  key={item.id}
                  checked={
                    personalizations[p.id]?.items?.some(
                      (i) => i.itemId === item.id
                    ) ?? false
                  }
                  title={item.label}
                  description={p.buyerInstructions}
                  price={`$${item.sellPrice}`}
                  image={item.image?.url}
                  onChange={() =>
                    toggleCheckbox(
                      p.id,
                      item.id,
                      item.sellPrice || 0,
                      item.label,
                      p.personalizationName
                    )
                  }
                />
              ))}

            {/* RADIO */}
            {type === 4 &&
              p.items.map((item) => (
                <PersonalizationRadio
                  key={item.id}
                  checked={personalizations[p.id]?.itemId === item.id}
                  title={item.label}
                  description={p.buyerInstructions}
                  price={`$${item.sellPrice}`}
                  onChange={() =>
                    setRadio(
                      p.id,
                      item.id,
                      item.sellPrice || 0,
                      p.personalizationName
                    )
                  }
                />
              ))}

            <span className="text-xs text-tertiary">{p.buyerInstructions}</span>
          </div>
        );
      })}
    </div>
  );
}
