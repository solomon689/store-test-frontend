const template = document.createElement('template');

template.innerHTML = ` 
    <nav class="navbar bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html" id="nav-brand"></a>
          <form class="d-flex m-auto w-50" role="search">
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

        document.querySelector('#search-button').addEventListener('click', (e) => {
            e.preventDefault();
            const search = document.querySelector('#search-bar');

            window.location.href = `search.html?q=${ search.value }&page=1`;
        });
    }
}

window.customElements.define('app-navbar', Navbar);