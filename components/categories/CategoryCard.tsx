import { getInitials } from "@/utils";
import Image from "next/image";
import Link from "next/link";
export default function CategoryCard({
  image,
  title,
  url,
  short,
}: {
  image: string | null;
  title: string;
  url: string | null;
  short: boolean;
}) {
  const firstLetter = title?.trim()?.[0]?.toUpperCase();

  return (
    <Link
      href={url || "#"}
      className={`flex flex-col gap-2 w-full  ${
        !url ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {image ? (
        <img
          src={image}
          alt="category image"
          className="rounded-xl object-cover w-full aspect-[0.8]"
        />
      ) : (
        <div
          className={`flex items-center justify-center text-4xl text-disable font-medium bg-secondary-bg w-full rounded-xl ${
            short ? "aspect-[2]" : "aspect-[0.8]"
          }`}
        >
          {getInitials(title)}
        </div>
      )}
      <div className="text-primary text-lg font-medium truncate text-center">
        {title}
      </div>
    </Link>
  );
}
