// app/categories/[...path]/page.tsx
import CategoryCard from "@/components/categories/CategoryCard";
import CategoryGridMoreController from "@/components/categories/CategoryMoreController";
import DBreadcrumb from "@/components/global/DBreadcrumb";
import ProductCard from "@/components/ProductCard";
import { CategoryPageResponse } from "@/types/category.types";
import { ProductDetail } from "@/types/product.types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { path?: string[] };
  searchParams: { page?: string };
}) {
  const { path } = await params;
  const segments = path ?? [];

  const lastSegment = segments[segments.length - 1];

  const categoryId = lastSegment ? Number(lastSegment.split("-")[0]) : null;

  const page = Number((await searchParams).page ?? 1);

  const res = await fetch(
    `${process.env.API_URL}/categories/page/${categoryId || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      console.log("not douns");
      notFound();
    }
  }

  const data = (await res.json()) as CategoryPageResponse;

  const categorySequence = [
    ...data.parents.map((item) => item.categoryName),
    data.category.categoryName,
  ];

  const backCardArrGen = [
    ...(categoryId
      ? [
          {
            categoryName: "All Categories",
            id: "",
            categoryImage: null,
          },
        ]
      : []),
    ...data.parents,
  ];

  return (
    <section className="gap-9 flex flex-col">
      <div className="flex flex-col gap-3">
        <DBreadcrumb
          list={[
            "Home",
            ...(categoryId ? ["Categories"] : []),
            ...categorySequence,
          ]}
          className="mx-auto"
        />
        <div>
          <h1 className="text-3xl leading-9 text-primary font-medium text-center">
            {data.category.categoryName}
          </h1>
          {data.category.categoryDescription && (
            <p className="text-tertiary text-center leading-6">
              {data.category.categoryDescription}
            </p>
          )}
        </div>
      </div>
      {backCardArrGen.length > 0 && (
        <div className="overflow-auto">
          <div className="flex w-fit gap-4 mx-auto items-center">
            {backCardArrGen.map((item, index) => (
              <Fragment key={index}>
                <Link
                  href={`/categories/${item.id}`}
                  key={index}
                  className="flex items-center gap-2.5 p-3 h-12 overflow-hidden rounded-lg border border-secondary-border"
                >
                  {item.categoryImage && (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MEDIA_UPLOAD_DIR +
                        item.categoryImage.fileName
                      }
                      alt="thumbnail"
                      className="w-12 h-12 object-cover -ms-3"
                    />
                  )}
                  <span className="text-tertiary">{item.categoryName}</span>
                </Link>
                {index < backCardArrGen.length - 1 && (
                  <span className="material-symbols-rounded text-sm!">
                    chevron_right
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}
      <div className="relative">
        <div
          id="category-grid"
          data-grid-state="pending"
          className="
            grid gap-6 grid-cols-[repeat(auto-fit,minmax(12.15rem,12.15rem))] justify-center
            overflow-hidden
            opacity-0
            transition-opacity duration-200
          "
        >
          {data.children.map((item, index) => {
            return (
              <CategoryCard
                short={data.children.every(
                  (item) => item.categoryImage === null
                )}
                key={index}
                image={
                  item.categoryImage
                    ? process.env.NEXT_PUBLIC_MEDIA_UPLOAD_DIR +
                      item.categoryImage.fileName
                    : null
                }
                title={item.categoryName}
                url={item.childrenCount > 0 ? "/categories/" + item.id : null}
              />
            );
          })}
        </div>
        {data.children.length > 0 && <CategoryGridMoreController />}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
        {data.products.items.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>
    </section>
  );
}
