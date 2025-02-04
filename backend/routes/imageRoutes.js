
// routes/imageRoutes.js
import express from 'express';
import { uploadImage, getImage } from '../controllers/imageController.js';
import upload from '../config/multerconfig.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', upload.single('images'), uploadImage);
router.get('/:employeeId/:imageId', getImage);

export default router;
