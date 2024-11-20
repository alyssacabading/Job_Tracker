import { Router } from 'express';
import { UserService } from '../services/userServices.js';

const userService = new UserService();
const router = Router();

// Create User
router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
        console.log('User created successfully:', newUser);
    } catch (err) {
        res.status(500).json({ error: 'Error creating user.', details: err});
    };
});

// Get Users
router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        console.log('Users fetched successfully:', users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users', details: err });
    }
})

// Get User By ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        console.log('User fetched successfully:', user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err });
      }
});

// Update User By ID
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.updateUser(userId, req.body);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        console.log('User updated successfully:', user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err });
    }
});

// Delete User By ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        console.log('User deleted successfully:', userId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user', details: err });
    }
});

// Skill Routes

router.post('/:id/skills', async (req, res) => {
    try {
        const userId = req.params.id;
        const { skillId } = req.body; // skillId should be in request
        const updatedUser = await userService.addSkillToUser(userId, skillId);
        res.status(200).json(updatedUser);
        console.log('Skill added to user successfully:', updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id/skills', async (req, res) => {
    try {
        const userId = req.params.id;
        const { skillId } = req.body; // skillId should be in request
        const updatedUser = await userService.removeSkillFromUser(userId, skillId);
        res.status(200).json(updatedUser);
        console.log('Skill removed from user successfully:', updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// Contacts Routes

router.post('/:id/contacts', async (req, res) => {
    try {
        const userId = req.params.id;
        const { contactId } = req.body;
        const updatedUser = await userService.addContactToUser(userId, contactId);
        res.status(200).json(updatedUser);
        console.log('Contact added to user successfully:', updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.delete('/:id/contacts', async (req, res) => {
    try {
        const userId = req.params.id;
        const { contactId } = req.body;
        const updatedUser = await userService.removeContactFromUser(userId, contactId);
        res.status(200).json(updatedUser);
        console.log('Contact removed from user successfully:', updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Job Routes

router.post('/:id/jobs', async (req, res) => {
    try {
        const userId = req.params.id;
        const { jobId } = req.body;
        const updatedUser = await userService.addJobToUser(userId, jobId);
        res.status(200).json(updatedUser);
        console.log('Job added to user successfully:', updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.delete('/:id/jobs', async (req, res) => {
    try {
        const userId = req.params.id;
        const { jobId } = req.body;
        const updatedUser = await userService.removeJobFromUser(userId, jobId);
        res.status(200).json(updatedUser);
        console.log('Job removed from user successfully:', updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router;