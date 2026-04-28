import PropTypes from "prop-types";
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";

const StudentCard = ({ name, id, avatar, gpa, major, credits, courses }) => {
  return (
    <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition">

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          className="w-12 h-12 rounded-full border"
        />

        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500">ID: {id}</p>
        </div>
      </div>

      {/* Info */}
      <p className="text-sm text-gray-600 mb-3">{major}</p>

      {/* Courses */}
      <div className="flex flex-wrap gap-2 mb-4">
        {courses.map((c, i) => (
          <CourseTag key={i} courseName={c.name} color={c.color} />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <StatBadge label="GPA" value={gpa} />
        <StatBadge label="Credits" value={credits} />
      </div>

    </div>
  );
};

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  courses: PropTypes.array.isRequired,
};

export default StudentCard;