import type { FeedUser } from "../../types/feed";

interface UserAvatarProps {
  user: FeedUser;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  subtitle?: string;
}

const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" } as const;

export function UserAvatar({ user, size = "md", showName = false, subtitle }: UserAvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative shrink-0 overflow-hidden rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold flex items-center justify-center ${sizeClasses[size]}`}>
        <span aria-hidden="true">{user.name.charAt(0)}</span>
        {user.avatarUrl && <img src={user.avatarUrl} alt={user.name} className="absolute inset-0 h-full w-full object-cover" />}
      </div>
      {showName && (
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
          {subtitle ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.handle}</p>
          )}
        </div>
      )}
    </div>
  );
}
