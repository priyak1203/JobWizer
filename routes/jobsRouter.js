import { Router } from 'express';
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getJob,
} from '../controllers/jobsController.js';
import {
  validateIdParam,
  validateJobInput,
} from '../middlewares/validation.js';

const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(validateIdParam, validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
