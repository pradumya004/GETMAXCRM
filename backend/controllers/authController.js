
// controllers/authController.js
import bcrypt from 'bcryptjs';
import Employee from '../models/Employee.js';
import { generateToken } from '../middleware/auth.js';

export const login = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const employee = await Employee.findOne({ employeeId }).select('+password');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: employee._id, employeeId: employee.employeeId });
    const { password: _, ...employeeData } = employee.toObject();

    res.status(200).json({
      message: 'Login successful',
      token,
      employee: employeeData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
