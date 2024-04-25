import { useState } from "react";

export default function PlayerSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call onSearch prop with the search query
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search players by name"
        value={searchQuery}
        onChange={handleChange}
        className="px-3 py-2 border rounded"
      />
    </div>
  );
}
