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

//Declaración de eventos

//Evento que estara a la escucha de los cambios en la url.
window.addEventListener('popstate', async (e) => {
    if (!e) return;

    const newUrl = new URL(e.target.location.href);
    const existSearchParam = newUrl.searchParams.has('q');

    removeCards();
    displaySpinner();

    try {
        if (existSearchParam) {
            removePagination();
            renderPage(newUrl);

            return;
        }
    
        renderPage(newUrl);
    } catch (error) {
        console.error('ERROR =>', error);
        removeSpinner();
        containerBody.innerHTML = showErrorAlert('Ha ocurrido un error al momento de cargar los productos :(');
    }
});

// Declaración de funciones
const renderPage = async (actualUrl) => {
    const existQueryParam = actualUrl.searchParams.has('q');
    const search = actualUrl.searchParams.get('q');
    const page = actualUrl.searchParams.get('page') || 1;

    const response = (!existQueryParam) ? await getProducts(page) : await searchProducts(search, page);
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
}

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

const removeCards = () => {
    let child = cardRow.lastElementChild;

    while(child) {
        if (child) {
            cardRow.removeChild(child);
            child = cardRow.lastElementChild;
        }
    }
}

const getProducts = async (page = 1) => {
    return httpRequest.get(`/product?page=${ page }`);
}

const searchProducts = async (search, page = 1) => {
    return httpRequest.get(`/product/search?q=${ search }&page=${ page }`);
}

const displaySpinner = () => spinner.classList.remove('visually-hidden');
const removeSpinner = () => spinner.classList.add('visually-hidden');

const displayPagination = (totalItems) => {
    const pagination = document.createElement('app-pagination');

    pagination.setAttribute('totalItems', totalItems);
    cardCol.appendChild(pagination);
};

const removePagination = () => {
    const pagination = document.querySelector('app-pagination');

    if (pagination) pagination.remove();
}

( async () => {
    const actualUrl = new URL(window.location.href);

    try {
        renderPage(actualUrl);
    } catch (error) {
        console.error(error);
        removeSpinner();
        containerBody.innerHTML = showErrorAlert('Ha ocurrido un error al momento de cargar los productos :(');
    }
})();