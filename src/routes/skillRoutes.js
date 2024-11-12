import { Router } from 'express';
import { SkillService } from '../services/skillServices.js';
import { validateSkillData } from '../middlewares/skillMiddleware.js';
import { customErrorHandler } from '../utility/errorHandler.js';


const skillService = new SkillService();
const router = Router();

// Create a new Skill entity - validates incoming skill data
router.post('/', validateSkillData(), async (req, res) => {
    try {
        const newSkill = await skillService.createSkill(req.body);
        res.status(201).json(newSkill);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

// Get all Skills, optional query filter via query parameters
router.get('/', async (req, res) => {
    try {
        const skillFilter = req.query;
        const skills = await skillService.getAllSkills(skillFilter);
        res.status(200).json(skills); 

    } catch (error) {
        // Skill name not found in the database, 404 error
        if (error.message === 'Skill not found in the database') {
            return res.status(404).json({ error: error.message });
        }
        customErrorHandler(error, res);
    }
});


// Get Skill by ID
router.get('/:id', async (req, res) => {
    try {
        const skillId = req.params.id;
        const skill = await skillService.getSkillById(skillId);
        res.status(200).json(skill);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

// Update Skill by ID - validates incoming skill data
router.put('/:id?', validateSkillData(), async (req, res) => {
    try {
        const skillId = req.params.id;
        const updatedSkill = await skillService.updateSkill(skillId, req.body);
        res.status(200).json(updatedSkill);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

// Delete Skill by ID
router.delete('/:id?', async (req, res) => {
    try {
        const skillId = req.params.id;
        const deletedSkill = await skillService.deleteSkill(skillId);
        res.status(204).json(deletedSkill);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

export default router;
