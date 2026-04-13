import type { DateRange, Category } from "../../types/analytics";

interface FilterBarProps {
  dateRange: DateRange;
  category: Category;
  onDateRangeChange: (range: DateRange) => void;
  onCategoryChange: (category: Category) => void;
}

const dateRanges: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "12m", label: "12 Months" },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home" },
  { value: "sports", label: "Sports" },
];

export function FilterBar({ dateRange, category, onDateRangeChange, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Date range pills */}
      <div className="flex gap-1.5 overflow-x-auto" role="group" aria-label="Date range">
        {dateRanges.map((r) => (
          <button
            key={r.value}
            onClick={() => onDateRangeChange(r.value)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              dateRange === r.value
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Category dropdown */}
      <div>
        <label htmlFor="category-filter" className="sr-only">Filter by category</label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-400"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
