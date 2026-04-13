import { Link } from "react-router-dom";
import { Dashboard } from "../modules/module-2/instructor-demo/components/features";

export default function Module2InstructorDemo() {
  return (
    <div className="relative">
      {/* Back link overlaid on dashboard */}
      <div className="fixed top-20 right-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1.5 text-sm text-blue-600 shadow-md backdrop-blur-sm transition-colors hover:underline dark:bg-gray-800/90 dark:text-blue-400"
        >
          &larr; Back to modules
        </Link>
      </div>
      <Dashboard />
    </div>
  );
}
