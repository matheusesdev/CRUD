// app.js

// import { ProductCrud } from './productCrud.js';
import { ProductCrud } from './productCrud.js';
const productCrud = new ProductCrud();
const NUMBER_WHATSAPP = '5577988888888';

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQtd = parseInt(document.getElementById('productQtd').value);

    // Verifica se o nome do produto e o preço são válidos
    if (productName && !isNaN(productPrice) && productQtd) {
        const newProduct = {
            id: generateProductId(),
            name: productName,
            price: productPrice,
            qtdEstoque: productQtd,
        };

        // Adiciona o novo produto à lista
        productCrud.addProduct(newProduct);

        // Atualiza a tabela
        updateTable();

        // Limpa o formulário
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQtd').value = '';
    } else {
        alert('Por favor, insira um nome de produto válido e um preço numérico.');
    }
}

// Função para gerar um ID único para o produto
function generateProductId() {
    return productCrud.generateProductId();
}

// Função para atualizar a tabela com os produtos
function updateTable() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    // Obtém todos os produtos
    const products = productCrud.getAllProducts();

    // Preenche a tabela com os produtos
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${formatter.format(product.price)}</td>
        <td>${product.qtdEstoque}</td>
        <td id="actions">
          <button type="button" class="openModalBtn" data-product-id="${product.id}" >Editar</button>
          <button type="button" class="deleteBtn" data-product-id="${product.id}">Excluir</button>
        </td>
      `;
        tableBody.appendChild(row);
    });
}

// Função para editar um produto
function editProduct(productId, product) {
    if (product.updateName && !isNaN(product.updatePrice) && product.updateQtdEstoque) {
        productCrud.updateProduct(productId, {
            name: product.updateName,
            price: product.updatePrice,
            qtdEstoque: product.updateQtdEstoque
        });
        updateTable();
    } else {
        alert('Por favor, insira um nome de produto válido e um preço numérico.');
    }
}

// Função para excluir um produto
function deleteProduct(productId) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este produto?');

    if (confirmDelete) {
        productCrud.deleteProduct(productId);
        updateTable();
    }
}

// Inicializa a tabela com os produtos existentes
updateTable();

const btnForm = document.getElementById('productForm');
btnForm.addEventListener('submit', function (event) {
    // Previne o envio padrão do formulário
    event.preventDefault();
    // Chama a função addProduct diretamente do escopo do módulo
    addProduct();
});

const actions = document.getElementById('productTable')
const updateProductBtn = document.getElementById("updateProductBtn");

let productId;  // Variável para armazenar o ID do produto

// Evento para acionar métodos de deletar e atualizar registro
actions.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('deleteBtn') || target.classList.contains('openModalBtn')) {
        productId = target.dataset.productId;

        if (target.classList.contains('deleteBtn')) {
            deleteProduct(productId);
        } else if (target.classList.contains('openModalBtn')) {
            insertModalFields()
            const modal = document.querySelector('.modal');
            modal.style.display = "block";
        }
    }

    updateProductBtn.addEventListener('click', function () {
        const productNameInput = document.getElementById("updateProductName");
        const productPriceInput = document.getElementById("updateProductPrice");
        const productQtdInput = document.getElementById("updateProductQtd");

        editProduct(productId, {
            updateName: productNameInput.value,
            updatePrice: productPriceInput.value,
            updateQtdEstoque: productQtdInput.value
        });
        updateModal.style.display = "none";
    });
});

// Função para preencher os campos do modal
function insertModalFields() {
    const product = productCrud.getProductById(productId);
    document.getElementById("updateProductName").value = product.name;
    document.getElementById("updateProductPrice").value = product.price;
    document.getElementById("updateProductQtd").value = product.qtdEstoque;
}

// Função para fechar modal
const modal = document.querySelector('.modal');
modal.addEventListener('click', function (event) {
    if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = "none";
    }
});