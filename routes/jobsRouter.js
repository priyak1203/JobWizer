import { Router } from 'express';
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getJob,
} from '../controllers/jobsController.js';
import { validateJobInput } from '../middlewares/validation.js';

const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
