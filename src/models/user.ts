import mongoose, { Schema, Document } from 'mongoose';
import { ISkill } from './skill';
import { ObjectId } from 'mongodb';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  skills: ISkill['_id'][];
  addSkill(skillId: ISkill['_id']): Promise<void>;
  removeSkill(skillId: ISkill['_id']): Promise<void>;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
});

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

const User = mongoose.model<IUser>('User', userSchema);

export default User;