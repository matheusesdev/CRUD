// src/pages/Loja/index.tsx

import React, { useState, useEffect } from 'react';
import styles from './Loja.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  qtdEstoque: number;
}

class ProductCrud {
  private products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
  private currentId: number = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;

  // Adicionar um produto
  addProduct(product: Product) {
    this.products.push(product);
    this.updateLocalStorage();
  }

  // Deletar um produto
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.updateLocalStorage();
  }

  // Atualizar um produto
  updateProduct(id: number, updatedProduct: Partial<Product>) {
    this.products = this.products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    this.updateLocalStorage();
  }

  // Obter todos os produtos
  getAllProducts() {
    return this.products;
  }

  // Atualizar o localStorage
  private updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  // Gerar um ID único para o produto
  generateProductId() {
    return this.currentId++;
  }

  // Obter um produto por ID
  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }
}

const Loja: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const productCrud = new ProductCrud();
  const NUMBER_WHATSAPP = '5577988888888';

  // Atualizar a tabela com produtos
  const updateTable = () => {
    setProducts(productCrud.getAllProducts());
  };

  // Inicializar a tabela com produtos existentes ao montar o componente
  useEffect(() => {
    updateTable();
  }, []);

  return (
    <div className={styles.loja}>
      <h1>Loja Online</h1>
      <table id="productTable" className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome do Produto</th>
            <th>Preço do Produto</th>
            <th>Quantidade em Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
              <td>{product.qtdEstoque}</td>
              <td id="btnZap">
                {product.qtdEstoque > 0 ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://api.whatsapp.com/send?phone=${NUMBER_WHATSAPP}&text=Olá você gostaria de realizar o pedido do produto: ${product.name}`}>
                    Realizar Pedido <i style={{ color: '#75e901' }} className="fa-brands fa-whatsapp"></i>
                  </a>
                ) : (
                  <span>Produto Indisponível</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loja;
