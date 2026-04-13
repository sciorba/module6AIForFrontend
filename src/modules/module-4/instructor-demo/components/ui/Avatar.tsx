import type { OnlineStatus } from "../../types/team";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  status?: OnlineStatus;
}

const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" } as const;
const dotSize = { sm: "h-2.5 w-2.5", md: "h-3 w-3", lg: "h-3.5 w-3.5" } as const;
const statusColors: Record<OnlineStatus, string> = { online: "bg-green-500", away: "bg-yellow-500", offline: "bg-gray-400" };

export function Avatar({ name, src, size = "md", status }: AvatarProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <div className={`relative overflow-hidden rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold flex items-center justify-center ${sizeClasses[size]}`}>
        <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
        {src && <img src={src} alt={name} className="absolute inset-0 h-full w-full object-cover" />}
      </div>
      {status && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white dark:border-gray-800 ${dotSize[size]} ${statusColors[status]}`}
          aria-label={`${name} is ${status}`}
        />
      )}
    </div>
  );
}
