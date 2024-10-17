import mysql from 'mysql2/promise';

// Configuração do banco de dados
const db = mysql.createPool({
  host: 'plataformaserver.cloud',
  user: 'joao-unex',
  password: '4512',
  database: 'joao-unex',
});

export default db;
