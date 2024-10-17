import React, { useState } from 'react';
import styles from './Products.module.css';
import { Sidebar } from '../../components/Sidebar';
import { FaPlus } from "react-icons/fa";

const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para fechar o modal ao clicar fora dele
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar/>
      <div className={styles.portal}>
        <div className={styles.topo}>
          <h1 className={styles.title}>Meus Produtos</h1>
          <button className={styles.cadastrobutton} onClick={openModal}> 
            <FaPlus/> Cadastrar Produto
          </button>
        </div>

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
            {/* Aqui vão os produtos */}
          </tbody>
        </table>

        {/* Modal de Cadastro */}
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
              <h2>Cadastrar Produto</h2>
              <form>
                <div className={styles.formGroup}>
                  <label htmlFor="codigo">Código:</label>
                  <input type="text" id="codigo" name="codigo" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome do Produto:</label>
                  <input type="text" id="nome" name="nome" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="preco">Preço do Produto:</label>
                  <input type="number" id="preco" name="preco" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="quantidade">Quantidade:</label>
                  <input type="number" id="quantidade" name="quantidade" />
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton}>Salvar</button>
                  <button type="button" onClick={closeModal} className={styles.cancelButton}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
