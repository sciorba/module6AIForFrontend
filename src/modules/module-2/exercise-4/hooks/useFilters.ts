import { useState, useCallback, useMemo } from "react";
import type { Filters, DateRange, Category, TableRow } from "../types/analytics";
import { tableData } from "../lib/data";

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({ dateRange: "30d", category: "all" });
  const [isLoading, setIsLoading] = useState(false);

  const setDateRange = useCallback((dateRange: DateRange) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, dateRange }));
    // Simulate data refetch
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const setCategory = useCallback((category: Category) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, category }));
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const filteredTableData: TableRow[] = useMemo(() => {
    if (filters.category === "all") return tableData;
    return tableData.filter((row) => row.category === filters.category);
  }, [filters.category]);

  return { filters, isLoading, setDateRange, setCategory, filteredTableData };
}
