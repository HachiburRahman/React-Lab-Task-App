import { ThemeProvider } from "./Contexts/ThemeContext";
import { StudentProvider, useStudent } from "./Contexts/StudentContext";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import StudentCard from "./Components/StudentCard/StudentCard";
import StatBadge from "./Components/StatBadge/StatBadge";
import SortControl from "./Components/SortControl/SortControl";
import SearchBar from "./Components/SearchBar/SearchBar";
import AddStudentForm from "./Components/AddStudentForm/AddStudentForm";

const DashboardApp = () => {
  const { students, allStudentsCount, isLoading, notification } = useStudent();

  // Stats derived from currently filtered students
  const avgGpa = students.length
    ? (students.reduce((s, x) => s + x.gpa, 0) / students.length).toFixed(2)
    : "0.00";
  const totalCredits = students.reduce((s, x) => s + x.credits, 0);
  const majorCount = [...new Set(students.map((s) => s.major))].length;

  return (
    <div className="flex justify-center items-center">
      <div className=" bg-slate-100 dark:bg-slate-950 transition-colors duration-300 text-slate-800 dark:text-slate-100 font-body py-8 px-4 sm:px-8">
        {/* Centered Classic Page Container */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">

          {/* Header */}
          <DashboardHeader />

          {/* Main content */}
          <main className="px-6 sm:px-10 py-10">

            {/* Add Student Form */}
            <AddStudentForm />

            {/* Cohort Snapshot */}
            <section className="mb-10 mt-8">
              <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 mb-4">
                Cohort Snapshot
              </h2>
              <div className="flex flex-wrap gap-4">
                <StatBadge label="Enrolled" value={allStudentsCount} highlight />
                <StatBadge label="Avg GPA" value={avgGpa} accent="#059669" />
                <StatBadge label="Total Credits" value={totalCredits} accent="#D97706" />
                <StatBadge label="Majors" value={majorCount} accent="#7C3AED" />
                <StatBadge label="Showing" value={students.length} accent="#0891B2" />
              </div>
            </section>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="w-full md:w-96 flex-shrink-0">
                <SearchBar />
              </div>
              <SortControl />
            </div>

            {/* Section heading */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">All Students</h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {students.length} of {allStudentsCount} records
              </span>
            </div>

            {/* Loading / Cards grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20 flex-col gap-4">
                <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                <p className="text-slate-400 dark:text-slate-500 text-sm animate-pulse">Loading student data...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-20 text-slate-400 dark:text-slate-500">
                <p className="text-5xl mb-4">⊘</p>
                <p className="text-base font-medium">No students match your search.</p>
                <p className="text-sm mt-1">Try a different name, major, or ID.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {students.map((student) => (
                  <StudentCard key={student.id} {...student} />
                ))}
              </div>
            )}

          </main>
        </div>

        {/* Footer */}
        <footer className="mt-8 pb-8 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors duration-200">
          Student Dashboard &copy; 2025 &mdash; Academic Year 2024–2025 &middot; Built with React + Tailwind CSS
        </footer>

        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-slate-800 dark:bg-slate-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-[bounce_1s_ease-in-out] z-50">
            <span>{notification.type === 'success' ? '✅' : 'ℹ️'}</span>
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <DashboardApp />
      </StudentProvider>
    </ThemeProvider>
  );
}