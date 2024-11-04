import Job, { IJob } from '../models/job.js';
import Skill from '../models/skill.js';
import mongoose, { Types } from 'mongoose';

export class JobService {

    async createJob(jobData: IJob): Promise<IJob> {

        // if present, converts str contacts id to MongoDb ObjectID type for storage
        if (jobData.contacts) {
            jobData.contacts = jobData.contacts.map(contact => new Types.ObjectId(contact));
        }

        if (jobData.skills) {
            jobData.skills = jobData.skills.map(skill => new Types.ObjectId(skill));
        }

        // creates, saves new Job entity and returns it
        const newJob = new Job(jobData);
        return await newJob.save();
    }

    async getAllJobs(jobFilters: any): Promise<IJob[]> {
        const query: any = {};

        // query building based on the jobFilters passed
        if (jobFilters.companyName) {
            query.companyName = { $regex: new RegExp(jobFilters.companyName, 'i') }; // query condition for DB, regex makes case-insensitive
        }
        if (jobFilters.applicationStatus) {
            query.applicationStatus = jobFilters.applicationStatus;
        }
        if (jobFilters.jobType) {
            query.jobType = jobFilters.jobType;
        }
        if (jobFilters.salary) {
            const salaryFilter = JSON.parse(jobFilters.salary);
            query.salary = salaryFilter;
        }
        // conversts param string ids into ObjectIds, then creates a query for DB
        if (jobFilters.skills) {
            const skillIds = jobFilters.skills.split(',').map((id: string) => new Types.ObjectId(id));
            query.skills = { $in: skillIds };
        }

        if (jobFilters.contacts) {
            const contactIds = jobFilters.contacts.split(',').map((id: string) => new Types.ObjectId(id));
            query.contacts = { $in: contactIds };
        }

        // returns query results
        return await Job.find(query).populate('contacts skills'); // .populate() pulls real 'contacts' & 'skills' instance data, instead of objectID
    }

    async getJobById(id: string): Promise<IJob | null> {
        await this.validateJobId(id); // use .this with helper function to validate job ID
        return await Job.findById(id).populate('contacts skills');
    }

    async updateJob(id: string, updateData: Partial<IJob>): Promise<IJob | null> {
        await this.validateJobId(id);

        if (updateData.contacts) {
            updateData.contacts = updateData.contacts.map(contact => new Types.ObjectId(contact));
        }

        if (updateData.skills) {
            updateData.skills = updateData.skills.map(skill => new Types.ObjectId(skill));
        }

        return await Job.findByIdAndUpdate(id, updateData, { new: true }).populate('contacts');
    }


    async deleteJob(id: string): Promise<IJob | null> {
        await this.validateJobId(id);
        return await Job.findByIdAndDelete(id);
    }

    // --------------------- 'Skills' related methods ------------------------------------------------

    // Add a skillID to the job's skills array
    async addSkillToJob(jobId: string, skillId: string): Promise<IJob | null> {

        // validate that the jobId and skillId are valid ObjectIds
        if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(skillId)) {
            throw new Error('Invalid Job or Skill ID format.');
        }

        // check if the jobID and skillID exist in the database
        const job = await Job.findById(jobId);
        const skill = await Skill.findById(skillId);
        if (!job) { throw new Error(`Job with ID ${jobId} not found.`); }
        if (!skill) { throw new Error(`Skill with ID ${skillId} not found.`); }

        // check if skillID is already in the job's skills array, if not add it
        if (job.skills && !job.skills.includes(skill._id as Types.ObjectId)) {
            job.skills.push(skill._id as Types.ObjectId);
            await job.save();
        }

        return job;
    }


    // Helper function to validate job ID
    private async validateJobId(id: string): Promise<IJob> {
        if (!id) {
            throw new Error('No Job ID is present');
        }

        if (!mongoose.isValidObjectId(id)) {
            throw new Error('Invalid Job ID format');
        }

        const job = await Job.findById(id);
        if (!job) {
            throw new Error('Invalid Job ID - Job not found');
        }
        return job;
    }


}
