import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { createProduct, getAllProducts, editProduct, deleteProduct } from '../models/productModel';


const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const createProductController = async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    res.status(400).json({ message: 'Nome, preço e quantidade são obrigatórios' });
  }

  try {
    // Gerar o código aleatório de 6 dígitos
    const codigo = generateRandomCode();

    // Chamar a função para criar o produto com o código
    const result = await createProduct(name, quantity, price, codigo) as ResultSetHeader;

    res.status(201).json({
      message: 'Produto criado com sucesso',
      productId: result.insertId,
      codigo,
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts(); // Chama a função do modelo
    res.status(200).json(products);   // Retorna a lista de produtos como JSON
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const editProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;

  if (!name || !quantity) {
    res.status(400).json({ message: 'Nome, quantidade e preço são obrigatórios' });
  }

  try {
    const result = await editProduct(Number(id), name, quantity, price) as ResultSetHeader;
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      res.status(200).json({ message: 'Produto atualizado com sucesso' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};


export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteProduct(Number(id));
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ message: (error as any).message || 'Erro no servidor' });
  }
};
