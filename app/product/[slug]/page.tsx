import AddToCard from "@/app/components/ProductAddToCard";
import ProductPersonalization from "@/app/components/ProductPersonalization";
import ProductShippingReturn from "@/app/components/ProductShippingReturn";
import ProductShortDescription from "@/app/components/ProductShortDescription";
import ProductVariation from "@/app/components/ProductVariation";
import SalesCountDown from "@/app/components/SalesCountDown";
import DButton from "@/app/components/global/DButton";
import Tag from "@/app/components/global/Tag";
import { slugify } from "@/app/utils";

export default async function ProductPage({ params }: any) {
  const { slug } = await params;

  const parts = slug.split("-");
  const shortId = parts[parts.length - 1];
  console.log(
    slugify(
      "Organic Cotton Baby Romper Set - Soft & Comfortable Newborn Essentials with Snap Closures, Hypoallergenic Fabric for Sensitive Skin, Perfect for Daily Wear and Special Occasions"
    )
  );

  //   const res = await fetch(
  //     `${process.env.API_URL}/products/by-short-id/${shortId}`,
  //     { cache: "no-store" }
  //   );

  return (
    <div className="gap-9 flex flex-col">
      <section className="text-tertiary flex items-center gap-4 text-sm">
        <span>Home</span>
        <span className="material-symbols-rounded text-sm!">chevron_right</span>
        <span>Baby & Kids</span>
        <span className="material-symbols-rounded text-sm!">chevron_right</span>
        <span>Baby Clothing</span>
      </section>
      <section className="grid grid-cols-[auto_424px] gap-6">
        <article>2</article>
        <aside className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Tag
                caption="Best Seller"
                icon={
                  <span className="material-symbols-outlined filled text-base!">
                    trophy
                  </span>
                }
                color="#0EA5E9"
              />
              <Tag
                caption="Free Shipping"
                icon={
                  <span className="material-symbols-outlined filled text-base!">
                    local_shipping
                  </span>
                }
                color="#00C950"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-rating flex">
                <span className="material-symbols-rounded filled">star</span>
                <span className="material-symbols-rounded -ml-1">star</span>
                <span className="material-symbols-rounded -ml-1">star</span>
                <span className="material-symbols-rounded -ml-1">star</span>
                <span className="material-symbols-rounded -ml-1">star</span>
              </div>
              <div className="text-tertiary leading-6">(324 review(s))</div>
            </div>
            <h1 className="text-primary leading-6 ">
              Organic Cotton Baby Romper Set - Soft & Comfortable Newborn
              Essentials with Snap Closures, Hypoallergenic Fabric for Sensitive
              Skin, Perfect for Daily Wear and Special Occasions
            </h1>
            <div className="flex gap-3 items-center">
              <div className="text-success text-4xl font-bold leading-10">
                $24
              </div>
              <div className="text-secondary leading-6 line-through">$48</div>
              <Tag caption="50% OFF" color="#00C950" />
              <SalesCountDown
                caption="Sale Ends in:"
                time={new Date(Date.now() + 3600 * 1000 * 2)}
              />
            </div>
            <div className="border border-solid border-tertiary-border rounded-lg p-3 flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-tertiary ">
                <span className="material-symbols-rounded text-success text-xl! leading-5">
                  sell
                </span>
                <span>Save 20% when you spend 84.93+ at this shop</span>
              </div>
              <div className="flex items-center gap-2 text-tertiary">
                <span className="material-symbols-rounded text-success text-xl! leading-5">
                  check
                </span>
                <span>Get it by Jul 25-28 if you order today</span>
              </div>
            </div>
          </div>
          <button className="font-medum text-secondary underline w-fit">
            Size Chart
          </button>
          <div>
            <ProductVariation />
          </div>
          <div className="text-lg font-bold leading-7 text-primary">
            Personalization
          </div>
          <div>
            <ProductPersonalization />
          </div>
          <AddToCard />
          <div className="border-t border-solid border-t-secondary-border"></div>
          <ProductShortDescription />
          <ProductShippingReturn />
        </aside>
      </section>
    </div>
  );
}
