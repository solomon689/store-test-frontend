import { ProductCardComponent } from "./components/product-card.js";
import { showErrorAlert, showInfoAlert } from "./helpers/alerts.js";
import { HttpRequest } from "./http-request.js";

// Declaración de variables
let products = [];
const httpRequest = new HttpRequest();

// Referencia a elementos
const cardRow = document.querySelector('#card-row');
const spinner = document.querySelector('.spinner-border');
const cardCol = document.querySelector('#cards-col');
const containerBody = document.querySelector('#container-body');

// Declaración de funciones
const renderCards = (products) => {
    for (let i = 0 ;  i < products.length ; i++) {
        const card = new ProductCardComponent(
            products[i].url_image, 
            products[i].name, 
            `$ ${ products[i].price }`
        );
        
        cardRow.innerHTML += card.render();
    }
}

const getProductsByCategory = async (page = 1, category) => {
    return httpRequest.get(`/product/${ category }?page=${ page }`);
}

const displaySpinner = () => spinner.classList.remove('visually-hidden');
const removeSpinner = () => spinner.classList.add('visually-hidden');

const displayPagination = (totalItems) => {
    const pagination = document.createElement('app-pagination');

    pagination.setAttribute('totalItems', totalItems);
    pagination.setAttribute('guard-param', 'category');
    cardCol.appendChild(pagination);
};

( async () => {
    const actualUrl = new URL(window.location.href);
    const category = actualUrl.searchParams.get('category');
    const page = actualUrl.searchParams.get('page') || 1;

    try {
        const response = await getProductsByCategory(page, category);
        const data = await response.json();

        products = data.data;
        removeSpinner();
        displayPagination(data.totalItems);
        
        if (products && products.length > 0) {
            renderCards(products);
        }

        if (!products || products.length === 0) {
            containerBody.innerHTML = showInfoAlert('No se han encontrado productos para mostrar');
        }
    } catch (error) {
        console.error(error);
        removeSpinner();
        containerBody.innerHTML = showErrorAlert('Ha ocurrido un error al momento de cargar los productos :(');
    }
})();