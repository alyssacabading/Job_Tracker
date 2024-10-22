import Job, { IJob } from '../models/jobs.js';
import mongoose from 'mongoose';

// create a new job
export const createJob = async (jobData: IJob) => {
  const newJob = new Job(jobData);
  return await newJob.save();
};

// get all jobs
export const getAllJobs = async () => {
  return await Job.find();
};


// update a job using id
export const updateJob = async (id: string, updateData: Partial<IJob>): Promise<IJob> => {
  await validateJobId(id);
  return await Job.findByIdAndUpdate(id, updateData, { new: true }) as IJob; 
};

// delete a job using id
export const deleteJob = async (id: string): Promise<IJob | null> => {
  await validateJobId(id);
  return await Job.findByIdAndDelete(id);
};


// ------------ helper fx --------------------------

// Validates job ID
export const validateJobId = async (id: string): Promise<IJob> => {
  
  // checks if job_id is null
  if (!id) {
    throw new Error('No Job ID is present');
  }

  // checks mongoose format is correct
  if (!mongoose.isValidObjectId(id)) {
    throw new Error('Invalid Job ID format');
  }

  // checks if job exists in the database
  const job = await Job.findById(id); 
  if (!job) {
    throw new Error('Invalid Job ID - Job not found');
  }
  return job; 
};