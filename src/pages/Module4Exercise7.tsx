import { Link } from "react-router-dom";
import { KanbanBoard } from "../modules/module-4/exercise-7/components/features";

export default function Module4Exercise7() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 transition-colors dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6 dark:text-blue-400">
          &larr; Back to modules
        </Link>
        <KanbanBoard />
      </div>
    </div>
  );
}
