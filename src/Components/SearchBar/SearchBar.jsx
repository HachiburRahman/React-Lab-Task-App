import { useStudent } from "../../Contexts/StudentContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useStudent();

  return (
    <div className="relative flex-1 min-w-[240px]">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search by name, major or ID…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-5 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-base font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none shadow-sm focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
      />
    </div>
  );
};

export default SearchBar;
