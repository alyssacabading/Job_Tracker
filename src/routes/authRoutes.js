import { Router } from 'express';
import { AuthService } from '../services/authService.js';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const token = await authService.register(req.body);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

export default router;