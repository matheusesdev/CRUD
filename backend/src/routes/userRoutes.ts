import { Router } from 'express';
import { createUserController, loginUser } from '../controllers/userController';

const router = Router();

// Apenas passe a função do controlador diretamente
router.post('/createUser', createUserController);

router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res); // Await the controller function
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
