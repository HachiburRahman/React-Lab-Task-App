
import './App.css'
import { useEffect, useState } from "react";
import DashboardHeader from "./Components/DashboardHeader";
import StudentCard from "./Components/StudentCard";
import SearchBar from "./Components/SearchBar";

const mockStudents = [
  {
    id: "1",
    name: "Hachibur Rahman",
    major: "CSE",
    gpa: 3.8,
    avatar: "https://i.pravatar.cc/150?img=1",
    credits: 120,
    courses: [{ name: "React" }, { name: "Node" }],
  },
  {
    id: "2",
    name: "John Doe",
    major: "Software Engineering",
    gpa: 3.5,
    avatar: "https://i.pravatar.cc/150?img=2",
    credits: 110,
    courses: [{ name: "DSA" }, { name: "DBMS" }],
  },
  {
    id: "3",
    name: "Jane Smith",
    major: "Artificial Intelligence",
    gpa: 3.9,
    avatar: "https://i.pravatar.cc/150?img=3",
    credits: 130,
    courses: [{ name: "Machine Learning" }, { name: "Python" }],
  },
  {
    id: "4",
    name: "Alex Kim",
    major: "Cyber Security",
    gpa: 3.6,
    avatar: "https://i.pravatar.cc/150?img=4",
    credits: 115,
    courses: [{ name: "Networking" }, { name: "Security" }],
  },
  {
    id: "5",
    name: "Sarah Ali",
    major: "Data Science",
    gpa: 3.7,
    avatar: "https://i.pravatar.cc/150?img=5",
    credits: 118,
    courses: [{ name: "Statistics" }, { name: "ML" }],
  },
  {
    id: "6",
    name: "David Lee",
    major: "Software Engineering",
    gpa: 3.4,
    avatar: "https://i.pravatar.cc/150?img=6",
    credits: 105,
    courses: [{ name: "Java" }, { name: "Spring Boot" }],
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Simulated API
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.major.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <DashboardHeader total={filteredStudents.length} />

      <div className="max-w-6xl mx-auto px-6 py-8">

        <SearchBar search={search} setSearch={setSearch} />

        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading students...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No students found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;