import AddToCard from "@/components/ProductAddToCard";
import ProductMediaSlider from "@/components/ProductMediaSlider";
import ProductPersonalization from "@/components/ProductPersonalization";
import ProductShippingReturn from "@/components/ProductShippingReturn";
import ProductShortDescription from "@/components/ProductShortDescription";
import ProductVariation from "@/components/ProductVariation";
import SalesCountDown from "@/components/SalesCountDown";
import Tag from "@/components/global/Tag";
import { slugify } from "@/app/utils";
import ProductTabBar from "@/components/ProductTabBar";
import DBreadcrumb from "@/components/global/DBreadcrumb";
import ProductDescription from "@/components/ProductDescription";
import ProductReviews from "@/components/ProductReviews";
import DRating from "@/components/global/DRating";
import ProductCard from "@/components/ProductCard";
import { ProductDetail } from "@/types/product.types";
import DynamicPrice from "@/components/ProductPrice";
import ProductPurchaseSummary from "@/components/productPurchaseSummary";
import ProductDescriptionModal from "@/components/ProductDescriptionModal";
import { ProductProcessingDateCalc } from "@/components/ProductProcessingDateCalc";

export default async function ProductPage({ params, searchParams }: any) {
  const { slug } = await params;
  const { tab } = await searchParams;
  // const parts = slug.split("-");
  // const shortId = parts[parts.length - 1];

  const res = await fetch(
    `${process.env.API_URL}/products/get-details/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch product");

  const product = (await res.json()) as ProductDetail.Response;
  const categoryList =
    product.categories.length > 0
      ? product.categories.map((cat) => cat.path[0].name)
      : ["Products"];

  return (
    <div className="gap-9 flex flex-col">
      <DBreadcrumb list={["Home", ...categoryList]} />
      <section className="grid grid-cols-1 lg:grid-cols-[calc(100%-460px)_460px] gap-6 ">
        <article className="self-start flex flex-col gap-6">
          {product.media.length > 0 && (
            <ProductMediaSlider media={product.media} />
          )}
          <div className="lg:flex gap-6 flex-col hidden">
            <TabStuffs product={product} tab={tab} />
          </div>
        </article>
        <aside className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Tag
                size="md"
                caption="Best Seller"
                icon={
                  <span className="material-symbols-outlined filled text-base!">
                    trophy
                  </span>
                }
                color="#0EA5E9"
              />
              <Tag
                size="md"
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
              <DRating value={3.5} />
              <div className="text-tertiary leading-6">(324 review(s))</div>
            </div>
            <h1 className="text-primary leading-6 ">{product.productName}</h1>
            <div className="flex gap-3 items-center">
              <div className="text-success text-4xl font-bold leading-10">
                $
                <span id="ssr-price">
                  {product.sellPrice?.toLocaleString()}
                </span>
              </div>
              {product.variants.length > 0 && <DynamicPrice />}
              <div className="text-secondary leading-6 line-through">$48</div>
              <Tag caption="50% OFF" color="#00C950" size="md" />
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
              {product.processingProfile && (
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-rounded text-success text-xl! leading-5">
                    check
                  </span>
                  {ProductProcessingDateCalc(product.processingProfile)}
                </div>
              )}
            </div>
          </div>

          {product.descriptions?.modal && (
            <ProductDescriptionModal
              descriptionModal={product.descriptions.modal}
              buttonText={
                product.descriptions.modalButtonText || "See more data"
              }
            />
          )}
          <div>
            {product.variants.length > 0 && (
              <ProductVariation variants={product.variants} />
            )}
          </div>
          <div className="text-lg font-bold leading-7 text-primary">
            Personalization
          </div>
          <div>
            {product.personalizations?.length > 0 && (
              <ProductPersonalization
                personalization={product.personalizations}
              />
            )}
          </div>
          <ProductPurchaseSummary />
          <AddToCard />
          <div className="border-t border-solid border-t-secondary-border"></div>
          {product.descriptions.short &&
            product.descriptions.short !== "<p><br></p>" && (
              <ProductShortDescription
                description={product.descriptions.short}
              />
            )}
          <ProductShippingReturn
            processingProfile={product.processingProfile}
            returnExchange={product.returnExchange}
          />
        </aside>
        <div className="lg:hidden flex flex-col gap-6">
          <TabStuffs product={product} tab={tab} />
        </div>
      </section>
      {product.relatedProducts.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-primary font-bold leading-8 text-2xl">
            You Might Also Like
          </h2>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,200px))]">
            {product.relatedProducts.map((relatedProduct, index) => (
              <ProductCard product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TabStuffs({
  product,
  tab,
}: {
  product: ProductDetail.Response;
  tab: string;
}) {
  return (
    <>
      <ProductTabBar
        hasDescription={
          !!(
            product.descriptions.long &&
            product.descriptions.long !== "<p><br></p>"
          )
        }
      />
      {tab === "description" &&
      product.descriptions.long &&
      product.descriptions.long !== "<p><br></p>" ? (
        <ProductDescription description={product.descriptions.long} />
      ) : (
        <ProductReviews />
      )}
    </>
  );
}
