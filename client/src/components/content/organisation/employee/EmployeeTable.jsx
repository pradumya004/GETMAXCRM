import React from "react";

const EmployeeTable = ({
  employees,
  filteredEmployees,
  searchQuery,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const EmployeeRow = ({
    employeeId,
    name,
    jobTitle,
    phoneNumber,
    email,
    status,
    searchQuery,
    onToggleStatus,
    onEdit,
    onDelete,
  }) => (
    <tr className="border-b">
      <td className="p-4">{employeeId}</td>
      <td className="p-4">{highlightText(name, searchQuery)}</td>
      <td className="p-4">{jobTitle}</td>
      <td className="p-4">{phoneNumber}</td>
      <td className="p-4">{email}</td>
      <td className="p-4">
        <button
          className={`px-3 py-1 rounded ${
            status === "Active"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
          onClick={onToggleStatus}
        >
          {status}
        </button>
      </td>
      <td className="p-4">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  const highlightText = (text, query) => {
    if (!query || !text) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-300">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const displayEmployees =
    filteredEmployees.length > 0 ? filteredEmployees : employees;

  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr>
          {[
            "Employee ID",
            "Name",
            "Job Title",
            "Phone Number",
            "Email",
            "Status",
            "Actions",
          ].map((header) => (
            <th key={header} className="p-4 bg-gray-100 border-b text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayEmployees.map((employee) => (
          <EmployeeRow
            key={employee._id}
            employeeId={employee.employeeId}
            name={employee.name}
            jobTitle={employee.jobTitle}
            phoneNumber={employee.phoneNumber}
            email={employee.email}
            address={employee.address}
            status={employee.status}
            searchQuery={searchQuery}
            onToggleStatus={() => onToggleStatus(employee._id)}
            onEdit={() => onEdit(employee)}
            onDelete={() => onDelete(employee._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
