"use client";

import { useEffect } from "react";
import { animate } from "framer-motion";

export default function CategoryGridMoreController() {
  useEffect(() => {
    const grid = document.getElementById("category-grid") as HTMLElement | null;
    if (!grid) return;

    const isExpanded = () => grid.dataset.expanded === "true";

    const getAllowedRows = () =>
      window.matchMedia("(min-width: 640px)").matches ? 1 : 2;

    const reveal = () => {
      grid.dataset.gridState = "ready";
      grid.classList.remove("opacity-0");
    };

    const ensureMoreButton = (show: boolean, hiddenCount = 0) => {
      let btn = document.getElementById(
        "category-grid-more"
      ) as HTMLButtonElement | null;

      if (!show && btn) {
        btn.remove();
        return;
      }

      if (show && !btn) {
        btn = document.createElement("button");
        btn.id = "category-grid-more";
        btn.type = "button";
        btn.className =
          "mx-auto mt-4 block text-sm font-medium underline text-gray-700";

        btn.onclick = () => {
          grid.dataset.expanded = "true";

          const from = grid.clientHeight;
          const to = grid.scrollHeight;

          animate(from, to, {
            duration: 0.35,
            ease: "easeInOut",
            onUpdate: (v) => {
              grid.style.maxHeight = `${v}px`;
            },
            onComplete: () => {
              grid.style.maxHeight = "";
              grid.style.overflow = "";
            },
          });

          btn?.remove();
        };

        grid.parentElement?.appendChild(btn);
      }

      if (btn) {
        btn.innerText = hiddenCount > 0 ? `More (${hiddenCount})` : "More";
      }
    };

    const measureClampHeight = (allowedRows: number): number | null => {
      const children = Array.from(grid.children) as HTMLElement[];
      if (children.length === 0) return null;

      const rows: { top: number; bottoms: number[] }[] = [];

      for (const el of children) {
        const top = el.offsetTop;
        const bottom = el.offsetTop + el.offsetHeight;

        const row = rows.find((r) => r.top === top);
        if (row) row.bottoms.push(bottom);
        else rows.push({ top, bottoms: [bottom] });
      }

      rows.sort((a, b) => a.top - b.top);

      if (rows.length <= allowedRows) return null;

      return Math.ceil(Math.max(...rows[allowedRows - 1].bottoms));
    };

    const countHiddenItems = (clampHeight: number): number => {
      const children = Array.from(grid.children) as HTMLElement[];

      return children.filter(
        (el) => el.offsetTop + el.offsetHeight > clampHeight
      ).length;
    };

    const update = () => {
      if (isExpanded()) {
        reveal();
        return;
      }

      grid.style.maxHeight = "";
      grid.style.overflow = "hidden";

      const allowedRows = getAllowedRows();
      const clampHeight = measureClampHeight(allowedRows);

      if (clampHeight === null) {
        ensureMoreButton(false);
        reveal();
        return;
      }

      grid.style.maxHeight = `${clampHeight}px`;

      const isOverflowing = grid.scrollHeight > grid.clientHeight + 1;

      if (isOverflowing) {
        const hiddenCount = countHiddenItems(clampHeight);
        ensureMoreButton(true, hiddenCount);
      } else {
        ensureMoreButton(false);
        grid.style.maxHeight = "";
      }

      reveal();
    };

    requestAnimationFrame(update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(grid);

    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
