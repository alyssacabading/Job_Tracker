import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

class SkillValidators {

    // skillValidationSchema: creates Zod schema used for validating incoming Skill data
    //  name: required string, min 1 char, max 20 chars
    private skillValidationSchema = z.object({

        name: z.string({
        required_error: 'Skill name is required'})
        .min(1, { message: 'Skill name cannot be empty' })
        .max(20, { message: 'Skill name must be less than 20 characters' }), 
    });

    // validates the Skill data, only full updates for both POST and PUT - no partial updates
    public validateSkillData(reqBody: any) {
        return this.skillValidationSchema.parse(reqBody);
    }
}

// reformats zod error messages into a more readable format
const formatZodError = (error: z.ZodError) => error.errors.map(err => ({ field: err.path.join('.'), message: err.message }));


const skillValidator = new SkillValidators();

// Middleware for validating skill data - only full updates allowed for POST/PUT
export const validateSkillData = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            skillValidator.validateSkillData(req.body);
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