// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch all employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://getmaxcrm.onrender.com/api/employees");
        setEmployees(response.data); // Set all employees in state
        setFilteredEmployees(response.data); // Initially set filteredEmployees to all employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <DashboardPage
              employees={employees}
              filteredEmployees={filteredEmployees}
              setFilteredEmployees={setFilteredEmployees} // Pass down setter to search and filter employees
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
