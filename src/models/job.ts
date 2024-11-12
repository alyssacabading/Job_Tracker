import mongoose, { Schema, Document, Types } from 'mongoose';
import { IContact } from './contact';
import { ISkill } from './skill';

export interface IJob extends Document {
    companyName: string;
    applicationStatus: string;
    jobType: string;
    salary?: number | null;
    contacts?: IContact['_id'][];
    skills?: ISkill['_id'][];
    addContact(contactId: IContact['_id']): Promise<void>;
    removeContact(contactId: IContact['_id']): Promise<void>;
    addSkill(skillId: ISkill['_id']): Promise<void>;
    removeSkill(skillId: ISkill['_id']): Promise<void>;
}

const jobSchema: Schema = new Schema({
    companyName: { type: String, required: true },
    applicationStatus: { type: String, required: true },
    jobType: { type: String, required: true },
    salary: { type: Number, required: false },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact', required: false }],
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill', required: false }]
});

jobSchema.methods.addContact = async function (contactId: IContact['_id']): Promise<void> {
    if (!this.contacts.includes(contactId)) {
        this.contacts.push(contactId);
        await this.save();
    }
};

jobSchema.methods.removeContact = async function (contactId: IContact['_id']): Promise<void> {
    this.contacts = this.contacts.filter((id:any) => !id.equals(contactId));
    await this.save();
};

jobSchema.methods.addSkill = async function (skillId: ISkill['_id']): Promise<void> {
    if (!this.skills.includes(skillId)) {
        this.skills.push(skillId);
        await this.save();
    }
};

jobSchema.methods.removeSkill = async function (skillId: ISkill['_id']): Promise<void> {
    this.skills = this.skills.filter((id: any) => !id.equals(skillId));
    await this.save();
};

const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;