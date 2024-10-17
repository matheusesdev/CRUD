import { Router } from 'express';
import { createProductController, getAllProductsController, editProductController, deleteProductController } from '../controllers/productController';

const router = Router();

// Passe a função diretamente, sem tentar especificar o retorno da rota
router.post('/create', createProductController);  // Adicione a nova rota POST

router.get('/getproducts', getAllProductsController);

router.put('/editproduct/:id', editProductController);

router.post('/deleteproduct/:id', deleteProductController)

export default router;

