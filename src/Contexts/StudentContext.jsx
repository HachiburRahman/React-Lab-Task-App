import { createContext, useContext, useState, useEffect } from "react";

const INITIAL_STUDENTS = [
  { id: "22-46426-1", name: "Hachibur Rahman", avatar: "HR", gpa: 3.9, major: "Computer Science", credits: 96, courses: [{ name: "React", color: "#0EA5E9" }, { name: "Data Structures", color: "#6366F1" }, { name: "AI Ethics", color: "#10B981" }] },
  { id: "22-46427-1", name: "Ayesha Siddiqui", avatar: "AS", gpa: 3.7, major: "Software Engineering", credits: 82, courses: [{ name: "System Design", color: "#8B5CF6" }, { name: "DevOps", color: "#F59E0B" }, { name: "Databases", color: "#10B981" }] },
  { id: "21-45123-2", name: "Marcus Chen", avatar: "MC", gpa: 3.5, major: "Data Science", credits: 110, courses: [{ name: "Statistics", color: "#F43F5E" }, { name: "ML Foundations", color: "#6366F1" }, { name: "Python", color: "#0891B2" }] },
  { id: "23-47123-3", name: "Fatima Al-Zahra", avatar: "FZ", gpa: 3.8, major: "Cybersecurity", credits: 74, courses: [{ name: "Network Security", color: "#0891B2" }, { name: "Cryptography", color: "#F59E0B" }, { name: "Ethical Hacking", color: "#F43F5E" }] },
  { id: "22-46111-1", name: "Elijah Osei", avatar: "EO", gpa: 3.4, major: "Computer Engineering", credits: 88, courses: [{ name: "Embedded Systems", color: "#8B5CF6" }, { name: "VLSI Design", color: "#10B981" }, { name: "Microprocessors", color: "#F59E0B" }] },
  { id: "20-43222-2", name: "Lena Kovács", avatar: "LK", gpa: 3.6, major: "Artificial Intelligence", credits: 102, courses: [{ name: "Deep Learning", color: "#6366F1" }, { name: "Computer Vision", color: "#F43F5E" }, { name: "NLP", color: "#0891B2" }] },
  { id: "24-48222-1", name: "Hiroshi Tanaka", avatar: "HT", gpa: 3.2, major: "Game Development", credits: 60, courses: [{ name: "Unity 3D", color: "#8B5CF6" }, { name: "C#", color: "#10B981" }, { name: "Game Design", color: "#F43F5E" }] },
  { id: "22-46888-3", name: "Sofia Ramirez", avatar: "SR", gpa: 3.9, major: "Information Systems", credits: 115, courses: [{ name: "Database Mgmt", color: "#0891B2" }, { name: "System Analysis", color: "#F59E0B" }, { name: "Cloud Computing", color: "#6366F1" }] },
  { id: "21-45999-1", name: "Aarav Patel", avatar: "AP", gpa: 3.5, major: "Software Engineering", credits: 90, courses: [{ name: "Web Dev", color: "#0EA5E9" }, { name: "React", color: "#6366F1" }, { name: "Node.js", color: "#10B981" }] },
  { id: "23-47888-2", name: "Isabella Rossi", avatar: "IR", gpa: 3.6, major: "Data Science", credits: 105, courses: [{ name: "Big Data", color: "#F43F5E" }, { name: "Data Viz", color: "#F59E0B" }, { name: "Python", color: "#0891B2" }] },
];

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  // Initialize & simulate API
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedStudents = localStorage.getItem("students");
      const savedFavs = localStorage.getItem("favorites");

      if (savedStudents && JSON.parse(savedStudents).length >= 10) {
        setStudents(JSON.parse(savedStudents));
      } else {
        setStudents(INITIAL_STUDENTS);
        localStorage.setItem("students", JSON.stringify(INITIAL_STUDENTS));
      }

      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("students", JSON.stringify(students));
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [students, favorites, isLoading]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
    showNotification("Student added successfully!");
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setFavorites((prev) => prev.filter((f) => f !== id));
    showNotification("Student removed.");
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Derived state
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "gpa-desc") return b.gpa - a.gpa;
    if (sortBy === "gpa-asc") return a.gpa - b.gpa;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "credits") return b.credits - a.credits;
    return 0;
  });

  // Dynamic Title
  useEffect(() => {
    if (!isLoading) {
      document.title = `Dashboard — ${sortedStudents.length} Students`;
    }
  }, [sortedStudents.length, isLoading]);

  return (
    <StudentContext.Provider
      value={{
        students: sortedStudents,
        allStudentsCount: students.length,
        isLoading,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        addStudent,
        removeStudent,
        notification,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
