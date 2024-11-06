import { Router } from 'express';
import { SkillService } from '../services/skillServices.js';

const skillService = new SkillService();
const router = Router();

// create a new Skill entity
router.post('/', async (req, res) => {
    try {
        const newSkill = await skillService.createSkill(req.body);
        res.status(201).json(newSkill);

    } catch (error) {
        res.status(500).json({ error: 'Error creating skill', details: error.message });
    }
});

// get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await skillService.getAllSkills();
        if (!skills) {
            return res.status(404).json({ error: 'Skills not found' });
        }
        res.status(200).json(skills);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching skills', details: error.message });
    }
});

// update a skill by ID
router.put('/:id', async (req, res) => {
    try {
        const skillId = req.params.id;
        const updatedSkill = await skillService.updateSkill(skillId, req.body);
        if (!updatedSkill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.status(200).json(updatedSkill);

    } catch (error) {
        res.status(500).json({ error: 'Error updating skill', details: error.message });
    }
});

// delete a skill by ID
router.delete('/:id', async (req, res) => {
    try {
        const skillId = req.params.id;
        const deletedSkill = await skillService.deleteSkill(skillId);
        if (!deletedSkill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Error deleting skill', details: error.message });
    }
});

export default router;
