import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';

// Register User
export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

// Login User
export const login = async (req, res) => {
  res.send('login user');
};
