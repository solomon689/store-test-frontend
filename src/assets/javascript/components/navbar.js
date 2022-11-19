import { addState } from "../helpers/manage-history-state.js";

const template = document.createElement('template');

template.innerHTML = ` 
    <nav class="navbar bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html" id="nav-brand"></a>
          <form class="d-flex m-auto w-50" role="search" id="search-form">
            <input class="form-control me-2" type="search" placeholder="Buscar productos" aria-label="Search" id="search-bar">
            <button class="btn btn-outline-primary" type="submit" id="search-button">Buscar</button>
          </form>
        </div>
    </nav>
`;

class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = template.innerHTML;
        document.querySelector('#nav-brand').innerText = this.getAttribute('custom-title');

        document.querySelector('#search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const search = document.querySelector('#search-bar');
            const redirectUrl = new URL(window.location.origin + window.location.pathname);

            redirectUrl.searchParams.set('q', search.value);
            redirectUrl.searchParams.set('page', 1);

            addState(redirectUrl);
        });
    }
}

window.customElements.define('app-navbar', Navbar);