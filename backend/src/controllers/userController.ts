import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel';
import { ResultSetHeader } from 'mysql2';

// Secret key for JWT (store this in .env in production)
const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Controller to create a new user
export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, cpf } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const result = await createUser(name, hashedPassword, email, cpf) as ResultSetHeader;

    // Send a success response with the new user's ID
    res.status(201).json({ message: 'Usuário criado com sucesso', userId: result.insertId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Controller to login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Fetch the user by email
    const user = await getUserByEmail(email);

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    // Return the token to the client
    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
