"use client";
import Link from "next/link";
import { ProductDetail } from "../types/product.types";
import DButton from "./global/DButton";

export default function ProductCard({
  product,
}: {
  product: ProductDetail.RelatedProduct;
}) {
  return (
    <Link
      href={"/product/" + product.id}
      className="flex flex-col gap-2 relative group"
    >
      <DButton
        type="neutral"
        caption=""
        icon={<span className="material-symbols-rounded mt-1">favorite</span>}
        onClick={() => {}}
        size="md"
        className="w-10 absolute top-2 left-2 group-hover:visible invisible group-hover:opacity-100 opacity-0 duration-300"
      />
      <img
        src={
          product.media?.url
            ? process.env.NEXT_PUBLIC_MEDIA_UPLOAD_DIR + product.media?.url
            : "/default.png"
        }
        alt="product image"
        className="aspect-square object-cover"
      />
      <div className="flex flex-col gap-1">
        <span className="text-primary text-sm leading-5 line-clamp-1">
          {product.productName}
        </span>
        <div className="flex gap-2 items-center">
          <span className="text-xl leading-7 font-bold">
            ${product.sellPrice}
          </span>
          {/* <span className="text-tertiary text-xs leading-4 line-through">
            $48
          </span> */}
        </div>
      </div>
    </Link>
  );
}
