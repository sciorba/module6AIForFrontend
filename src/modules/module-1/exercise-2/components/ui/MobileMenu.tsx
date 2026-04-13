import type { NavItem, UserInfo } from "../../types/navigation";
import { SearchBar } from "./SearchBar";

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  user?: UserInfo;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  onClose: () => void;
}

export function MobileMenu({
  isOpen,
  navItems,
  user,
  onSearch,
  onLogout,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transition-transform lg:hidden"
      >
        <div className="flex h-full flex-col">
          {/* Close button */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
            <span className="text-sm font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      item.isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </a>
                  {/* Sub-items */}
                  {item.children && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            onClick={onClose}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* User section at bottom */}
          {user && (
            <div className="border-t border-gray-100 px-4 py-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100 text-blue-700">
                  <span
                    className="flex h-full w-full items-center justify-center text-sm font-semibold"
                    aria-hidden="true"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout?.();
                  onClose();
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
