import { useState } from "react";
import { useStudent } from "../../Contexts/StudentContext";

const AddStudentForm = () => {
  const { addStudent, students } = useStudent();
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.id.trim()) {
      newErrors.id = "Student ID is required.";
    } else if (!/^\d{2}-\d{5}-\d$/.test(formData.id)) {
      newErrors.id = "ID format must be YY-XXXXX-Z.";
    } else if (students.some(s => s.id === formData.id)) {
      newErrors.id = "Student ID must be unique.";
    }
    if (!formData.major.trim()) newErrors.major = "Major is required.";
    
    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      newErrors.gpa = "GPA must be a number between 0 and 4.0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const coursesArr = formData.courses
        .split(",")
        .map(c => c.trim())
        .filter(c => c !== "")
        .map(c => ({ name: c, color: "#1E40AF" }));

      addStudent({
        name: formData.name,
        id: formData.id,
        major: formData.major,
        gpa: parseFloat(formData.gpa),
        credits: 0,
        avatar: formData.name.substring(0, 2).toUpperCase(),
        courses: coursesArr
      });

      setFormData({ name: "", id: "", major: "", gpa: "", courses: "" });
      setErrors({});
    }
  };

  return (
    <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8 transition-colors duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        Add New Student
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
            <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 font-medium border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
            <input
            type="text"
            placeholder="Student ID (e.g., 22-46426-1)"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            className="w-full px-4 py-3 font-medium border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm"
          />
          {errors.id && <p className="text-xs text-red-500 mt-1">{errors.id}</p>}
        </div>
        <div>
            <input
            type="text"
            placeholder="Major"
            value={formData.major}
            onChange={(e) => setFormData({...formData, major: e.target.value})}
            className="w-full px-4 py-3 font-medium border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm"
          />
          {errors.major && <p className="text-xs text-red-500 mt-1">{errors.major}</p>}
        </div>
        <div>
            <input
            type="number"
            step="0.01"
            placeholder="GPA (0 - 4.0)"
            value={formData.gpa}
            onChange={(e) => setFormData({...formData, gpa: e.target.value})}
            className="w-full px-4 py-3 font-medium border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm"
          />
          {errors.gpa && <p className="text-xs text-red-500 mt-1">{errors.gpa}</p>}
        </div>
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Courses (comma-separated, e.g. React, Java, UI/UX)"
            value={formData.courses}
            onChange={(e) => setFormData({...formData, courses: e.target.value})}
            className="w-full px-4 py-3 font-medium border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>
        <div className="md:col-span-2 flex justify-end mt-4">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm cursor-pointer">
            Add Student
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddStudentForm;
