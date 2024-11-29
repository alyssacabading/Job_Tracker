import Job, { IJob } from '../models/job.js';
import { Types } from 'mongoose';
import { validateId, EntityType } from '../utility/idValidation.js';
import Skill from '../models/skill.js';
import { SkillService } from './skillServices.js';

const newService = new SkillService();

export class JobService {

    async createJob(jobData: IJob): Promise<IJob> {
        const { skills = [], ...rest } = jobData;
        const job = new Job(rest);

        // loop over skills.skillName and add them to Skills DB if they don't exist
        for (const skillName of skills) {
            let existingSkill = await Skill.findOne({ name: skillName });
            if (!existingSkill) {
                existingSkill = await Skill.create({ name: skillName });
            }
            await job.addSkill(existingSkill._id); // Use the addSkill method
        }

        return await job.save();
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
        if (jobFilters.jobTitle) {
            query.jobTitle = { $regex: new RegExp(jobFilters.jobTitle, 'i') }; 
        }
 
        // converts param string ids into ObjectIds, then creates a query for DB
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

    async getJobById(jobId: string): Promise<IJob | null> {
        await validateId(jobId, EntityType.Job);
        return await Job.findById(jobId).populate('contacts skills');
    }

    async updateJob(jobId: string, updateData: Partial<IJob>): Promise<IJob | null> {
        const { skills = [], ...rest } = updateData;  // extract current skills from updateData
        await validateId(jobId, EntityType.Job);
        const job = await Job.findById(jobId).populate('skills');
        if (!job) {
            throw new Error(`Job with ID ${jobId} not found`);
        }

        // loop thru Skills.SkillName and add them to Skills DB if they don't exist
        for (const skillName of skills) {
            let existingSkill = await Skill.findOne({ name: skillName });
            if (!existingSkill) {
                existingSkill = await Skill.create({ name: skillName });
            }
            await job.addSkill(existingSkill._id); // add new Skill to Skills DB
        }

        // save updates to Job
        Object.assign(job, rest);
        return await job.save();
    }

    async deleteJob(jobId: string): Promise<IJob | null> {
        await validateId(jobId, EntityType.Job); 
        return await Job.findByIdAndDelete(jobId);
    }

    // should be admin protected?
    async deleteAllJobs(): Promise<{ deletedCount: number }> {
        const result = await Job.deleteMany({});
        return { deletedCount: result.deletedCount || 0 };
    }

    // Functions on Job Skills

    async addSkillToJob(jobId: string, skillId: string): Promise<IJob | null> {
        const job = await validateId(jobId, EntityType.Job);
        const skill = await validateId(skillId, EntityType.Skill);
        await job.addSkill(skill._id);
        return job;
    }

    async removeSkillFromJob(jobId: string, skillId: string): Promise<IJob | null> {
        const job = await validateId(jobId, EntityType.Job);
        await job.removeSkill(skillId);
        return job;
    }

    // Functions on Job Contacts

    async addContactToJob(jobId: string, contactId: string): Promise<IJob | null> {
        const job = await validateId(jobId, EntityType.Job);
        const contact = await validateId(contactId, EntityType.Contact);
        await job.addContact(contact._id);
        return job;
    }

    async removeContactFromJob(jobId: string, contactId: string): Promise<IJob | null> {
        const job = await validateId(jobId, EntityType.Job);
        await job.removeContact(contactId);
        return job;
    }
}