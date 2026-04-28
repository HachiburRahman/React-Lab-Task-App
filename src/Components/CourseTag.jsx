import PropTypes from "prop-types";

const CourseTag = ({ courseName }) => {
  return (
    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
      {courseName}
    </span>
  );
};

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
};

export default CourseTag;