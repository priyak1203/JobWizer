import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import Job from '../models/jobModel.js';

// Get current user info
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// Get application stats
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

// Update user info
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  // if file exists upload the pic to cloudinary
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'jobwizer',
    });
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // remove the old picture from cloudinary
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};
