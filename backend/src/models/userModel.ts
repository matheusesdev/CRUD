import db from '../services/db';
import { RowDataPacket } from 'mysql2';

// Define the interface for the User
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Função para criar um usuário
export const createUser = async (name: string, password: string, email: string, cpf: string) => {
  const query = 'INSERT INTO users (name, password, email, cpf) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(query, [name, password, email, cpf]);
  return result;
};

// Função para obter um usuário pelo email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE email = ?';
  
  // Execute the query and cast the result as RowDataPacket[]
  const [rows] = await db.query<RowDataPacket[]>(query, [email]);

  // Check if user was found
  if (rows.length > 0) {
    // Cast the first row to a User object
    const user = rows[0] as User;
    return user;
  }
  
  return null; // Return null if no user is found
};
