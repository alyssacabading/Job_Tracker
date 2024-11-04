import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    name: string;  // skill name like "Python", "HTML", "MongoDB"
}

const skillSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Skill = mongoose.model<ISkill>('Skill', skillSchema);

export default Skill;
