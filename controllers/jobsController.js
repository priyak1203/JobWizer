import { nanoid } from 'nanoid';
import Job from '../models/jobModel.js';

// local data setup
let jobs = [
  { id: nanoid(), company: 'apple', position: 'Front end' },
  { id: nanoid(), company: 'google', position: 'Analyst' },
  { id: nanoid(), company: 'natwest', position: 'React Dev' },
];

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(200).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(201).json({ job });
};

// EDIT JOB
export const editJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).send('Please provide company and position');
  }

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
};
