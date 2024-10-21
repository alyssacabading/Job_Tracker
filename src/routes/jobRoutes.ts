import express from 'express';
import { createJob, getAllJobs, updateJob, deleteJob } from '../services/jobServices.js';

const router = express.Router();

// TODO:  - Add more routes: getJobByID, getJobByStatus, etc. depending on needs
//        - Add input data validation and error handling 

// create a new JOB entity
router.post('/', async (req, res) => {
  try {
    const job = await createJob(req.body);
    console.log('POST: Created new job:', job); 
    res.status(201).json({ message: 'Job created successfully', job });

  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

// get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await getAllJobs();
    console.log('GET All jobs:', jobs);
    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs', error });
  }
});

// update a job by id
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await updateJob(req.params.id, req.body);
    console.log('PUT: Updated job:', updatedJob); 
    res.status(200).json({ message: 'Job updated successfully', updatedJob });

  } catch (error) {
    console.error('Error updating job:', (error as Error).message);
    res.status(400).json({ message: 'Error updating job', error: (error as Error).message });
  }
});

// delete a job by id
router.delete('/:id', async (req, res) => {
  try {
    await deleteJob(req.params.id);
    console.log('DELETE: Job deleted ID:', req.params.id); 
    res.status(204).send();

  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
});

export default router;