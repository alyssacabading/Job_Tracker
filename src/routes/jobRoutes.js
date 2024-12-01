import { Router } from "express";
import { JobService } from "../services/jobServices.js";
import { validateJobData } from "../middlewares/jobMiddleware.js";
import { customErrorHandler } from "../utility/errorHandler.js";

const jobService = new JobService();
const router = Router();

// Create a new Job entity. validateJobData = False, all input fields required
router.post("/", validateJobData(false), async (req, res) => {
  // uses middleware to validate incoming job data
  try {
    console.log("Trying to post job.");
    const newJob = await jobService.createJob(req.body);
    res.status(201).json(newJob);
    console.log("Job created successfully:", newJob);
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// Get all Jobs, optional query filter via query parameters
router.get("/", async (req, res) => {
  try {
    const jobFilter = req.query;
    const jobs = await jobService.getAllJobs(jobFilter);
    res.status(200).json(jobs);
    console.log("Jobs fetched successfully:", jobs);
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// Get Job by ID
router.get("/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobService.getJobById(jobId);
    res.status(200).json(job);
    console.log("Job fetched successfully:", job);
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// Update a job by id. validateJobData = True, allows for partial updates
router.put("/:id?", validateJobData(true), async (req, res) => {
  // uses middleware to validate incoming job data
  try {
    console.log("Trying to update job");
    const jobId = req.params.id;
    console.log(req.body);
    const updatedJob = await jobService.updateJob(jobId, req.body);
    res.status(200).json(updatedJob);
    console.log("Job updated successfully:", updatedJob);
  } catch (error) {
    console.log(error);
    customErrorHandler(error, res);
  }
});

// Delete all jobs - should make protected, admin use only? - use JWTs?
router.delete("/delete-all-jobs", async (req, res) => {
  try {
    const result = await jobService.deleteAllJobs();
    if (result.deletedCount === 0) {
      // check if any jobs were deleted
      throw new Error("No jobs found to delete");
    }

    res.status(204).send();
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// Delete a job by id
router.delete("/:id?", async (req, res) => {
  try {
    const jobId = req.params.id;
    await jobService.deleteJob(jobId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    customErrorHandler(error, res);
  }
});

// --------------------- 'Skills' related methods ------------------------------------------------
// Route to add a skill to a job
router.post("/:jobId/skills", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { skillId } = req.body;
    const updatedJob = await jobService.addSkillToJob(jobId, skillId);
    res
      .status(200)
      .json({ message: "Skill added to job successfully", updatedJob });
    console.log("Skill added to job successfully:", updatedJob);
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// Route to remove a skill from a job
router.delete("/:jobId/skills", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { skillId } = req.body;
    const updatedJob = await jobService.removeSkillFromJob(jobId, skillId);
    res
      .status(200)
      .json({ message: "Skill removed from job successfully", updatedJob });
    console.log("Skill removed from job successfully:", updatedJob);
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// --------------------- 'Contacts' related methods ------------------------------------------------
// Add a contact to a job
router.post("/:jobId/contacts", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { contactId } = req.body;
    const updatedJob = await jobService.addContactToJob(jobId, contactId);
    res
      .status(200)
      .json({ message: "Contact added to job successfully", updatedJob });
    console.log("Contact added to job successfully:", updatedJob);
  } catch (error) {
    customErrorHandler(error, res);
  }
});

// Remove a contact from a job
router.delete("/:jobId/contacts", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { contactId } = req.body;
    const updatedJob = await jobService.removeContactFromJob(jobId, contactId);
    res
      .status(200)
      .json({ message: "Contact removed from job successfully", updatedJob });
  } catch (error) {
    customErrorHandler(error, res);
  }
});

export default router;
