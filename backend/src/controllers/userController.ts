import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { createUser } from '../models/userModel';
import bcrypt from 'bcrypt';  // Importando o bcrypt para criptografar a senha

export const createUserController = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ message: 'Nome e senha são obrigatórios' });
  }

  try {
    // Criptografar a senha usando bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Salvar o usuário com a senha criptografada no banco de dados
    const result = await createUser(name, hashedPassword) as ResultSetHeader;

    // Enviar a resposta com o status 201 e o ID do usuário criado
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      userId: result.insertId,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
