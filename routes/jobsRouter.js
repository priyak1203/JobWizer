import { Router } from 'express';
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJob,
} from '../controllers/jobsController.js';

const router = Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(editJob).delete(deleteJob);

export default router;
