import type { KpiMetric, ChartData, TableRow } from "../types/analytics";

export const kpiMetrics: KpiMetric[] = [
  { id: "revenue", label: "Total Revenue", value: "$48,352", change: 12.5, changeLabel: "vs last period", icon: "revenue" },
  { id: "users", label: "Active Users", value: "2,847", change: 8.2, changeLabel: "vs last period", icon: "users" },
  { id: "orders", label: "Total Orders", value: "1,423", change: -3.1, changeLabel: "vs last period", icon: "orders" },
  { id: "conversion", label: "Conversion Rate", value: "3.24%", change: 0.8, changeLabel: "vs last period", icon: "conversion" },
];

export const revenueChartData: ChartData[] = [
  { label: "Mon", value: 4200 },
  { label: "Tue", value: 5800 },
  { label: "Wed", value: 4900 },
  { label: "Thu", value: 7200 },
  { label: "Fri", value: 6100 },
  { label: "Sat", value: 8400 },
  { label: "Sun", value: 5600 },
];

export const categoryChartData: ChartData[] = [
  { label: "Electronics", value: 35 },
  { label: "Clothing", value: 28 },
  { label: "Home", value: 22 },
  { label: "Sports", value: 15 },
];

export const trafficChartData: ChartData[] = [
  { label: "Direct", value: 42 },
  { label: "Organic", value: 28 },
  { label: "Referral", value: 18 },
  { label: "Social", value: 12 },
];

export const tableData: TableRow[] = [
  { id: "1", product: "Wireless Headphones Pro", category: "electronics", revenue: 12480, units: 312, growth: 18.4 },
  { id: "2", product: "Running Shoes Ultra", category: "sports", revenue: 9840, units: 246, growth: 12.1 },
  { id: "3", product: "Smart Home Hub", category: "electronics", revenue: 8920, units: 178, growth: -2.3 },
  { id: "4", product: "Cotton Blend T-Shirt", category: "clothing", revenue: 6750, units: 675, growth: 24.6 },
  { id: "5", product: "Ergonomic Desk Chair", category: "home", revenue: 5400, units: 54, growth: 8.9 },
  { id: "6", product: "Fitness Tracker Band", category: "sports", revenue: 4620, units: 231, growth: -5.7 },
  { id: "7", product: "Wool Blend Jacket", category: "clothing", revenue: 4200, units: 84, growth: 15.3 },
  { id: "8", product: "LED Desk Lamp", category: "home", revenue: 3360, units: 168, growth: 22.1 },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);
}
