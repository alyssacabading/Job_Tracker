import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApplicationStatus, JobType } from './jobEnum.js';


class JobValidators{

    // jobValidationSchema: creates Zod schema used for validation incoming Job data, uses enum values for applicationStatus and jobType
    /*
        companyName: required sring, min 1 char, max 100 chars
        applicationStatus: required enum value from ApplicationStatus
        jobType: required enum value from JobType
        salary: optional number or null, min 0
        contacts: optional array of valid ObjectIds
        skills: optional array of valid ObjectIds
    */
    private jobValidationSchema = z.object({

        companyName: z.string({
            required_error: 'Company name field is required'})
            .min(1, { message: 'Company name cannot be empty'})
            .max(100, { message: 'Company name less than 100 characters'}),

        applicationStatus: z.nativeEnum(ApplicationStatus, {
            required_error: 'Application status is required',
        }),

        jobType: z.nativeEnum(JobType, {
            required_error: 'Job type is required',
        }),

        salary: z.number()
            .min(0, { message: 'Salary must be a positive number' })
            .nullable().optional(),

        contacts: z.array(z.string().refine((val) => mongoose.isValidObjectId(val), {
            message: 'Invalid ObjectId for contacts'})).optional(),

        skills: z.array(z.string().refine((val) => mongoose.isValidObjectId(val), {
            message: 'Invalid ObjectId for skills'})).optional(),
    });

    // check if to use partial schema (PUT), or full schema (POST) depending on optional fields
    public validateJobData(reqBody: any, isPartial: boolean = false) {
        const validationSchema = isPartial
            ? this.jobValidationSchema.partial()    // allows optional fields for updating - PUT
            : this.jobValidationSchema;             // requires all fields for job creation - POST
        return validationSchema.parse(reqBody);
    }
}

// reformats zod error messages into a more readable format
const formatZodError = (error: z.ZodError) => error.errors.map(err => ({ field: err.path.join('.'), message: err.message }));


const jobValidator = new JobValidators();

// Middleware for validating job data, both partial and full requests
// isPartial = true for PUT requests(partial), false for POST(full) requests
export const validateJobData = (isPartial: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            jobValidator.validateJobData(req.body, isPartial);
            next();

        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: formatZodError(error),
                });
            }
            next(error);
        }
    };
};
