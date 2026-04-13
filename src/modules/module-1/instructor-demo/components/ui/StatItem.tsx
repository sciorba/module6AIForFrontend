import { formatCompactNumber, formatFullNumber } from "../../lib/format";

interface StatItemProps {
  label: string;
  value: number;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center px-4 py-2">
      <span
        className="text-lg font-bold text-gray-900"
        title={formatFullNumber(value)}
        aria-label={`${formatFullNumber(value)} ${label}`}
      >
        {formatCompactNumber(value)}
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
