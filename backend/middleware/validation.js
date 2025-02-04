
// middleware/validation.js
export const validateEmployee = (req, res, next) => {
    const { name, jobTitle, description, salary, phoneNumber, email, status } = req.body;
  
    if (!name || !jobTitle || !description || !salary || !phoneNumber || !email || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    if (isNaN(Number(salary))) {
      return res.status(400).json({ message: 'Salary must be a valid number' });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
  
    next();
  };