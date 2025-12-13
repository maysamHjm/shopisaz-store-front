"use client";
import { ReactNode, useState } from "react";
import DTab from "./global/DTab";
import DTextButton from "./global/DTextButton";
import ProductReviews from "./ProductReviews";
import { useRouter } from "next/navigation";

export default function ProductTabBar({
  hasDescription,
}: {
  hasDescription: boolean;
}) {
  const [selectedTab, setSelectedTab] = useState({
    caption: "Reviews",
    url: "?tab=reviews",
  });
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between border-b border-b-secondary-border w-full">
        <DTab
          tabs={[
            { caption: "Reviews", url: "?tab=reviews" },
            ...(hasDescription
              ? [{ caption: "Product Description", url: "?tab=description" }]
              : []),
          ]}
          onChange={(currentTab) => {
            setSelectedTab(currentTab);
            router.replace(currentTab.url, { scroll: false });
          }}
          selected={selectedTab}
        />
        <div className="flex gap-6">
          <DTextButton
            size="md"
            caption="Share"
            icon={<span className="material-symbols-outlined">share</span>}
            onClick={() => {}}
          />
          <DTextButton
            size="md"
            caption="Report"
            icon={<span className="material-symbols-outlined">flag</span>}
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
}
