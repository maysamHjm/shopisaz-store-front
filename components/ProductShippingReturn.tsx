import { ProductDetail } from "../types/product.types";
import { ProductProcessingDateCalc } from "./ProductProcessingDateCalc";

export default function ProductShippingReturn({
  processingProfile,
  returnExchange,
}: {
  processingProfile: ProductDetail.ProcessingProfile | null;
  returnExchange: ProductDetail.ReturnExchange | null;
}) {
  return (
    <div>
      <div className="text-primary font-bold text-lg leading-7">
        Shipping and Return Policies
      </div>
      <div className="mt-4 flex flex-col gap-3 text-secondary">
        {processingProfile && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded">calendar_check</span>
            <span>
              {ProductProcessingDateCalc(processingProfile)} Delivery to{" "}
              <strong>United States, 90068</strong>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded self-start">undo</span>
          <span>
            {returnExchange ? (
              <ReturnExchangeInfo returnExchange={returnExchange} />
            ) : (
              "Returns & exchanges not accepted"
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded">line_start_circle</span>
          <span>
            Ships from: <strong>Houston, TX</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

type Props = {
  returnExchange: ProductDetail.ReturnExchange;
};

function ReturnExchangeInfo({ returnExchange }: Props) {
  const { hasReturn, hasExchange, timeFrame, description } = returnExchange;

  const headline = buildHeadline(hasReturn, hasExchange, timeFrame);

  return (
    <div className="space-y-2 text-sm text-gray-700">
      <p className="font-medium">{headline}</p>

      {description && (
        <div
          className="text-gray-600 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

/* ------------------------ */
/* Helpers */
/* ------------------------ */

function buildHeadline(
  hasReturn: boolean,
  hasExchange: boolean,
  timeFrame: number
): string {
  if (hasReturn && hasExchange) {
    return `Returns & exchanges accepted within ${timeFrame} days of delivery`;
  }

  if (hasReturn) {
    return `Returns accepted within ${timeFrame} days of delivery`;
  }

  if (hasExchange) {
    return `Exchanges accepted within ${timeFrame} days of delivery`;
  }

  return "This item is not eligible for return or exchange";
}
