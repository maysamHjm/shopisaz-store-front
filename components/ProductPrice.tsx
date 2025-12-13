"use client";

import { useProductStore } from "@/stores/product";
import { useEffect } from "react";

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
