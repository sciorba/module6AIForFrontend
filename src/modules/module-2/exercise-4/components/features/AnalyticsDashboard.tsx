import { useFilters } from "../../hooks/useFilters";
import { kpiMetrics, revenueChartData, categoryChartData, trafficChartData } from "../../lib/data";
import { KpiCard } from "../ui/KpiCard";
import { ChartPlaceholder } from "../ui/ChartPlaceholder";
import { DataTable } from "../ui/DataTable";
import { FilterBar } from "../ui/FilterBar";

export function AnalyticsDashboard() {
  const { filters, isLoading, setDateRange, setCategory, filteredTableData } = useFilters();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
            Track key metrics, revenue, and product performance.
          </p>
        </div>
        {/* Export button */}
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        dateRange={filters.dateRange}
        category={filters.category}
        onDateRangeChange={setDateRange}
        onCategoryChange={setCategory}
      />

      {/* KPI Cards */}
      <section aria-label="Key performance indicators">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} isLoading={isLoading} />
          ))}
        </div>
      </section>

      {/* Charts Row */}
      <section aria-label="Charts">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartPlaceholder
              title="Revenue Trend"
              type="line"
              data={revenueChartData}
              isLoading={isLoading}
            />
          </div>
          <ChartPlaceholder
            title="Sales by Category"
            type="donut"
            data={categoryChartData}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Second Charts Row */}
      <section aria-label="Additional charts">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartPlaceholder
            title="Daily Revenue"
            type="bar"
            data={revenueChartData}
            isLoading={isLoading}
          />
          <ChartPlaceholder
            title="Traffic Sources"
            type="donut"
            data={trafficChartData}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Data Table */}
      <section aria-label="Product performance table">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">
              Top Products
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {filteredTableData.length} product{filteredTableData.length !== 1 ? "s" : ""}
            </span>
          </div>
          <DataTable rows={filteredTableData} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}
