import { useStudent } from "../../Contexts/StudentContext";

const SORT_OPTIONS = [
  { value: "default",  label: "Default" },
  { value: "name",     label: "Name A–Z" },
  { value: "gpa-desc", label: "GPA High–Low" },
  { value: "gpa-asc",  label: "GPA Low–High" },
  { value: "credits",  label: "Most Credits" },
];

const SortControl = () => {
  const { sortBy, setSortBy } = useStudent();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400 ml-1 hidden lg:block">Sort by</span>
      <div className="flex flex-wrap gap-1 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {SORT_OPTIONS.map((option) => {
          const isActive = sortBy === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={[
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortControl;