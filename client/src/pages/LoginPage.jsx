import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Prevent flickering
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    const savedEmployeeId = localStorage.getItem("employeeId");
    if (savedEmployeeId) {
      navigate("/", { state: { selectedItem: "profile" } });
    } else {
      setIsLoading(false); // Only show login form if not logged in
    }
  }, [navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, password }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
  
      // Store only employeeId in localStorage
      localStorage.setItem("employeeId", data.employee.employeeId);
  
      console.log("Login successful!");
      navigate("/", {
        state: { employee: data.employee },
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  // Show loading indicator while checking login status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center mb-60">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">Welcome To GMS!</h1>
          <p className="text-gray-600 text-center mt-2">
            Please Login To Continue!
          </p>

          <h2 className="text-xl font-semibold mt-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="mt-4">
            <div>
              <label className="block text-gray-700">User ID</label>
              <input
                type="text"
                placeholder="Your user ID"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Your password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="remember"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="text-gray-700">
                Remember me
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">
                {errorMessage}
              </div>
            )}

            <button className="w-full bg-blue-600 text-white font-bold py-2 rounded mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              LOGIN
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
