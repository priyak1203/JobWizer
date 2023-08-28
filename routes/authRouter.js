import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middlewares/validation.js';
import apiLimiter from '../middlewares/apiLimiter.js';

const router = Router();

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
