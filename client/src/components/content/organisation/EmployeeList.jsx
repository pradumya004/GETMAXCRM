import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../SearchBar.jsx";
import EmployeeTable from "./employee/EmployeeTable.jsx";
import Pagination from "../../Pagination.jsx";
import AddEmployeeModal from "./employee/AddEmployeeModal.jsx";

const EmployeeList = () => {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    name: "",
    jobTitle: "",
    description: "",
    salary: "",
    resume: "",
    images: [],
    phoneNumber: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    status: "Active",
  });

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://getmaxcrm.onrender.com/api/employees");
        setEmployees(response.data.employees || []);
        setFilteredEmployees(response.data.employees || []);
        setTotalPages(Math.ceil(response.data.employees.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current employees for the current page
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleStatus = (index) => {
    setEmployees((prev) =>
      prev.map((emp, i) =>
        i === index
          ? { ...emp, status: emp.status === "Active" ? "Inactive" : "Active" }
          : emp
      )
    );
  };

  const handleAddOrEdit = async () => {
    if (editingIndex !== null) {
      try {
        await axios.put(
          `https://getmaxcrm.onrender.com/api/employees/${employeeData.employeeId}`,
          employeeData
        );
        setEmployees((prev) =>
          prev.map((emp) =>
            emp._id === employeeData.employeeId ? { ...employeeData } : emp
          )
        );
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "https://getmaxcrm.onrender.com/api/employees",
          employeeData
        );
        setEmployees([...employees, response.data.employee]);
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
    closeModal();
  };

  const handleEdit = (employee) => {
    setEditingIndex(employee._id);
    setEmployeeData({
      ...employee,
      address: employee.address || {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://getmaxcrm.onrender.com/api/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const openModal = () => {
    setEditingIndex(null);
    setEmployeeData({
      employeeId: "",
      name: "",
      jobTitle: "",
      description: "",
      salary: "",
      resume: "",
      images: [],
      phoneNumber: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Employee Details</h1>
        </div>
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex-grow">
            <SearchBar
              setFilteredEmployees={setFilteredEmployees}
              setSearchQuery={setSearchQuery}
              employees={employees}
            />
          </div>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mb-6 rounded-lg transition-colors duration-200"
          >
            Add Employee
          </button>
        </div>

        <div className="mt-4 bg-white p-6 rounded shadow-md">
          <EmployeeTable
            employees={currentEmployees}
            filteredEmployees={filteredEmployees}
            searchQuery={searchQuery}
            onToggleStatus={toggleStatus}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {isModalOpen && (
          <AddEmployeeModal
            isOpen={isModalOpen}
            onClose={closeModal}
            employeeData={employeeData}
            setEmployeeData={setEmployeeData}
            onSave={handleAddOrEdit}
            isEditing={editingIndex !== null}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
