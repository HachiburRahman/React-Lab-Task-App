const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or major..."
        className="w-full md:w-1/2 px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

export default SearchBar;