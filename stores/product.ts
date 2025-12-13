"use client";

import { create } from "zustand";
import type { ProductDetail } from "../types/product.types";

interface CheckboxItem {
  itemId: number;
  label: string;
  price: number;
}

interface PersonalizationSelection {
  personalizationId: number;
  type: 1 | 2 | 3 | 4; // text / dropdown / checkbox / radio
  label: string; // personalizationName

  // type-specific:
  value?: string | null; // for text
  itemId?: number | null; // for dropdown & radio
  items?: CheckboxItem[]; // for checkbox list

  price: number; // total price for this personalization (sum of items for checkbox)
}

interface ProductStore {
  /* VARIANTS */
  selectedOptions: Record<string, string>;
  finalSellPrice: number | null;

  setOption: (title: string, value: string) => void;
  resolvePrice: (
    variants: ProductDetail.Variation[],
    minSellPrice: number | null
  ) => void;

  /* PERSONALIZATIONS */
  personalizations: Record<number, PersonalizationSelection>;
  personalizationOrder: number[];

  setPersonalizationOrder: (order: number[]) => void;

  setText: (pid: number, value: string, price: number, label: string) => void;
  setDropdown: (
    pid: number,
    itemId: number,
    price: number,
    label: string
  ) => void;
  toggleCheckbox: (
    pid: number,
    itemId: number,
    price: number,
    itemLabel: string,
    label: string
  ) => void;
  setRadio: (pid: number, itemId: number, price: number, label: string) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  /* VARIANTS -------------------------------------------------- */

  selectedOptions: {},
  finalSellPrice: null,

  setOption: (title, value) =>
    set((state) => ({
      selectedOptions: { ...state.selectedOptions, [title]: value },
    })),

  resolvePrice: (variants, minSellPrice) => {
    const selected = get().selectedOptions;
    const keys = Object.keys(selected);

    const matched = variants.find((v) =>
      keys.every((title) =>
        v.values.some(
          (vv) => vv.title === title && vv.value === selected[title]
        )
      )
    );

    set({
      finalSellPrice: matched ? matched.sellPrice : minSellPrice,
    });
  },

  /* PERSONALIZATIONS ------------------------------------------ */

  personalizations: {},
  personalizationOrder: [],

  setPersonalizationOrder: (order) => set({ personalizationOrder: order }),

  /* TEXT -------------------------------------------------------- */
  setText: (pid, value, price, label) =>
    set((state) => {
      // if empty → remove personalization
      if (!value.trim()) {
        const copy = { ...state.personalizations };
        delete copy[pid];
        return { personalizations: copy };
      }

      return {
        personalizations: {
          ...state.personalizations,
          [pid]: {
            personalizationId: pid,
            type: 1,
            value,
            price,
            label,
          },
        },
      };
    }),

  /* DROPDOWN ---------------------------------------------------- */
  setDropdown: (pid, itemId, price, label) =>
    set((state) => ({
      personalizations: {
        ...state.personalizations,
        [pid]: {
          personalizationId: pid,
          type: 2,
          itemId,
          price,
          label,
        },
      },
    })),

  /* CHECKBOX ---------------------------------------------------- */
  toggleCheckbox: (pid, itemId, price, itemLabel, label) =>
    set((state) => {
      const prev = state.personalizations[pid]?.items ?? [];
      const exists = prev.some((i) => i.itemId === itemId);

      const newItems = exists
        ? prev.filter((i) => i.itemId !== itemId)
        : [...prev, { itemId, label: itemLabel, price }];

      // If list empty → remove personalization
      if (newItems.length === 0) {
        const copy = { ...state.personalizations };
        delete copy[pid];
        return { personalizations: copy };
      }

      const total = newItems.reduce((sum, i) => sum + i.price, 0);

      return {
        personalizations: {
          ...state.personalizations,
          [pid]: {
            personalizationId: pid,
            type: 3,
            items: newItems,
            price: total,
            label,
          },
        },
      };
    }),

  /* RADIO ------------------------------------------------------- */
  setRadio: (pid, itemId, price, label) =>
    set((state) => ({
      personalizations: {
        ...state.personalizations,
        [pid]: {
          personalizationId: pid,
          type: 4,
          itemId,
          price,
          label,
        },
      },
    })),
}));
