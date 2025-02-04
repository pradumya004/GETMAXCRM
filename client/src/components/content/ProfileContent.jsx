import React, { useEffect, useState, useRef } from "react";

// Simple Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        {children}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [profileImages, setProfileImages] = useState("/api/placeholder/80/80");
  const [uploading, setUploading] = useState(false); // Track upload status
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Retrieve employeeId from localStorage
        const employeeId = localStorage.getItem("employeeId");

        if (!employeeId) {
          console.error("Employee ID not found in localStorage");
          return;
        }

        // Fetch employee data from the backend
        const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Ensure images is an array
        const employee = {
          ...data.employee,
          images: data.employee.images || [], // Initialize as empty array if undefined
        };

        setEmployeeData(employee);
        setEditForm(employee); // Initialize edit form with fetched data

        // Set the first image from the images array
        if (employee.images.length > 0) {
          setProfileImages(`http://localhost:3000/api/images/${employee.employeeId}/${employee.images[0]._id}`);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleEditSubmit = () => {
    const updatedData = { ...editForm };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setEmployeeData(updatedData);
    setIsEditing(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("images", file); // Field name must match Multer's expectation
      formData.append("employeeId", localStorage.getItem("employeeId"));

      setUploading(true); // Start uploading

      try {
        const response = await fetch("http://localhost:3000/api/images/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();

        // Update profile image in state
        setProfileImages(`http://localhost:3000/api/images/${employeeData.employeeId}/${result.images[result.images.length - 1]._id}`);

        // Update employeeData with the new images array
        setEmployeeData((prevData) => ({
          ...prevData,
          images: result.images,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false); // Stop uploading
      }
    }
  };

  if (!employeeData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 via-indigo-100 to-pink-100 rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 transition-all hover:text-indigo-600">
          {employeeData.name}
        </h1>
        <p className="text-lg text-gray-500">
          Joined: {new Date(employeeData.joiningDate).toLocaleDateString()}
        </p>
      </div>

      {/* Profile Content */}
      <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  employeeData.images && employeeData.images.length > 0
                    ? `http://localhost:3000/api/images/${employeeData.employeeId}/${employeeData.images[0]._id}`
                    : "/api/placeholder/80/80"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-2xl transform transition duration-300 hover:scale-105"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-indigo-500 cursor-pointer transition-all hover:bg-indigo-600"
              >
                <span className="text-xl text-indigo-600 hover:text-white">
                  📸
                </span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">
                {employeeData.name}
              </h2>
              <p className="text-indigo-600 text-sm font-medium">
                {employeeData.jobTitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-800 font-semibold text-lg">
              Employee ID
            </label>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              {employeeData.employeeId}
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-lg">
              Email Address
            </label>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              {employeeData.email}
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-lg">
              Phone Number
            </label>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              {employeeData.phoneNumber}
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-lg">
              Address
            </label>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              {employeeData.address?.street}, {employeeData.address?.city},{" "}
              {employeeData.address?.state} {employeeData.address?.zipCode},{" "}
              {employeeData.address?.country}
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-lg">
              Salary
            </label>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              ${employeeData.salary}
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-lg">
              Status
            </label>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              {employeeData.status}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
          <p className="text-gray-700">{employeeData.description}</p>
        </div>

        {/* Resume Link */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Resume</h3>
          <a
            href={employeeData.resume}
            className="text-blue-600 hover:text-blue-700 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Edit Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <input
                type="text"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Job Title</label>
              <input
                type="text"
                value={editForm.jobTitle || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, jobTitle: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={editForm.email || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="text"
                value={editForm.phoneNumber || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, phoneNumber: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Salary</label>
              <input
                type="number"
                value={editForm.salary || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, salary: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Status</label>
              <select
                value={editForm.status || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-600">Description</label>
              <textarea
                value={editForm.description || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;