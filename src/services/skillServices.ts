import Skill, { ISkill } from '../models/skill.js';
import Job from '../models/job.js';
import mongoose from 'mongoose';

export class SkillService {
    async createSkill(skillData: ISkill): Promise<ISkill> {
        const newSkill = new Skill(skillData);
        return await newSkill.save();
    }

    async getAllSkills(): Promise<ISkill[]> {
        return await Skill.find();
    }

    async updateSkill(id: string, skillData: Partial<ISkill>): Promise<ISkill | null> {
        await this.validateSkillId(id);
        return await Skill.findByIdAndUpdate(id, skillData, { new: true });
    }

    async deleteSkill(id: string): Promise<ISkill | null> {

        // validate skillID
        await this.validateSkillId(id);

        // delete Skill instance from DB
        const deletedSkill = await Skill.findByIdAndDelete(id);

        // updates all Jobs with this skill ID, by removing it
        if (deletedSkill) {
            await Job.updateMany(
                { skills: id },             // find jobs with this skill ID
                { $pull: { skills: id } }   // remove the ObjectId from the skills arr
            );
        }
        return deletedSkill;
    }


    //  ------------------ Helper function to validate Skill ID -----------------------------
    private async validateSkillId(id: string): Promise<ISkill> {
        if (!id) {
            throw new Error('No Skill ID is present');
        }

        if (!mongoose.isValidObjectId(id)) {
            throw new Error('Invalid Skill ID format');
        }

        const skill = await Skill.findById(id);
        if (!skill) {
            throw new Error('Invalid Skill ID - Skill not found');
        }

        return skill;
    }

}
