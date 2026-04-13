import type { TableRow } from "../../types/analytics";
import { formatCurrency } from "../../lib/data";

interface DataTableProps {
  rows: TableRow[];
  isLoading?: boolean;
}

export function DataTable({ rows, isLoading = false }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-5 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="pb-3 pr-4 font-medium text-gray-500 dark:text-gray-400">Product</th>
            <th className="pb-3 pr-4 font-medium text-gray-500 dark:text-gray-400">Category</th>
            <th className="pb-3 pr-4 text-right font-medium text-gray-500 dark:text-gray-400">Revenue</th>
            <th className="pb-3 pr-4 text-right font-medium text-gray-500 dark:text-gray-400">Units</th>
            <th className="pb-3 text-right font-medium text-gray-500 dark:text-gray-400">Growth</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {rows.map((row) => (
            <tr key={row.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{row.product}</td>
              <td className="py-3 pr-4">
                <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-600 dark:bg-gray-700 dark:text-gray-300 transition-colors">
                  {row.category}
                </span>
              </td>
              <td className="py-3 pr-4 text-right text-gray-700 dark:text-gray-300">{formatCurrency(row.revenue)}</td>
              <td className="py-3 pr-4 text-right text-gray-700 dark:text-gray-300">{row.units.toLocaleString()}</td>
              <td className="py-3 text-right">
                <span className={`text-sm font-medium ${row.growth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {row.growth >= 0 ? "+" : ""}{row.growth}%
                </span>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                No products match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
