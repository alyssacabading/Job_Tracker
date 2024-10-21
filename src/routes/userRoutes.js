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
    } catch (err) {
        res.status(500).json({ error: 'Error creating user.', details: error});
    };
});

// Get Users
router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users', details: error });
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
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user', details: error });
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
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user', details: error });
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
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user', details: error });
    }
});

export default router;