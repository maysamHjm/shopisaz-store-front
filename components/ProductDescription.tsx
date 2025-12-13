import { ProductDetail } from "../types/product.types";

export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  return (
    <>
      <div
        className="[&_ul]:ps-4 [&_ul]:list-disc  [&_p]:mb-4 text-primary [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mb-4 leading-6 product-description-container"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <style>
        {`
        .product-description-container .product-description-image{
          margin: 0 0 1rem  0;
        }
        .product-description-container p:has(> br:only-child),
        .product-description-container p:has(> span:empty) {
          display: none;
        }
        .product-description-container p:empty {
          display: none;
        }
        `}
      </style>
    </>
  );
}
