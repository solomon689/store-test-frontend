import { HttpRequest } from "../http-request.js";

const httpRequest = new HttpRequest();
const actualUrl = new URL(window.location.href);

export class CategoryMenuComponent extends HTMLElement {
    #categories = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.render();
        this.addEvents();
    }

    async render() {
        const menuUl = document.createElement('ul');
        const h5 = document.createElement('h5');

        h5.classList.add('mb-3');
        h5.classList.add('text-center');
        h5.innerText = 'Filtrar por categoria';
        menuUl.classList.add('list-group');
        this.#categories = await this.#getCategories();

        if (this.#categories && this.#categories.length > 0) {
            for (const category of this.#categories) {
                let menuLi = document.createElement('li');
                const categoryParam = parseInt(actualUrl.searchParams.get('category'));

                if (categoryParam === category.id) menuLi.classList.add('active');

                menuLi.classList.add('list-group-item');
                menuLi.classList.add('pointer');
                menuLi.classList.add('list-group-item-action');
                menuLi.value = category.id;
                menuLi.innerText = category.name; 

                menuUl.appendChild(menuLi);
            }

            this.appendChild(h5);
            this.appendChild(menuUl);
        }
        
    }

    addEvents() {
        const menuItems = document.querySelectorAll('.list-group-item');
        
        if (menuItems) {
            for (const item of menuItems) {
                item.addEventListener('click', (e) => {
                    const selectedCategory = e.target.value;

                    window.location.href = `category.html?category=${ selectedCategory }&page=1`;
                });
            }
        }
    }

    async #getCategories() {
        return httpRequest.get('/category/')
            .then(response => response.json())
            .then(data => data.data)
            .catch(error => console.error(error));
    }
}

window.customElements.define('app-category-menu', CategoryMenuComponent);