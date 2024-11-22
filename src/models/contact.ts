import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    firstName: string;
    lastName: string;
    company: string;
    position: string;
    email: string;
    phone: string | null;
};

const contactSchema: Schema = new Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true }, 
    company: { type: String, required: true },
    position: { type: String, require: true }, 
    email: { type: String, require: true }, 
    phone: { type: String, require: false }
});

const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;