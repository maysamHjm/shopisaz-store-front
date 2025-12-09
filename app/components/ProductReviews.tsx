"use client";

import { useState } from "react";
import Tag from "./global/Tag";
import DRatingCircle from "./global/DRatingCircle";
import DRating from "./global/DRating";
import DTextButton from "./global/DTextButton";
import DPaginate from "./global/DPaginate";

const ReviewButton = ({
  caption,
  onClick,
  badge,
  selected,
}: {
  caption: string;
  onClick: () => void;
  badge: string;
  selected: boolean;
}) => {
  return (
    <button
      className={`
        px-3.5 py-2 rounded-lg bg-white h-11
        border border-solid border-transparent
        flex gap-1.5 items-center whitespace-nowrap
        ${selected ? "border-brand-primary!" : ""}
        `}
      onClick={onClick}
    >
      <span
        className={`${
          selected ? "text-brand-primary" : "text-primary"
        } font-medium`}
      >
        {caption}
      </span>
      <span
        className={`${
          selected ? "text-brand-primary" : "text-secondary"
        } bg-secondary-bg rounded-full text-sm px-2 py-1`}
      >
        {badge}
      </span>
    </button>
  );
};

export default function ProductReviews() {
  const [reviewType, setReviewType] = useState<"product" | "store">("product");

  return (
    <>
      <section className="p-6 review-gradient rounded-2xl border border-solid border-tertiary-border flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-primary leading-7">
              Reviews
            </h3>
            <p className="text-sm text-secondary leading-5">
              See what our customers are saying about this product and our store
            </p>
          </div>
          <div className="flex gap-4">
            <ReviewButton
              caption="Product Reviews"
              badge="123"
              onClick={() => setReviewType("product")}
              selected={reviewType === "product"}
            />
            <ReviewButton
              caption="Store Reviews"
              badge="3.4K"
              onClick={() => setReviewType("store")}
              selected={reviewType === "store"}
            />
          </div>
        </div>
        <style>
          {`
        .review-gradient{
            background: var(--gradient-review-summary, linear-gradient(90deg, var(--bg-brand-primary-05, rgba(22, 119, 255, 0.05)) 0%, var(--bg-brand-secondary-05, rgba(255, 158, 22, 0.05)) 49.77%, var(--bg-brand-tertiary-05, rgba(142, 8, 252, 0.05)) 100%));
        }
        `}
        </style>
        <div className="border-t border-t-tertiary-border"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded filled text-rating!">
              star
            </span>
            <span className="text-lg font-medium">Seller Rating Summary</span>
          </div>
          <Tag
            caption="From Verified Buyers"
            color="#00C950"
            icon={<span className="material-symbols-rounded">check</span>}
            size="md"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-baseline">
              <div className="text-5xl text-primary font-bold">4.8</div>
              <div className="text-tertiary">out of 5</div>
            </div>
            <div className="text-tertiary">from 3,420 reviews</div>
          </div>
          <div className="gap-8 flex">
            <DRatingCircle value={3.5} label="Quality" />
            <DRatingCircle value={3.8} label="Service" />
            <DRatingCircle value={4.5} label="Shipping" />
          </div>
        </div>
      </section>
      <div className="p-6 flex flex-col gap-3 border border-solid border-tertiary-border rounded-2xl">
        <div className="flex items-cente justify-between">
          <div className="flex gap-2 items-center ">
            <DRating value={4.5} />

            <span className="text-tertiary text-sm leading-5">4.5</span>
            <span className="flex gap-1 text-success">
              <span className="material-symbols-rounded">check</span>
              Recomended
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-xs text-tertiary items-center">
              <span>Sarah.M.</span>
              <span className="w-[5px] h-[5px] bg-tertiary rounded-full"></span>
              <span>Dec 18, 2024</span>
            </div>
            <div className="w-8 h-8 bg-brand-primary rounded-full"></div>
          </div>
        </div>
        <div className="bg-secondary-bg rounded-md px-3 py-2 flex items-center gap-2 text-xs">
          <span className="text-tertiary">Purchased:</span>
          <a href="" className="text-secondary underline">
            Organic Cotton Baby Romper Set - Soft & Comfortable Newborn
            Essentials
          </a>
        </div>
        <div className="text-primary leading-6">
          Absolutely love this romper set! The organic cotton is so soft and
          gentle on my baby's skin. The quality is outstanding and it washes
          beautifully. The snap closures make diaper changes so much easier.
          Perfect fit and the pink color is gorgeous. Will definitely be
          ordering more!
        </div>
        <div className="flex gap-3">
          <button className="cursor-pointer">
            <img
              src="/test2.png"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </button>
          <button className="cursor-pointer">
            <img
              src="/test2.png"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </button>
        </div>
        <div className="flex justify-end">
          <DTextButton
            caption="Helpful (23)"
            icon={<span className="material-symbols-rounded">thumb_up</span>}
            size="md"
            onClick={() => {}}
          />
        </div>
      </div>
      <DPaginate total={300} onChange={() => {}} />
    </>
  );
}
