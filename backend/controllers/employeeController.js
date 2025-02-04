
// controllers/employeeController.js
import Employee from '../models/Employee.js';
import { sendWelcomeEmail } from '../utils/emailTransporter.js';
import bcrypt from 'bcrypt';
export const createEmployee = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the incoming request body

    const { employeeId, name, jobTitle, description, salary, phoneNumber, email, address, status, password } = req.body;

    // Log extracted fields
    console.log("Extracted fields:", {
      employeeId,
      name,
      jobTitle,
      description,
      salary,
      phoneNumber,
      email,
      address,
      status,
      password,
    });

    // Validate required fields
    if (!employeeId || !name || !jobTitle || !description || !salary || !phoneNumber || !email || !status || !password) {
      console.error("Missing required fields:", {
        employeeId,
        name,
        jobTitle,
        description,
        salary,
        phoneNumber,
        email,
        status,
        password,
      });
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // Create a new employee
    const newEmployee = new Employee({
      employeeId,
      name,
      jobTitle,
      description,
      salary,
      phoneNumber,
      email,
      address,
      status,
      password: hashedPassword,
    });

    console.log("New employee object created:", newEmployee);

    // Save the employee to the database
    await newEmployee.save();
    console.log("Employee saved to the database");

    // Send a welcome email
    await sendWelcomeEmail(email, employeeId, password);
    console.log("Welcome email sent successfully");

    // Return success response
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error("Error creating employee:", error);

    // Log the full error object for debugging
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving employees', error });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving employee', error });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting employee', error });
  }
};

export const searchEmployees = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
    }
    const employees = await Employee.find({ name: { $regex: name, $options: 'i' } });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const isAdminOrnot =async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    console.log("empid",employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return the employee's role and isAdmin status
    res.status(200).json({
      name: employee.name,
      isAdmin: employee.isAdmin,
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};