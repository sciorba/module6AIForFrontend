import { Link } from "react-router-dom";
import { ContactForm } from "../modules/module-3/exercise-6/components/features";

export default function Module3Exercise6() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 transition-colors dark:bg-gray-900">
      <div className="mx-auto max-w-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6 dark:text-blue-400"
        >
          &larr; Back to modules
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Contact Us
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
            Fill out the form below. This page is tested with Playwright E2E tests.
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
