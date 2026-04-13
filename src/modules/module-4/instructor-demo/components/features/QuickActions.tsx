import { useDashboardContext } from "../../context/DashboardContext";

const actions = [
  { id: "task", label: "New Task", icon: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" },
  { id: "complete", label: "Complete Task", icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600" },
  { id: "report", label: "Report", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z", color: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600" },
  { id: "meeting", label: "Meeting", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5", color: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600" },
];

export function QuickActions() {
  const { completeTask, addActivity, incrementStat } = useDashboardContext();

  function handleAction(id: string) {
    switch (id) {
      case "task":
        incrementStat("activeTasks", 1);
        addActivity({ type: "task-created", user: "You", message: "Created a new task", projectName: "Website Redesign" });
        break;
      case "complete":
        completeTask("Website Redesign", "You", "Quick-completed task");
        break;
      case "report":
        addActivity({ type: "milestone", user: "You", message: "Generated weekly progress report" });
        break;
      case "meeting":
        addActivity({ type: "comment", user: "You", message: "Scheduled team standup meeting" });
        break;
    }
  }

  return (
    <section aria-label="Quick actions">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Quick Actions</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <button
            key={a.id}
            onClick={() => handleAction(a.id)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${a.color}`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
            </svg>
            {a.label}
          </button>
        ))}
      </div>
    </section>
  );
}
