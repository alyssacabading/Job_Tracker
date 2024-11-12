import Skill, { ISkill } from '../models/skill.js';
import Job from '../models/job.js';
import { validateId, EntityType } from '../utility/idValidation.js';

export class SkillService {
    async createSkill(skillData: ISkill): Promise<ISkill> {
         try {
            const newSkill = new Skill(skillData);
            return await newSkill.save();
        } catch (error) {

            // check if 'skillData.name' already exists in DB
            if ((error as any).code === 11000) {
                if (error instanceof Error) {
                    error.message = `The skill "${skillData.name}" already exists in DB`;
                }
            }
            throw error; 
        }
    }

    async getAllSkills(skillFilter: any = {}): Promise<ISkill[]> {
        const query: any = {};

        // query by Skill name
        if (skillFilter.name) {
            query.name = { $regex: new RegExp(skillFilter.name, 'i') };
        }
        const skills = await Skill.find(query);
        
        // if no skills found, throw a 404 error
        if (skills.length === 0) {
            throw new Error('Skill not found in the database');
        }
        return skills;

    }

    async getSkillById(id: string): Promise<ISkill | null> {
        await validateId(id, EntityType.Skill);
        return await Skill.findById(id);
    }

    async updateSkill(id: string, skillData: Partial<ISkill>): Promise<ISkill | null> {
        await validateId(id, EntityType.Skill);
        return await Skill.findByIdAndUpdate(id, skillData, { new: true });
    }

    async deleteSkill(id: string): Promise<ISkill | null> {
        await validateId(id, EntityType.Skill);
        const deletedSkill = await Skill.findByIdAndDelete(id);  // delete skill by ID from DB

        // Delete Cascade: updates all Jobs with this skill ID, remove Skill from Jobs.skills array
        if (deletedSkill) {
            await Job.updateMany(
                { skills: id },
                { $pull: { skills: id } }
            );
        }
        return deletedSkill;
    }

}
