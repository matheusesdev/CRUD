// src/Portal.tsx

import React, { useState, useEffect } from 'react';
import styles from './Portal.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  qtdEstoque: number;
}

class ProductCrud {
  private products: Product[];

  constructor() {
    // Recuperar produtos do Localstorage ou inicializar com array vazio
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  private updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.updateLocalStorage();
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => Number(product.id) === Number(id));
  }

  updateProduct(id: number, updatedProduct: Partial<Product>) {
    const index = this.products.findIndex(product => Number(product.id) === Number(id));
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.updateLocalStorage();
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => Number(product.id) !== Number(id));
    this.updateLocalStorage();
  }

  generateProductId() {
    return Math.floor(Math.random() * 1000) + 1;
  }
}

const Portal: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<{ name: string; price: string; quantity: string }>({ name: '', price: '', quantity: '' });
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);
  const productCrud = new ProductCrud();

  const updateTable = () => {
    setProducts(productCrud.getAllProducts());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productName = formData.name;
    const productPrice = parseFloat(formData.price);
    const productQtd = parseInt(formData.quantity);

    if (productName && !isNaN(productPrice) && !isNaN(productQtd)) {
      const newProduct: Product = {
        id: updateIndex !== null ? updateIndex : productCrud.generateProductId(),
        name: productName,
        price: productPrice,
        qtdEstoque: productQtd,
      };

      if (updateIndex !== null) {
        productCrud.updateProduct(updateIndex, newProduct);
      } else {
        productCrud.addProduct(newProduct);
      }

      updateTable();
      clearForm();
    } else {
      alert('Por favor, insira um nome de produto válido e um preço numérico.');
    }
  };

  const clearForm = () => {
    setFormData({ name: '', price: '', quantity: '' });
    setUpdateIndex(null);
  };

  const handleEdit = (id: number) => {
    const product = productCrud.getProductById(id);
    if (product) {
      setFormData({ name: product.name, price: product.price.toString(), quantity: product.qtdEstoque.toString() });
      setUpdateIndex(id);
    }
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este produto?');
    if (confirmDelete) {
      productCrud.deleteProduct(id);
      updateTable();
    }
  };

  useEffect(() => {
    updateTable();
  }, []);

  return (
    <div className={styles.portal}>
      <h1 className={styles.title}>Meus Produtos Online</h1>
      <form id="productForm" className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="name" className={styles.label}>Nome do Produto:</label>
        <input type="text" id="name" className={styles.input} value={formData.name} onChange={handleInputChange} required />
        
        <label htmlFor="price" className={styles.label}>Preço do Produto:</label>
        <input type="number" id="price" className={styles.input} value={formData.price} onChange={handleInputChange} required />
        
        <label htmlFor="quantity" className={styles.label}>Quantidade do Produto:</label>
        <input type="number" id="quantity" className={styles.input} value={formData.quantity} onChange={handleInputChange} required />
        
        <button type="submit" className={styles.button}><i className="fa-solid fa-plus"></i> Adicionar o Produto</button>
        {updateIndex !== null && (
          <button type="button" className={styles.button} onClick={clearForm}>Cancelar Edição</button>
        )}
      </form>

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
              <td className={styles.actions}>
                <button type="button" className={styles.editButton} onClick={() => handleEdit(product.id)}><i className="fa-solid fa-pen"></i> Editar</button>
                <button type="button" className={styles.deleteButton} onClick={() => handleDelete(product.id)}><i className="fa-solid fa-trash"></i> Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portal;
