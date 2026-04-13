import { Link } from "react-router-dom";
import { Navbar } from "../modules/module-1/exercise-2/components/features";
import type { NavItem, UserInfo } from "../modules/module-1/exercise-2/types/navigation";

const navItems: NavItem[] = [
  { label: "Home", href: "#home", isActive: true },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "All Products", href: "#products-all" },
      { label: "New Arrivals", href: "#products-new" },
      { label: "Best Sellers", href: "#products-best" },
      { label: "On Sale", href: "#products-sale" },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    children: [
      { label: "For Startups", href: "#solutions-startups" },
      { label: "For Enterprise", href: "#solutions-enterprise" },
      { label: "For Education", href: "#solutions-education" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const sampleUser: UserInfo = {
  name: "Jane Cooper",
  email: "jane@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=janecooper",
};

export default function Module1Exercise2() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        logo="GridStore"
        navItems={navItems}
        user={sampleUser}
        onSearch={(q) => console.log("Search:", q)}
        onLogout={() => console.log("Logout")}
      />

      {/* Page content to demonstrate sticky scroll */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
        >
          &larr; Back to modules
        </Link>

        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Module 1 &mdash; Exercise 2: Navbar
          </h1>
          <p className="mt-2 text-gray-500">
            Responsive navigation bar with dropdowns, search, and mobile menu
          </p>
        </header>

        {/* Feature cards */}
        <div className="space-y-6">
          <FeatureCard
            title="Sticky Header"
            description="Scroll down this page to see the navbar stick to the top with a frosted-glass backdrop blur effect."
          />
          <FeatureCard
            title="Desktop Dropdown Menus"
            description='Click "Products" or "Solutions" in the navbar to see dropdown menus. Click outside or press Escape to close.'
          />
          <FeatureCard
            title="Search Bar"
            description="Type a query in the search bar and press Enter. The search callback logs to the browser console."
          />
          <FeatureCard
            title="User Profile Dropdown"
            description="Click the user avatar on the right to see profile options and sign-out button."
          />
          <FeatureCard
            title="Active Link Highlighting"
            description='The "Home" link is styled as active with a blue highlight. Active state is controlled via the isActive prop.'
          />
          <FeatureCard
            title="Mobile Hamburger Menu"
            description="Resize your browser below 1024px to see the hamburger icon. Tap it to open a slide-in panel with nav items, search, and user info. The background scrolls are locked while the menu is open."
          />
          <FeatureCard
            title="Keyboard Accessible"
            description="All interactive elements have focus-visible outlines. Dropdowns close on Escape. The mobile menu can be dismissed with the close button."
          />

          {/* Spacer sections to enable scrolling */}
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-400"
            >
              Scroll content section {i + 1} &mdash; demonstrates sticky navbar behavior
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
