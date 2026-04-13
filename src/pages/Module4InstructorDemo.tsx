import { Link } from "react-router-dom";
import { DashboardProvider } from "../modules/module-4/instructor-demo/context/DashboardContext";
import { TeamDashboard } from "../modules/module-4/instructor-demo/components/features";

export default function Module4InstructorDemo() {
  return (
    <DashboardProvider>
      <div className="relative">
        <div className="fixed top-16 right-4 z-50">
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1.5 text-sm text-blue-600 shadow-md backdrop-blur-sm transition-colors hover:underline dark:bg-gray-800/90 dark:text-blue-400"
          >
            &larr; Back to modules
          </Link>
        </div>
        <TeamDashboard />
      </div>
    </DashboardProvider>
  );
}
