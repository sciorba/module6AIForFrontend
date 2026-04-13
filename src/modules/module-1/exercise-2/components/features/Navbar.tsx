import type { NavbarProps } from "../../types/navigation";
import { useMobileMenu } from "../../hooks/useMobileMenu";
import { useDropdown } from "../../hooks/useDropdown";
import { SearchBar } from "../ui/SearchBar";
import { UserDropdown } from "../ui/UserDropdown";
import { MobileMenu } from "../ui/MobileMenu";

export function Navbar({ logo, navItems, user, onSearch, onLogout }: NavbarProps) {
  const mobileMenu = useMobileMenu();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <a
            href="#"
            className="shrink-0 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
            aria-label="Home"
          >
            {logo}
          </a>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <DesktopNavItem key={item.href} item={item} />
              ))}
            </ul>
          </nav>

          {/* Right side: search + user + hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop search */}
            <div className="hidden w-56 md:block xl:w-64">
              <SearchBar onSearch={onSearch} />
            </div>

            {/* User dropdown (desktop) */}
            {user && (
              <div className="hidden sm:block">
                <UserDropdown user={user} onLogout={onLogout} />
              </div>
            )}

            {/* Hamburger button */}
            <button
              onClick={mobileMenu.toggle}
              aria-expanded={mobileMenu.isOpen}
              aria-label="Toggle menu"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                aria-hidden="true"
              >
                {mobileMenu.isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenu.isOpen}
        navItems={navItems}
        user={user}
        onSearch={onSearch}
        onLogout={onLogout}
        onClose={mobileMenu.close}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop nav item with dropdown for items that have children         */
/* ------------------------------------------------------------------ */

function DesktopNavItem({ item }: { item: NavbarProps["navItems"][number] }) {
  const dropdown = useDropdown<HTMLLIElement>();
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <a
          href={item.href}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            item.isActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li ref={dropdown.ref} className="relative">
      <button
        onClick={dropdown.toggle}
        aria-expanded={dropdown.isOpen}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          item.isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdown.isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {dropdown.isOpen && (
        <div
          role="menu"
          className="absolute left-0 z-50 mt-1 w-48 origin-top-left rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {item.children!.map((child) => (
            <a
              key={child.href}
              href={child.href}
              role="menuitem"
              onClick={dropdown.close}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}
