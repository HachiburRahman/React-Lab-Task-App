import { useState } from "react";
import { useTheme } from "../../Contexts/ThemeContext";
import { useStudent } from "../../Contexts/StudentContext";

const NAV_LINKS = ["Overview", "Students", "Courses", "Reports"];

const DashboardHeader = () => {
  const [activeNav, setActiveNav] = useState("Students");
  const { isDarkMode, toggleTheme } = useTheme();
  const { students, favorites } = useStudent();

  const studentCount = students.length;
  const avgGpa = studentCount ? (students.reduce((s, x) => s + x.gpa, 0) / studentCount).toFixed(2) : "0.00";
  const majorCount = [...new Set(students.map((s) => s.major))].length;

  const stats = [
    { label: "Total Students", value: studentCount, color: "text-blue-600 dark:text-blue-400" },
    { label: "Average GPA", value: avgGpa, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Favorites", value: favorites.length, color: "text-rose-500 dark:text-rose-400" },
    { label: "Departments", value: majorCount, color: "text-violet-600 dark:text-violet-400" },
  ];

  return (
    <header className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="px-6 sm:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Branding */}
            <div className="flex-1">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                Academic Year 2024 – 2025
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm pb-1">
                Student Dashboard
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm tracking-wide font-medium">
                Track academic performance and monitor cohort progress.
              </p>
            </div>

            {/* Stat boxes */}
            <div className="flex gap-3 flex-wrap">
              {stats.map(({ label, value, color }) => (
                <div
                  key={label}
                  className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 min-w-[100px] text-center"
                >
                  <p className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    {label}
                  </p>
                  <p className={`text-xl font-bold ${color}`}>{value}</p>
                </div>
              ))}
              <button
                onClick={toggleTheme}
                className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-3 text-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors cursor-pointer flex items-center justify-center"
                title="Toggle Theme"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4">
            <ul className="flex gap-4 border-t border-slate-200 dark:border-slate-700 list-none pt-4">
              {NAV_LINKS.map((link) => {
                const active = activeNav === link;
                return (
                  <li key={link}>
                    <button
                      onClick={() => setActiveNav(link)}
                      className={[
                        "px-2 py-2 text-sm font-semibold transition-colors cursor-pointer border-b-2",
                        active
                          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                          : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                      ].join(" ")}
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;