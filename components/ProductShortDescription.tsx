"use client";

import { useEffect, useRef, useState } from "react";

const MAX_HEIGHT = 240;

export default function ProductShortDescription({
  description,
}: {
  description: string;
}) {
  const [open, setOpen] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const fullHeight = contentRef.current.scrollHeight;
    if (fullHeight > MAX_HEIGHT) setCanExpand(true);
  }, []);

  const currentHeight = !canExpand
    ? "auto"
    : open
    ? `${contentRef.current?.scrollHeight}px`
    : `${MAX_HEIGHT}px`;

  return (
    <div className="relative">
      <h2 className="text-primary font-bold mb-2 text-lg leading-7">
        About Product
      </h2>

      <div
        ref={contentRef}
        style={{
          height: currentHeight,
          overflow: "hidden",
          transition: "height 300ms ease",
        }}
        className="text-secondary relative"
      >
        {/* Fade overlay */}
        {canExpand && !open && (
          <div
            className="
              absolute bottom-0 left-0 right-0 h-16
              pointer-events-none
              bg-linear-to-t from-white to-transparent
            "
          />
        )}

        {/* Content */}
        <div
          className="pb-4 short-description-container [&_ul]:ps-4"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <style>
          {`
          .short-description-container p{
            line-height: 1.5rem;
            color: #404040;
            margin-bottom: 1rem;
          }
            .short-description-container ul{
            line-height: 1.5rem;
            color: #404040;
            margin-bottom: 1rem;
            list-style: disc;
          }
          `}
        </style>
      </div>

      {canExpand && (
        <button
          onClick={() => setOpen(!open)}
          className="text-secondary font-medium text-sm mt-3 w-full cursor-pointer"
        >
          {open ? "Less" : "Learn more about this product"}
        </button>
      )}
    </div>
  );
}
