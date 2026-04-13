import { Link } from "react-router-dom";
import { ProductSearch } from "../modules/module-3/exercise-5/components/features";

export default function Module3Exercise5() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 transition-colors dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6 dark:text-blue-400"
        >
          &larr; Back to modules
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Product Search
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
            Search, filter, and sort products. This page is tested with Playwright E2E tests.
          </p>
        </header>

        <ProductSearch />
      </div>
    </div>
  );
}
