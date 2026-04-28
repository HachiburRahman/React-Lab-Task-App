import PropTypes from "prop-types";

/**
 * CourseTag — Styled pill badge for a course.
 * Props: courseName (string), color (hex string)
 */
const CourseTag = ({ courseName, color }) => {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11.5px] font-medium whitespace-nowrap border transition-all duration-150"
      style={{
        backgroundColor: `${color}18`,
        color: color,
        borderColor: `${color}40`,
      }}
    >
      <span
        className="w-2 h-1.5 rounded-sm "
        style={{ backgroundColor: color }}
      />
      {courseName}
    </span>
  );
};

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CourseTag;