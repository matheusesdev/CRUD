import React, { useState } from 'react';
import styles from './Products.module.css';
import { Sidebar } from '../../components/Sidebar';
import { FaPlus } from "react-icons/fa";
import axios from 'axios'; 
import { FaPencilAlt, FaTrash } from "react-icons/fa";


const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState<number | string>('');
  const [quantidade, setQuantidade] = useState<number | string>('');
  const [produtos, setProdutos] = useState([]); // Armazena a lista de produtos
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Produto selecionado para edição ou exclusão

  // Função para abrir o modal de criação
  const openModal = () => {
    setIsModalOpen(true);
    clearForm();
  };

  // Função para abrir o modal de edição
  const openEditModal = (produto: any) => {
    setSelectedProduct(produto);
    setNome(produto.name);
    setPreco(produto.price);
    setQuantidade(produto.quantity);
    setIsEditModalOpen(true);
  };

  // Função para abrir o modal de exclusão
  const openDeleteModal = (produto: any) => {
    setSelectedProduct(produto);
    setIsDeleteModalOpen(true);
  };

  // Função para fechar o modal de criação
  const closeModal = () => {
    setIsModalOpen(false);
    clearForm();
  };

  // Função para fechar o modal de edição
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    clearForm();
  };

  // Função para fechar o modal de exclusão
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Função para limpar o formulário após o fechamento
  const clearForm = () => {
    setNome('');
    setPreco('');
    setQuantidade('');
  };

  // Função para fechar o modal ao clicar fora dele
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeEditModal();
      closeDeleteModal();
    }
  };

  // Função para buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products/getproducts');
      setProdutos(response.data); // Atualizar a lista de produtos
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para enviar os dados ao backend (criação de produto)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Converta os valores de `preco` e `quantidade` para inteiros
      const precoInt = parseInt(preco as string, 10);
      const quantidadeInt = parseInt(quantidade as string, 10);

      const response = await axios.post('http://localhost:3000/api/products/create', {
        name: nome,
        price: precoInt,
        quantity: quantidadeInt,
      });

      if (response.status === 201) {
        fetchProdutos(); // Atualizar a lista de produtos após o cadastro
        closeModal();
      }
    } catch (err) {
      console.error('Erro ao cadastrar o produto:', err);
    }
  };

  // Função para enviar os dados atualizados ao backend (edição de produto)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const precoInt = parseInt(preco as string, 10);
      const quantidadeInt = parseInt(quantidade as string, 10);

      const response = await axios.put(`http://localhost:3000/api/products/editproduct/${selectedProduct.id}`, {
        name: nome,
        price: precoInt,
        quantity: quantidadeInt,
      });

      if (response.status === 200) {
        fetchProdutos(); // Atualizar a lista de produtos após a edição
        closeEditModal();
      }
    } catch (err) {
      console.error('Erro ao atualizar o produto:', err);
    }
  };

  // Função para deletar um produto
  const deleteProduct = async () => {
    try {
      await axios.post(`http://localhost:3000/api/products/deleteproduct/${selectedProduct.id}`);
      fetchProdutos(); // Atualizar a lista de produtos após exclusão
      closeDeleteModal();
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };

  // Carregar produtos ao montar o componente
  React.useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.portal}>
        <div className={styles.topo}>
          <h1 className={styles.title}>Meus Produtos</h1>
          <button className={styles.cadastrobutton} onClick={openModal}>
            <FaPlus /> Cadastrar Produto
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
            {produtos.map((produto: any) => (
              <tr key={produto.id}>
                <td>{produto.codigo}</td>
                <td>{produto.name}</td>
                <td>{produto.price}</td>
                <td>{produto.quantity}</td>
                <td className={styles.actions}>
                  <button className={styles.editbutton} onClick={() => openEditModal(produto)}><FaPencilAlt/></button>
                  <div className={styles.dividerbuttons}></div>
                  <button className={styles.deletebutton} onClick={() => openDeleteModal(produto)}><FaTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal de Cadastro */}
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
              <h2>Cadastrar Produto</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome do Produto:</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="preco">Preço do Produto:</label>
                  <input
                    type="number"
                    id="preco"
                    name="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="quantidade">Quantidade:</label>
                  <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton}>
                    Salvar
                  </button>
                  <button type="button" onClick={closeModal} className={styles.cancelButton}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Edição */}
        {isEditModalOpen && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
              <h2>Editar Produto</h2>
              <form onSubmit={handleEditSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome do Produto:</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="preco">Preço do Produto:</label>
                  <input
                    type="number"
                    id="preco"
                    name="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="quantidade">Quantidade:</label>
                  <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton}>
                    Salvar
                  </button>
                  <button type="button" onClick={closeEditModal} className={styles.cancelButton}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Exclusão */}
        {isDeleteModalOpen && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
              <h2>Confirmar Exclusão</h2>
              <p>Você tem certeza que deseja excluir o produto {selectedProduct?.name}?</p>
              <div className={styles.formActions}>
                <button onClick={deleteProduct} className={styles.saveButton}>
                  Confirmar
                </button>
                <button onClick={closeDeleteModal} className={styles.cancelButton}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
