import db from '../services/db';

// Função para criar um produto
export const createProduct = async (name: string, quantity: number, price: number, codigo: number) => {
  const query = 'INSERT INTO products (name, quantity, price, codigo) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(query, [name, quantity, price, codigo]);
  return result;
};


export const getAllProducts = async () => {
  const query = 'SELECT * FROM products'; // Consulta para buscar todos os produtos
  const [rows] = await db.execute(query); // Executa a consulta
  return rows;                            // Retorna os produtos
};

export const editProduct = async (id: number, name: string, quantity: number, price: number) => {
  const query = 'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?';
  const [result] = await db.execute(query, [name, quantity, price, id]);
  return result;
}

export const deleteProduct = async (id: number) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [result]: any = await db.execute(query, [id]);

  // Verificar se alguma linha foi afetada (produto excluído)
  if (result.affectedRows === 0) {
    throw new Error('Produto não encontrado');
  }

  return result;
}
