export default function DTab({
  tabs,
  selected,
  onChange,
}: {
  tabs: { caption: string; url: string }[];
  selected: { caption: string; url: string };
  onChange: (tab: { caption: string; url: string }) => void;
}) {
  return (
    <div className="flex gap-8 ">
      {tabs.map((tab, index) => (
        <a
          href={tab.url}
          key={index}
          onClick={(e) => {
            e.preventDefault();
            onChange(tab);
          }}
          className={`
              py-2 text-base font-medium leading-6 duration-300
              border-b-2 border-b-transparent outline-none cursor-pointer
              ${
                tab.url === selected.url
                  ? "text-brand-primary border-b-brand-primary!"
                  : "text-secondary"
              }
          `}
        >
          {tab.caption}
        </a>
      ))}
    </div>
  );
}
