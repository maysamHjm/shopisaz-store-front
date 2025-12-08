import DCheck from "./global/DCheck";
import DRadio from "./global/DRadio";

export default function PersonalizationRadio({
  checked = false,
  onChange,
  title,
  description,
  price,
  image,
}: {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  price: string;
  image?: string;
}) {
  return (
    <div
      className="flex gap-2 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <DRadio checked={checked} className="self-start mt-0.5" />
      <div className="flex gap-4 items-center flex-1">
        <div className="">
          <div className="text-secondary font-medium leading-6">{title}</div>
          <div className="text-tertiary text-sm leading-5">{description}</div>
        </div>
        {image && (
          <img
            src="/test.jpg"
            alt="dfdfd"
            className="h-11 w-11 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="self-center">{price}</div>
    </div>
  );
}
