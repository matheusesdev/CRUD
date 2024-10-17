import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Usando as rotas de produto
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
