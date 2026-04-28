
import './App.css'
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";

const students = [
  {
    name: "Hachibur Rahman",
    id: "22-46426-1",
    avatar: "https://i.pravatar.cc/150?img=1",
    gpa: 3.8,
    major: "Computer Science & Engineering",
    credits: 120,
    courses: [
      { name: "React", color: "#e5e7eb" },
      { name: "Node.js", color: "#e5e7eb" },
    ],
  },
  {
    name: "John Doe",
    id: "22-12345-2",
    avatar: "https://i.pravatar.cc/150?img=2",
    gpa: 3.6,
    major: "Software Engineering",
    credits: 110,
    courses: [
      { name: "Database", color: "#e5e7eb" },
      { name: "DSA", color: "#e5e7eb" },
    ],
  },
  {
    name: "Jane Smith",
    id: "22-54321-3",
    avatar: "https://i.pravatar.cc/150?img=3",
    gpa: 3.9,
    major: "Artificial Intelligence",
    credits: 130,
    courses: [
      { name: "Machine Learning", color: "#e5e7eb" },
      { name: "Python", color: "#e5e7eb" },
    ],
  },
  {
    name: "Alex Kim",
    id: "22-77777-4",
    avatar: "https://i.pravatar.cc/150?img=4",
    gpa: 3.5,
    major: "Cyber Security",
    credits: 100,
    courses: [
      { name: "Networking", color: "#e5e7eb" },
      { name: "Security Basics", color: "#e5e7eb" },
    ],
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <DashboardHeader />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Records
          </h2>
          <p className="text-sm text-gray-500">
            Manage and view all registered students
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <StudentCard key={index} {...student} />
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;