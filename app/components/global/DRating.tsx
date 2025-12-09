export default function DRating({
  value,
  className = "text-base",
  gap = "-ml-1",
}: {
  value: number; // 0–5 (مثلاً 4.3 یا 4.5)
  className?: string;
  gap?: string;
}) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const diff = value - i + 1;

    let icon = "star"; // default empty star
    let filled = false;

    if (diff >= 1) {
      // full star
      icon = "star";
      filled = true;
    } else if (diff >= 0.5) {
      // half star
      icon = "star_half";
      filled = true;
    } else if (diff > 0) {
      // slight fill (optional)
      icon = "grade"; // or keep empty star
    }

    stars.push(
      <span
        key={i}
        className={`material-symbols-rounded ${filled ? "filled" : ""} ${
          i > 1 ? gap : ""
        } ${className}`}
      >
        {icon}
      </span>
    );
  }

  return <div className="text-rating flex">{stars}</div>;
}
