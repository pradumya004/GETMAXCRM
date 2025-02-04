import React from "react";
// EmployeeRow.jsx
const EmployeeRow = ({
  employeeId,
  name,
  jobTitle,
  phoneNumber,
  email,
  address,
  status,
  searchQuery,
  onToggleStatus,
  onEdit,
  onDelete
}) => {
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-300">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <tr className="border-b">
      <td className="p-4">{employeeId}</td>
      <td className="p-4">{highlightText(name, searchQuery)}</td>
      <td className="p-4">{jobTitle}</td>
      <td className="p-4">{phoneNumber}</td>
      <td className="p-4">{email}</td>
      <td className="p-4">
        {address ? `${address.street}, ${address.city}, ${address.state}, ${address.country}` : "N/A"}
      </td>
      <td className="p-4">
        <button
          className={`px-3 py-1 rounded ${
            status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
          onClick={onToggleStatus}
        >
          {status}
        </button>
      </td>
      <td className="p-4">
        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={onEdit}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
