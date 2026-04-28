import PropTypes from "prop-types";

/**
 * StatBadge — Label + value metric tile.
 * Props: label, value, highlight (bool), accent (CSS color string)
 */
const StatBadge = ({ label, value, highlight, accent }) => {
  return (
    <div
      className={[
        "flex flex-col gap-0.5 px-4 py-3 rounded-xl border cursor-default",
        "transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md",
        highlight
          ? "bg-[#1E3A5F] border-[#1E3A5F] shadow-md"
          : "bg-white border-slate-200 shadow-sm",
      ].join(" ")}
    >
      <span
        className={[
          "text-[10px] font-semibold tracking-widest uppercase",
          highlight ? "text-blue-200" : "text-slate-400",
        ].join(" ")}
      >
        {label}
      </span>
      <span
        className={[
          "text-xl font-bold leading-tight",
          highlight ? "text-white" : "",
        ].join(" ")}
        style={!highlight && accent ? { color: accent } : {}}
      >
        {value}
      </span>
    </div>
  );
};

StatBadge.propTypes = {
  label:     PropTypes.string.isRequired,
  value:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
  accent:    PropTypes.string,
};

StatBadge.defaultProps = { highlight: false, accent: null };

export default StatBadge;