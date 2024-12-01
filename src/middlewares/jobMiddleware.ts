import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ApplicationStatus, JobType } from "./jobEnum.js";

class JobValidators {
  // jobValidationSchema: creates Zod schema used for validation incoming Job data, uses enum values for applicationStatus and jobType
  /*
        companyName: required sring, min 1 char, max 100 chars
        applicationStatus: required enum value from ApplicationStatus
        jobType: required enum value from JobType
        jobTitle: required sring, min 1 char, max 50 chars
        contacts: optional array of valid ObjectIds
        skills: optional array of valid ObjectIds
    */
  private jobValidationSchema = z.object({
    companyName: z
      .string({
        required_error: "Company name field is required",
      })
      .min(1, { message: "Company name cannot be empty" })
      .max(100, { message: "Company name must be less than 100 characters" }),

    applicationStatus: z.nativeEnum(ApplicationStatus, {
      required_error: "Application status is required",
    }),

    jobType: z.nativeEnum(JobType, {
      required_error: "Job type is required",
    }),

    jobTitle: z
      .string({
        required_error: "Job Title field is required",
      })
      .min(1, { message: "Job Title cannot be empty" })
      .max(50, { message: "Job Title must be less than 50 characters" }),

    contacts: z
      .array(
        z.string().refine((val) => mongoose.isValidObjectId(val), {
          message: "Invalid ObjectId for contacts",
        })
      )
      .optional(),

    skills: z
      .array(
        z
          .string()
          .refine(
            (val) => mongoose.isValidObjectId(val) || typeof val === "string",
            {
              message: "skill must be a string OR a valid ObjectId",
            }
          )
      )
      .optional(),
  });

  // check if to use partial schema (PUT), or full schema (POST) depending on optional fields
  public validateJobData(reqBody: any, isPartial: boolean = false) {
    const validationSchema = isPartial
      ? this.jobValidationSchema.partial() // allows optional fields for updating - PUT
      : this.jobValidationSchema; // requires all fields for job creation - POST
    return validationSchema.parse(reqBody);
  }
}

// reformats zod error messages into a more readable format
const formatZodError = (error: z.ZodError) =>
  error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

const jobValidator = new JobValidators();

// Middleware for validating job data, both partial and full requests
// isPartial = true for PUT requests(partial), false for POST(full) requests
export const validateJobData = (isPartial: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      jobValidator.validateJobData(req.body, isPartial);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: formatZodError(error),
        });
      }
      next(error);
    }
  };
};
