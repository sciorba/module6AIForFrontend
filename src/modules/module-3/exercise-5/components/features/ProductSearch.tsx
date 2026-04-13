import { useState, useMemo } from "react";
import type { Product, SortOption, CategoryFilter, PriceRange } from "../../types/product";
import { products, ITEMS_PER_PAGE } from "../../lib/data";

function matchesPrice(product: Product, range: PriceRange): boolean {
  switch (range) {
    case "all": return true;
    case "under-25": return product.price < 25;
    case "25-50": return product.price >= 25 && product.price <= 50;
    case "50-100": return product.price > 50 && product.price <= 100;
    case "over-100": return product.price > 100;
  }
}

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "name-asc": return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc": return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc": return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc": return sorted.sort((a, b) => b.rating - a.rating);
  }
}

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesQuery = query === "" || p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCat = category === "all" || p.category === category;
      const matchesRange = matchesPrice(p, priceRange);
      return matchesQuery && matchesCat && matchesRange;
    });
    result = sortProducts(result, sort);
    return result;
  }, [query, category, priceRange, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paged = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const activeFilterCount = [category !== "all", priceRange !== "all", query !== ""].filter(Boolean).length;

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setPriceRange("all");
    setSort("name-asc");
    setCurrentPage(1);
  }

  return (
    <div>
      {/* Search + filters bar */}
      <div className="space-y-4">
        {/* Search input */}
        <div>
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              id="product-search"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label htmlFor="category-filter" className="sr-only">Category</label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => { setCategory(e.target.value as CategoryFilter); setCurrentPage(1); }}
              aria-label="Filter by category"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div>
            <label htmlFor="price-filter" className="sr-only">Price range</label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={(e) => { setPriceRange(e.target.value as PriceRange); setCurrentPage(1); }}
              aria-label="Filter by price range"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="all">All Prices</option>
              <option value="under-25">Under $25</option>
              <option value="25-50">$25 – $50</option>
              <option value="50-100">$50 – $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </div>

          <div>
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Sort products"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Rated</option>
            </select>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear Filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400" aria-live="polite" data-testid="results-count">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Page {safePage} of {totalPages}
          </p>
        )}
      </div>

      {/* Product grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Product results">
        {paged.map((product) => (
          <article
            key={product.id}
            role="listitem"
            aria-label={`Product: ${product.name}`}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {product.category}
            </span>
            <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.name}</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white" data-testid="product-price">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating}</span>
              </div>
            </div>
            {!product.inStock && (
              <span className="mt-2 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Out of Stock
              </span>
            )}
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-8 text-center" data-testid="empty-state">
          <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No products found</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            aria-label="Previous page"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              aria-label={`Page ${num}`}
              aria-current={num === safePage ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                num === safePage
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            aria-label="Next page"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
