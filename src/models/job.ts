import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IJob extends Document {
    companyName: string;
    applicationStatus: string;
    jobType: string;
    salary?: number;
    contacts?: Types.ObjectId[];    // array of 'Contact' ObjectIds
    skills?: Types.ObjectId[];
}

const jobSchema: Schema = new Schema({
    companyName: { type: String, required: true },
    applicationStatus: { type: String, required: true },
    jobType: { type: String, required: true },
    salary: { type: Number, required: false },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact', required: false }],
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill', required: false }]
});

const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;
