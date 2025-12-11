"use client";

import { useEffect } from "react";
import { useProductStore } from "../stores/product";

export default function DynamicPrice() {
  const { finalSellPrice } = useProductStore();

  useEffect(() => {
    if (finalSellPrice && finalSellPrice > 0) {
      const el = document.getElementById("ssr-price");
      if (el) el.textContent = String(finalSellPrice);
    }
  }, [finalSellPrice]);

  return null;
}
