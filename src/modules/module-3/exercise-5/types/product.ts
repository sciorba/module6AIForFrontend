export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
}

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating-desc";
export type CategoryFilter = "all" | "electronics" | "clothing" | "home" | "sports" | "books";
export type PriceRange = "all" | "under-25" | "25-50" | "50-100" | "over-100";
