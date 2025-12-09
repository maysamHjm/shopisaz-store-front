export default function DRatingCircle({
  value,
  label,
  size = 47,
  stroke = 4,
  color = "#FF9E16",
}: {
  value: number; // 0–5
  label: string;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // convert 0–5 → percentage
  const progress = (value / 5) * circumference;

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative">
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s ease",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>

        <div className="text-sm font-semibold absolute pointer-events-none top-1/2 -translate-y-1/2 text-center w-full">
          {value.toFixed(1)}
        </div>
      </div>
      <span className="mt-2 text-sm text-secondary">{label}</span>
    </div>
  );
}
