"use client";

import { useProductStore } from "@/stores/product";

export default function ProductPurchaseSummary() {
  const { finalSellPrice, personalizations, personalizationOrder } =
    useProductStore();

  // build final list BY ORDER
  const list =
    personalizationOrder.length > 0
      ? personalizationOrder.map((pid) => personalizations[pid]).filter(Boolean)
      : Object.values(personalizations); // fallback

  // calculate prices
  const personalizationTotal = list.reduce((sum, p) => {
    if (p.type === 3 && p.items) {
      return sum + p.items.reduce((s, it) => s + it.price, 0);
    }
    return sum + p.price;
  }, 0);

  const total = (finalSellPrice ?? 0) + personalizationTotal;

  return (
    <div className="p-3 flex flex-col gap-3 rounded-lg border border-solid border-secondary-border text-primary">
      {/* PRODUCT PRICE */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-secondary">
          Product Price:
        </span>
        <span>${finalSellPrice?.toFixed(2) ?? "0.00"}</span>
      </div>

      {/* PERSONALIZATION ITEMS */}
      {list
        .filter((item) => item.price)
        .map((p) => {
          if (p.type === 3 && p.items) {
            return p.items.map((item) => (
              <div
                key={`${p.personalizationId}-${item.itemId}`}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium text-secondary">
                  + {item.label}
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ));
          }

          return (
            <div
              key={p.personalizationId}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-medium text-secondary">
                + {p.label}
              </span>
              <span>${p.price.toFixed(2)}</span>
            </div>
          );
        })}

      {/* DIVIDER */}
      {list.length > 0 && <div className="border-t border-t-secondary"></div>}

      {/* TOTAL */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-secondary">Total:</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
