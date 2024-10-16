import mongoose, { Schema, Document } from 'mongoose';

// TODO: Discuss jobSchema properties - add more properties (e.g. location, jobDescription, etc.), required vs optional

export interface IJob extends Document {
  companyName: string;
  applicationStatus: string;
  jobType: string;
  salary: number;
}

const jobSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  applicationStatus: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: { type: Number, required: false },
});

const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;
