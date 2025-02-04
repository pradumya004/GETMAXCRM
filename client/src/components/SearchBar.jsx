import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ setFilteredEmployees, setSearchQuery, employees }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      if (query.trim() === "") {
        setFilteredEmployees(employees); // Reset filtered employees
        setSearchQuery(""); // Reset search query
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/employees/search",
          { name: query },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setFilteredEmployees(response.data);
        setSearchQuery(query); // Update search query for highlighting
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const debounceTimer = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, setFilteredEmployees, setSearchQuery, employees]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search employees..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border-2 border-gray-500 rounded w-64 focus:outline-none focus:ring focus:border-black"
      />
    </div>
  );
};

export default SearchBar;
