import { StatusCodes } from 'http-status-codes';
import Job from '../models/jobModel.js';
import mongoose from 'mongoose';
import moment from 'moment';

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  // search the job of a specific user
  const queryObject = {
    createdBy: req.user.userId,
  };

  // filtering based on search, job status and job type
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      {
        company: { $regex: search, $options: 'i' },
      },
    ];
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  // sort functionality
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const jobs = await Job.find(queryObject).sort(sortKey);

  res.status(StatusCodes.OK).json({ totalJobs: jobs.length, jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'job updated', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};

// SHOW STATS
export const showStats = async (req, res) => {
  // stats data
  let stats = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
    },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // monthly applications
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
