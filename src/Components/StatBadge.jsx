import PropTypes from "prop-types";

const StatBadge = ({ label, value }) => {
  return (
    <div className="flex justify-between bg-gray-50 border px-3 py-2 rounded text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
};

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatBadge;