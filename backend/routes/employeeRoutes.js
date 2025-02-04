
// routes/employeeRoutes.js
import express from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployees,isAdminOrnot } from '../controllers/employeeController.js';
import { validateEmployee } from '../middleware/validation.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createEmployee);
router.get('/',  getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id',  deleteEmployee);
router.post('/search', searchEmployees);
router.get('/isAdminOrNot/:id',isAdminOrnot);
export default router;