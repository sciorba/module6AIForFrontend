import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const Module1InstructorDemo = lazy(() => import("./pages/Module1InstructorDemo"));
const Module1Exercise1 = lazy(() => import("./pages/Module1Exercise1"));
const Module1Exercise2 = lazy(() => import("./pages/Module1Exercise2"));
const Module2InstructorDemo = lazy(() => import("./pages/Module2InstructorDemo"));
const Module2Exercise3 = lazy(() => import("./pages/Module2Exercise3"));
const Module2Exercise4 = lazy(() => import("./pages/Module2Exercise4"));
const Module3InstructorDemo = lazy(() => import("./pages/Module3InstructorDemo"));
const Module3Exercise5 = lazy(() => import("./pages/Module3Exercise5"));
const Module3Exercise6 = lazy(() => import("./pages/Module3Exercise6"));
const Module4InstructorDemo = lazy(() => import("./pages/Module4InstructorDemo"));
const Module4Exercise7 = lazy(() => import("./pages/Module4Exercise7"));
const Module4Exercise8 = lazy(() => import("./pages/Module4Exercise8"));

interface ModuleItem {
  label: string;
  path: string;
  ready: boolean;
}

interface Module {
  id: number;
  title: string;
  description: string;
  items: ModuleItem[];
}

const modules: Module[] = [
  {
    id: 1,
    title: "Module 1: Component Fundamentals",
    description: "TypeScript interfaces, props, responsive design, and component composition.",
    items: [
      { label: "Instructor Demo — UserProfile", path: "/module-1/instructor-demo", ready: true },
      { label: "Exercise 1 — ProductCard", path: "/module-1/exercise-1", ready: true },
      { label: "Exercise 2 — Navbar", path: "/module-1/exercise-2", ready: true },
    ],
  },
  {
    id: 2,
    title: "Module 2: State & Interactivity",
    description: "Settings panels, dashboards, and interactive UI patterns.",
    items: [
      { label: "Instructor Demo — TaskDashboard", path: "/module-2/instructor-demo", ready: true },
      { label: "Exercise 3 — SettingsPanel", path: "/module-2/exercise-3", ready: true },
      { label: "Exercise 4 — Dashboard", path: "/module-2/exercise-4", ready: true },
    ],
  },
  {
    id: 3,
    title: "Module 3: Testing with Playwright",
    description: "End-to-end testing for search and form components.",
    items: [
      { label: "Instructor Demo — E2E Tests", path: "/module-3/instructor-demo", ready: true },
      { label: "Exercise 5 — Playwright Tests (Search)", path: "/module-3/exercise-5", ready: true },
      { label: "Exercise 6 — Playwright Tests (Form)", path: "/module-3/exercise-6", ready: true },
    ],
  },
  {
    id: 4,
    title: "Module 4: Complex Components",
    description: "Kanban boards, social media feeds, and advanced patterns.",
    items: [
      { label: "Instructor Demo — Team Dashboard", path: "/module-4/instructor-demo", ready: true },
      { label: "Exercise 7 — Kanban Board", path: "/module-4/exercise-7", ready: true },
      { label: "Exercise 8 — Social Media Feed", path: "/module-4/exercise-8", ready: true },
    ],
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Grid University
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            React + TypeScript + Tailwind CSS Course Modules
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900">
                {mod.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {mod.description}
              </p>
              <ul className="mt-4 space-y-2">
                {mod.items.map((item) => (
                  <li key={item.path}>
                    {item.ready ? (
                      <Link
                        to={item.path}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          Module 5: Resources &amp; Reference Material
        </footer>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-gray-400">
      Loading...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/module-1/instructor-demo" element={<Module1InstructorDemo />} />
          <Route path="/module-1/exercise-1" element={<Module1Exercise1 />} />
          <Route path="/module-1/exercise-2" element={<Module1Exercise2 />} />
          <Route path="/module-2/instructor-demo" element={<Module2InstructorDemo />} />
          <Route path="/module-2/exercise-3" element={<Module2Exercise3 />} />
          <Route path="/module-2/exercise-4" element={<Module2Exercise4 />} />
          <Route path="/module-3/instructor-demo" element={<Module3InstructorDemo />} />
          <Route path="/module-3/exercise-5" element={<Module3Exercise5 />} />
          <Route path="/module-3/exercise-6" element={<Module3Exercise6 />} />
          <Route path="/module-4/instructor-demo" element={<Module4InstructorDemo />} />
          <Route path="/module-4/exercise-7" element={<Module4Exercise7 />} />
          <Route path="/module-4/exercise-8" element={<Module4Exercise8 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
