"use client";

import { useState } from "react";
import { ProductDetail } from "../types/product.types";
import DModal from "./global/DModal";
import DTextButton from "./global/DTextButton";

export default function ProductDescriptionModal({
  descriptionModal,
  buttonText,
}: {
  descriptionModal: string;
  buttonText: string;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <DModal
        open={showModal}
        onClose={() => setShowModal(false)}
        width={728}
        title="More info on this product"
      >
        <div
          className="product-description-modal"
          dangerouslySetInnerHTML={{ __html: descriptionModal }}
        ></div>
        <style>
          {`
             .product-description-modal p:has(> br:only-child),
             .product-description-modal p:has(> span:empty) {
                display: none;
             }
            .product-description-modal p:empty {
                display: none;
             }`}
        </style>
      </DModal>
      <DTextButton
        size="large"
        onClick={() => {
          setShowModal(true);
        }}
        caption={buttonText}
        className="underline w-fit"
      />
    </>
  );
}
