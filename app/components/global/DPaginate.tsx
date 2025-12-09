import ReactPaginate from "react-paginate";

export default function DPaginate({
  onChange,
  total,
}: {
  onChange: () => void;
  total: number;
}) {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="material-symbols-rounded text-base! leading-4!">
            chevron_right
          </span>
        }
        previousLabel={
          <span className="material-symbols-rounded text-base! leading-4! ">
            chevron_left
          </span>
        }
        onPageChange={onChange}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(total / 10)}
        className="flex gap-1.5 items-center select-none"
        pageClassName="cursor-pointer w-9 h-9 p-2 text-sm font-medium text-primary border border-solid border-secondary-border rounded-lg flex items-center justify-center"
        nextClassName="[&.disabled]:opacity-50 [&.disabled]:bg-secondary-bg [&.disabled]:cursor-not-allowe cursor-pointer w-9 h-9 p-2 border border-solid border-secondary-border rounded-lg flex items-center justify-center"
        nextLinkClassName="flex items-center justify-center"
        previousClassName="[&.disabled]:opacity-50 [&.disabled]:bg-secondary-bg [&.disabled]:cursor-not-allowed cursor-pointer w-9 h-9 p-2 border border-solid border-secondary-border rounded-lg flex items-center justify-center"
        previousLinkClassName="flex items-center justify-center"
        breakLinkClassName="cursor-pointer  w-9 h-9 p-2 text-sm font-medium text-primary border border-solid border-secondary-border rounded-lg flex items-center justify-center"
        activeClassName="border-brand-primary!"
      />
    </div>
  );
}
