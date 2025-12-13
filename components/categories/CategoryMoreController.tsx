"use client";

import { useEffect } from "react";
import { animate } from "framer-motion";

export default function CategoryGridMoreController() {
  useEffect(() => {
    const grid = document.getElementById("category-grid") as HTMLElement | null;
    if (!grid) return;

    const getGridRowGap = (): number => {
      const styles = window.getComputedStyle(grid);
      const rowGap = styles.rowGap || styles.gap;
      return rowGap ? parseFloat(rowGap) : 0;
    };

    const isExpanded = () => grid.dataset.expanded === "true";
    const isAnimating = () => grid.dataset.animating === "true";

    const getAllowedRows = () =>
      window.matchMedia("(min-width: 640px)").matches ? 1 : 2;

    const reveal = () => {
      grid.dataset.gridState = "ready";
      grid.classList.remove("opacity-0");
    };

    /* ----------------------------------
     * Measure clamp height based on rows
     * ---------------------------------- */
    const measureClampHeight = (allowedRows: number): number | null => {
      const children = Array.from(grid.children) as HTMLElement[];
      if (children.length === 0) return null;

      const rows = new Map<number, number[]>();

      for (const el of children) {
        const top = el.offsetTop;
        const bottom = el.offsetTop + el.offsetHeight;
        if (!rows.has(top)) rows.set(top, []);
        rows.get(top)!.push(bottom);
      }

      const sortedRows = Array.from(rows.entries()).sort((a, b) => a[0] - b[0]);

      if (sortedRows.length <= allowedRows) return null;

      const gap = getGridRowGap();
      return Math.ceil(Math.max(...sortedRows[allowedRows - 1][1]) + gap);
    };

    /* ----------------------------------
     * Count hidden items BASED ON ROWS
     * ---------------------------------- */
    const countHiddenItemsByRows = (allowedRows: number): number => {
      const children = Array.from(grid.children) as HTMLElement[];
      if (children.length === 0) return 0;

      const rows = new Map<number, HTMLElement[]>();

      for (const el of children) {
        const top = el.offsetTop;
        if (!rows.has(top)) rows.set(top, []);
        rows.get(top)!.push(el);
      }

      const sortedRows = Array.from(rows.entries()).sort((a, b) => a[0] - b[0]);

      return sortedRows
        .slice(allowedRows)
        .reduce((sum, [, els]) => sum + els.length, 0);
    };

    /* ----------------------------------
     * Button helpers
     * ---------------------------------- */
    const getButton = (): HTMLButtonElement => {
      let btn = document.getElementById(
        "category-grid-more"
      ) as HTMLButtonElement | null;

      if (!btn) {
        btn = document.createElement("button");
        btn.id = "category-grid-more";
        btn.type = "button";
        btn.className =
          "mx-auto block mt-6 text-sm text-primary px-4 py-2.5 font-medium border border-secondary-border rounded-lg cursor-pointer";
        grid.parentElement?.appendChild(btn);
      }

      return btn;
    };

    const removeButton = () => {
      document.getElementById("category-grid-more")?.remove();
    };

    /* ----------------------------------
     * Button modes
     * ---------------------------------- */
    const setMoreMode = (allowedRows: number, clampHeight: number) => {
      const hiddenCount = countHiddenItemsByRows(allowedRows);
      const btn = getButton();

      btn.innerText =
        hiddenCount > 0 ? `Show More (${hiddenCount})` : "Show More";

      btn.onclick = () => {
        grid.dataset.expanded = "true";
        grid.dataset.animating = "true";

        const from = grid.clientHeight;
        const to = grid.scrollHeight;

        animate(from, to, {
          duration: 0.35,
          ease: "easeInOut",
          onUpdate: (v) => {
            grid.style.maxHeight = `${v}px`;
            grid.style.overflow = "hidden";
          },
          onComplete: () => {
            grid.style.maxHeight = "";
            grid.style.overflow = "";
            grid.dataset.animating = "false";
            setLessMode(allowedRows, clampHeight);
          },
        });
      };
    };

    const setLessMode = (allowedRows: number, clampHeight: number) => {
      const btn = getButton();
      btn.innerText = "Show Less";

      btn.onclick = () => {
        grid.dataset.expanded = "false";
        grid.dataset.animating = "true";

        const currentHeight = grid.scrollHeight;
        grid.style.maxHeight = `${currentHeight}px`;
        grid.style.overflow = "hidden";

        animate(currentHeight, clampHeight, {
          duration: 0.3,
          ease: "easeInOut",
          onUpdate: (v) => {
            grid.style.maxHeight = `${v}px`;
          },
          onComplete: () => {
            grid.style.maxHeight = `${clampHeight}px`;
            grid.style.overflow = "hidden";
            grid.dataset.animating = "false";
            setMoreMode(allowedRows, clampHeight);
          },
        });
      };
    };

    /* ----------------------------------
     * Update logic
     * ---------------------------------- */
    const update = () => {
      if (isAnimating()) return;

      if (isExpanded()) {
        reveal();
        return;
      }

      grid.style.maxHeight = "";
      grid.style.overflow = "hidden";

      const allowedRows = getAllowedRows();
      const clampHeight = measureClampHeight(allowedRows);

      if (clampHeight === null) {
        removeButton();
        grid.style.maxHeight = "";
        reveal();
        return;
      }

      grid.style.maxHeight = `${clampHeight}px`;

      const isOverflowing = grid.scrollHeight > grid.clientHeight + 1;

      if (!isOverflowing) {
        removeButton();
        grid.style.maxHeight = "";
        reveal();
        return;
      }

      setMoreMode(allowedRows, clampHeight);
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
