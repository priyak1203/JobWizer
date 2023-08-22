import { Router } from 'express';
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getJob,
  showStats,
} from '../controllers/jobsController.js';
import {
  validateIdParam,
  validateJobInput,
} from '../middlewares/validation.js';
import { checkForTestUser } from '../middlewares/authentication.js';

const router = Router();

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
