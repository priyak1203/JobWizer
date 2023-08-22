import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/userModel.js';
import Job from './models/jobModel.js';

try {
  // connect to the database
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'));

  // find the user
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await User.findOne({ email: 'test@test.com' });

  // get the data from local file
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );

  // modify the data to attach user info
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  // populate the db with the data
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
