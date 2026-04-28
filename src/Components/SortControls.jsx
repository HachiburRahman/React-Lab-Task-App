const SortControls = ({ setSort }) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => setSort("default")} className="px-3 py-1 border rounded">
        Default
      </button>
      <button onClick={() => setSort("name")} className="px-3 py-1 border rounded">
        Name A-Z
      </button>
      <button onClick={() => setSort("gpa")} className="px-3 py-1 border rounded">
        GPA High
      </button>
    </div>
  );
};

export default SortControls;