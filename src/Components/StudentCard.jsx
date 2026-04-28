const StudentCard = ({ student }) => {
  return (
    <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition">

      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={student.avatar}
          className="w-12 h-12 rounded-full border"
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {student.name}
          </h3>
          <p className="text-xs text-gray-500">
            {student.major}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 text-sm text-gray-600">
        <p>GPA: {student.gpa}</p>
        <p>Credits: {student.credits}</p>
      </div>

      {/* Courses */}
      <div className="mt-3 flex flex-wrap gap-2">
        {student.courses?.map((c, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
          >
            {c.name}
          </span>
        ))}
      </div>

    </div>
  );
};

export default StudentCard;