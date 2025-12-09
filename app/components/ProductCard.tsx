export default function ProductCard() {
  return (
    <div className="flex flex-col gap-2">
      <img src="/test2.png" alt="" />
      <div className="flex flex-col gap-1">
        <span className="text-primary text-sm leading-5 line-clamp-1">
          Organic Cotton Baby Rom Organic Cotton Baby Rom
        </span>
        <div className="flex gap-2 items-center">
          <span className="text-xl leading-7 font-bold">$24</span>
          <span className="text-tertiary text-xs leading-4 line-through">
            $48
          </span>
        </div>
      </div>
    </div>
  );
}
