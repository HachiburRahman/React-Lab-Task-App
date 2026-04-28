const DashboardHeader = ({ total }) => {
  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-wide">
            Student Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Academic Management System
          </p>
        </div>

        {/* RIGHT SIDE BADGES */}
        <div className="flex items-center gap-3">

          {/* Total Students Badge */}
          <div className="px-4 py-2 rounded-lg text-sm font-semibold
                          bg-gradient-to-r from-blue-500 to-indigo-500
                          text-white shadow-sm">
            Total: {total}
          </div>

          {/* Active Status Badge */}
          <div className="px-4 py-2 rounded-lg text-sm font-semibold
                          bg-gradient-to-r from-green-400 to-emerald-500
                          text-white shadow-sm">
            Active
          </div>

          {/* Info Badge */}
          <div className="px-4 py-2 rounded-lg text-sm font-semibold
                          bg-gradient-to-r from-purple-500 to-pink-500
                          text-white shadow-sm">
            Live Data
          </div>

        </div>

      </div>

      {/* Accent bottom line */}
      <div className="h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

    </header>
  );
};

export default DashboardHeader;