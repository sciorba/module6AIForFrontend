export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: "revenue" | "users" | "orders" | "conversion";
}

export type DateRange = "7d" | "30d" | "90d" | "12m";
export type Category = "all" | "electronics" | "clothing" | "home" | "sports";

export interface Filters {
  dateRange: DateRange;
  category: Category;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface TableRow {
  id: string;
  product: string;
  category: string;
  revenue: number;
  units: number;
  growth: number;
}
