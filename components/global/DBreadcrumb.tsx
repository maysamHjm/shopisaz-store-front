import { Fragment } from "react/jsx-runtime";

export default function DBreadcrumb({
  list,
  className,
}: {
  list: string[];
  className?: string;
}) {
  return (
    <div
      className={`text-tertiary flex items-center gap-4 text-sm ${
        className || ""
      }`}
    >
      {list.map((item, index) => (
        <Fragment key={index}>
          <span>{item}</span>
          {index < list.length - 1 && (
            <span className="material-symbols-rounded text-sm!">
              chevron_right
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
