import { Router } from 'express';
import { JobService } from '../services/jobServices.js';
import { validateJobData } from '../middlewares/jobMiddleware.js';

const jobService = new JobService();
const router = Router();

// create a new Job entity
router.post('/', validateJobData(false), async (req, res) => {  // uses middleware to validate incoming job data
    try {
        const newJob = await jobService.createJob(req.body);
        res.status(201).json(newJob);

    } catch (error) {
        res.status(500).json({ error: 'Error creating job', details: error.message});
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
        res.status(500).json({ error: 'Error fetching jobs', details: error.message });
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
// TODO: Refactor other methods to use this error handling with error codes
router.put('/:id?', validateJobData(true), async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ error: 'Job ID is missing, none found in request' });
        }
        const updatedJob = await jobService.updateJob(jobId, req.body);
        res.status(200).json(updatedJob);
    } catch (error) {
        // error.message MUST match error message used in jobService's 'validateJobId' method
        if (error.message === 'Invalid MongoDB ID formatting') {
            return res.status(400).json({ error: error.message });
        }

        if (error.message === 'Job ID not found in Database') {
            return res.status(404).json({ error: error.message });
        }

        res.status(500).json({ error: 'Error updating job', details: error.message });
    }
});

// delete all jobs - should make protected, admin use only? - use JWTs?
router.delete('/delete-all-jobs', async (req, res) => {
    try {
        const result = await jobService.deleteAllJobs();
        if (result.deletedCount === 0) { // check if any jobs were deleted
            return res.status(404).json({ error: 'No jobs found to delete' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting ALL jobs', details: error.message });
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
        res.status(500).json({ error: 'Error deleting job by id', details: error.message });
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
