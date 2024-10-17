import db from '../services/db';

// Função para criar um usuário
export const createUser = async (name: string, password: string) => {
  const query = 'INSERT INTO users (name, password) VALUES (?, ?)';
  const [result] = await db.execute(query, [name, password]);
  return result;
};
