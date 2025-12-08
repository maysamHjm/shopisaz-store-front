export default function ProductShippingReturn() {
  return (
    <div>
      <div className="text-primary font-bold text-lg leading-7">
        Shipping and Return Policies
      </div>
      <div className="mt-4 flex flex-col gap-3 text-secondary">
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded">calendar_check</span>
          <span>
            Order today to get it by <strong>Jul 25–28,</strong> Delivery to{" "}
            <strong>United States, 90068</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded">undo</span>
          <span>Returns & exchanges not accepted</span>
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
