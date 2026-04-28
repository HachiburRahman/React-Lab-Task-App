import PropTypes from "prop-types";
import CourseTag from "../CourseTag/CourseTag";
import StatBadge from "../StatBadge/StatBadge";
import { useStudent } from "../../Contexts/StudentContext";

/* Avatar color palette keyed on first letter of initials */
const PALETTE = {
  H: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A" },
  A: { bg: "#D1FAE5", text: "#059669", border: "#A7F3D0" },
  M: { bg: "#FCE7F3", text: "#DB2777", border: "#F9A8D4" },
  F: { bg: "#E0F2FE", text: "#0891B2", border: "#BAE6FD" },
  E: { bg: "#EDE9FE", text: "#7C3AED", border: "#DDD6FE" },
  L: { bg: "#FEE2E2", text: "#DC2626", border: "#FECACA" },
};
const DEFAULT_AV = { bg: "#E0E7FF", text: "#4338CA", border: "#C7D2FE" };

const getAv  = (init)   => PALETTE[(init || "?")[0].toUpperCase()] || DEFAULT_AV;
const gpaClr = (gpa)    => {
  if (gpa >= 3.8) return "#059669";
  if (gpa >= 3.5) return "#2563EB";
  if (gpa >= 3.0) return "#D97706";
  return "#DC2626";
};
const gpaLabel = (gpa)  => {
  if (gpa >= 3.8) return { text: "Excellent", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (gpa >= 3.5) return { text: "Good",      cls: "bg-blue-50 text-blue-700 border-blue-200" };
  if (gpa >= 3.0) return { text: "Average",   cls: "bg-amber-50 text-amber-700 border-amber-200" };
  return             { text: "Below Avg",  cls: "bg-red-50 text-red-700 border-red-200" };
};

/**
 * StudentCard — Profile card for a single student.
 * Props: name, id, avatar, gpa, major, credits, courses[]
 */
const StudentCard = ({ name, id, avatar, gpa, major, credits, courses }) => {
  const { favorites, toggleFavorite, removeStudent } = useStudent();
  const av    = getAv(avatar);
  const badge = gpaLabel(gpa);
  const isFavorite = favorites.includes(id);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      
      {/* Colored top stripe */}
      <div className="h-1.5 w-full" style={{ backgroundColor: av.text }} />

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* ── Header: Avatar + Name ── */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {avatar.startsWith("http") ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-slate-200 dark:border-slate-700 shadow-sm" 
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2"
              style={{ backgroundColor: av.bg, color: av.text, borderColor: av.border }}
            >
              {avatar}
            </div>
          )}

          {/* Name + ID */}
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-slate-900 dark:text-slate-100 text-base truncate leading-tight flex items-center gap-2">
              {name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{major}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{id}</p>
          </div>

          {/* GPA badge */}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${badge.cls}`}>
            {badge.text}
          </span>
          
          {/* Actions */}
          <div className="flex flex-col gap-2 ml-1 shrink-0">
             <button onClick={() => toggleFavorite(id)} className="text-lg leading-none cursor-pointer hover:scale-110 transition-transform" title="Toggle Favorite">
               {isFavorite ? "⭐" : "☆"}
             </button>
             <button onClick={() => removeStudent(id)} className="text-sm leading-none cursor-pointer hover:scale-110 transition-transform text-red-400 hover:text-red-600" title="Remove Student">
               🗑️
             </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-slate-100" />

        {/* ── Stats ── */}
        <div className="flex gap-2">
          <StatBadge
            label="GPA"
            value={gpa.toFixed(1)}
            accent={gpaClr(gpa)}
          />
          <StatBadge
            label="Credits"
            value={credits}
            accent="#0891B2"
          />
        </div>

        {/* ── Courses ── */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
            Enrolled Courses
          </p>
          <div className="flex flex-wrap gap-1.5">
            {courses.map((c) => (
              <CourseTag key={c.name} courseName={c.name} color={c.color} />
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};

StudentCard.propTypes = {
  name:    PropTypes.string.isRequired,
  id:      PropTypes.string.isRequired,
  avatar:  PropTypes.string.isRequired,
  gpa:     PropTypes.number.isRequired,
  major:   PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name:  PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentCard;