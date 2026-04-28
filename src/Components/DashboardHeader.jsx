const DashboardHeader = () => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Academic management system
          </p>
        </div>

        <nav className="text-sm text-gray-600 space-x-6">
          <a href="#" className="hover:text-gray-900">Home</a>
          <a href="#" className="hover:text-gray-900">Students</a>
          <a href="#" className="hover:text-gray-900">Courses</a>
        </nav>

      </div>
    </header>
  );
};

export default DashboardHeader;