import mongoose, { Schema, Document } from 'mongoose';
import { ISkill } from './skill';
import { IContact } from './contact';
import { IJob } from './job';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  contacts: IContact['_id'][];
  skills: ISkill['_id'][];
  jobs: IJob['_id'][];
  addContact(contactId: IContact['_id']): Promise<void>;
  removeContact(contactId: IContact['_id']): Promise<void>;
  addSkill(skillId: ISkill['_id']): Promise<void>;
  removeSkill(skillId: ISkill['_id']): Promise<void>;
  addJob(jobId: IJob['_id']): Promise<void>;
  removeJob(jobId: IJob['_id']): Promise<void>;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contacts: { type: [Schema.Types.ObjectId], ref: 'Contact', default: []},
  skills: { type: [Schema.Types.ObjectId], ref: 'Skill', default: []},
  jobs: { type: [Schema.Types.ObjectId], ref: 'Job', default: []}
});

userSchema.methods.addContact = async function (contactId: IContact['_id']): Promise<void> {
  if (!this.contacts.includes(contactId)) {
    this.contacts.push(contactId);
    await this.save();
  }
}

userSchema.methods.removeContact = async function (contactId: IContact['_id']): Promise<void> {
  this.contacts = this.contacts.filter((id: any) => !id.equals(contactId));
  await this.save();
}

userSchema.methods.addSkill = async function (skillId: ISkill['_id']): Promise<void> {
  if (!this.skills.includes(skillId)) {
    this.skills.push(skillId);
    await this.save();
  }
}

userSchema.methods.removeSkill = async function (skillId: ISkill['_id']): Promise<void> {
  this.skills = this.skills.filter((id: any) => !id.equals(skillId));
  await this.save();
}

userSchema.methods.addJob = async function (jobId: IJob['_id']): Promise<void> {
  if (!this.jobs.includes(jobId)) {
    this.jobs.push(jobId);
    await this.save()
  }
}

userSchema.methods.removeJob = async function (jobId:IJob['_id']): Promise<void> {
  this.jobs = this.jobs.filter((id: any) => !id.equals(jobId));
  await this.save();
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;