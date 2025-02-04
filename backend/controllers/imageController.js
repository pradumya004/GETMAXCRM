
// controllers/imageController.js
import Employee from '../models/Employee.js';

export const uploadImage = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId },
      { $push: { images: image } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ images: updatedEmployee.images });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

export const getImage = async (req, res) => {
  try {
    const { employeeId, imageId } = req.params;
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const image = employee.images.id(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.contentType(image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving image', error });
  }
};