import { Router } from 'express';
import { createUserController } from '../controllers/userController';

const router = Router();

// Apenas passe a função do controlador diretamente
router.post('/createUser', createUserController);

export default router;
