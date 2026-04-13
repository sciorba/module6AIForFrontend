import type { UserInfo } from "../../types/navigation";
import { useDropdown } from "../../hooks/useDropdown";

interface UserDropdownProps {
  user: UserInfo;
  onLogout?: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const { isOpen, toggle, ref } = useDropdown();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {/* Avatar */}
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blue-100 text-blue-700">
          <span
            className="flex h-full w-full items-center justify-center text-xs font-semibold"
            aria-hidden="true"
          >
            {getInitials(user.name)}
          </span>
          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        {/* Chevron */}
        <svg
          className={`hidden h-4 w-4 text-gray-500 transition-transform duration-200 sm:block ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {/* User info header */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <a
              href="#profile"
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Your Profile
            </a>
            <a
              href="#settings"
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Settings
            </a>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-1">
            <button
              role="menuitem"
              onClick={onLogout}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
