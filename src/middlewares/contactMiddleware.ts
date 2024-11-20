import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

class ContactValidators {

    // contactValidationSchema: creates Zod schema used for validation incoming Contact data
    /*
        firstName: required string, min 1 char, max 50 chars
        lastName: required string, min 1 char, max 50 chars
        company: required string, min 1 char, max 50 chars
        position: required string, min 1 char, max 50 chars
        email: required string, valid email format
        phone: optional string
    */

    private contactValidationSchema = z.object({

        firstName: z.string({
            required_error: 'First name is required'})
            .min(1, { message: 'First name cannot be empty' })
            .max(50, { message: 'First name must be less than 50 characters' }),

        lastName: z.string({
            required_error: 'Last name is required'})
            .min(1, { message: 'Last name cannot be empty' })
            .max(50, { message: 'Last name must be less than 50 characters' }),

        company: z.string({
            required_error: 'Company name is required'})
            .min(1, { message: 'Company name cannot be empty' })
            .max(50, { message: 'Company name must be less than 50 characters' }),

        position: z.string({
            required_error: 'Position is required'})
            .min(1, { message: 'Position cannot be empty' })
            .max(50, { message: 'Position must be less than 50 characters' }),

        email: z.string({
            required_error: 'Email is required'})
            .email({ message: 'Invalid email format' }),
        
        phone: z.string().optional(),
    });

    // check if to use partial schema (PUT), or full schema (POST) depending on optional fields
    public validateContactData(reqBody: any, isPartial: boolean = false) {
        const validationSchema = isPartial
            ? this.contactValidationSchema.partial()    // allows optional fields for updating - PUT
            : this.contactValidationSchema;             // requires all fields for contact creation - POST
        return validationSchema.parse(reqBody);
    }
}

// reformats zod error messages into a more readable format
const formatZodError = (error: z.ZodError) => error.errors.map(err => ({ field: err.path.join('.'), message: err.message }));

const contactValidator = new ContactValidators();

// Middleware for validating contact data
// isPartial = true for PUT requests(partial), false for POST(full) requests
export const validateContactData = (isPartial: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            contactValidator.validateContactData(req.body, isPartial);
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