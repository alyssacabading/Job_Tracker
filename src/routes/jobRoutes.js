import { Router } from 'express';
import { JobService } from '../services/jobServices.js';

const jobService = new JobService();
const router = Router();

// create a new Job entity
router.post('/', async (req, res) => {
    try {
        const newJob = await jobService.createJob(req.body);
        res.status(201).json(newJob);

    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error });
    }
});

// get all jobs, optional query filter
router.get('/', async (req, res) => {
    try {
        const jobFilter = req.query;  // optional query parameters
        const jobs = await jobService.getAllJobs(jobFilter);

        if (!jobs) {
            return res.status(404).json({ error: 'Jobs not found' });
        };
        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching jobs', details: error });
    }
});

// Get Job by ID
router.get('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobService.getJobById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching job', details: error.message });
    }
});

// update a job by id
router.put('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = await jobService.updateJob(jobId, req.body);
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(updatedJob);

    } catch (error) {
        res.status(500).json({ error: 'Error updating job', details: error });
    }
});

// delete a job by id
router.delete('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await jobService.deleteJob(jobId);
        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Error deleting job', details: error });
    }
});

// --------------------- 'Skills' related methods ------------------------------------------------
// Route to add a skill to a job
router.post('/:jobId/skills/:skillId', async (req, res) => { 
    try {
        const { jobId, skillId } = req.params;
        const updatedJob = await jobService.addSkillToJob(jobId, skillId);

        res.status(200).json({ message: 'Skill added to job successfully', updatedJob });
    } catch (error) {
        res.status(400).json({ message: 'Error adding skill to job', error: error.message });
    }
});


export default router;
