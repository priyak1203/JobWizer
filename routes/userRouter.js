import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middlewares/validation.js';
import { authorizePermissions } from '../middlewares/authentication.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions, getApplicationStats);
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;
