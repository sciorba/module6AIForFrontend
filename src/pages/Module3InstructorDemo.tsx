import { Link } from "react-router-dom";

const testSuites = [
  {
    file: "dashboard.spec.ts",
    title: "Dashboard — Statistics & Task Board",
    tests: [
      "displays four KPI stat cards",
      "shows trend indicators on stat cards",
      "displays all task cards when 'All' filter is active",
      "filters tasks by 'To Do' status",
      "filters tasks by 'In Progress' status",
      "filters tasks by 'Done' status",
      "task card displays priority, title, assignee, and due date",
      "task card displays tags",
    ],
  },
  {
    file: "navigation.spec.ts",
    title: "Navigation — Sidebar",
    tests: [
      "sidebar displays all navigation items",
      "Dashboard link is highlighted as active",
      "sidebar collapses and expands on desktop",
      "notification bell shows badge count",
      "user menu opens and closes",
    ],
  },
  {
    file: "accessibility.spec.ts",
    title: "Accessibility",
    tests: [
      "sidebar navigation has correct ARIA landmark",
      "task board has correct ARIA landmark",
      "filter tabs have correct ARIA roles",
      "task cards use semantic article elements with aria-label",
      "user menu button has aria-expanded and aria-haspopup",
      "interactive elements are keyboard focusable",
    ],
  },
  {
    file: "responsive.spec.ts",
    title: "Responsive Design",
    tests: [
      "mobile: sidebar is hidden, hamburger is visible",
      "mobile: hamburger opens sidebar overlay",
      "mobile: KPI cards stack in single column",
      "tablet: sidebar is visible, hamburger is hidden",
      "desktop: sidebar shows full labels",
      "desktop: KPI cards display in 4 columns",
    ],
  },
  {
    file: "dark-mode.spec.ts",
    title: "Dark Mode",
    tests: [
      "starts in light mode with correct toggle label",
      "toggles to dark mode on click",
      "toggles back to light mode",
      "persists dark mode preference in localStorage",
      "dark mode persists across page reload",
    ],
  },
];

const totalTests = testSuites.reduce((sum, s) => sum + s.tests.length, 0);

export default function Module3InstructorDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6 dark:text-blue-400"
        >
          &larr; Back to modules
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
            Module 3 &mdash; Instructor Demo
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 transition-colors">
            Comprehensive E2E test suite for the Task Management Dashboard using Playwright.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400 transition-colors">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {totalTests} tests passing
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">5 test files</span>
          </div>
        </header>

        {/* How to run */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">How to Run</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
            <code>npx playwright test{"\n"}npx playwright show-report</code>
          </pre>
        </div>

        {/* Test suites */}
        <div className="space-y-6">
          {testSuites.map((suite) => (
            <div
              key={suite.file}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
                  {suite.title}
                </h2>
                <code className="text-xs text-gray-400 dark:text-gray-500">{suite.file}</code>
              </div>
              <ul className="mt-4 space-y-2">
                {suite.tests.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 transition-colors">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
