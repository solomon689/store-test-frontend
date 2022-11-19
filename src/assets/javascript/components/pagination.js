import { addState } from "../helpers/manage-history-state.js";

const addActiveClass = (page) => {
    const paginationList = document.querySelector('#pagination-list');

    paginationList.querySelector('.active')?.classList.remove('active');

    paginationList.querySelectorAll('.page-link')?.forEach(element => {
        if (element.innerText == page) {
            element.classList.add('active');

            return;
        }
    });
}

const createRedirectUrl = () => {
    const actualUrl = new URL(window.location.href);
    const paramKeys = actualUrl.searchParams.keys();
    const redirectUrl = new URL(window.location.origin + window.location.pathname);

    for (const key of paramKeys) {
        if (key === 'page') continue;

        if (actualUrl.searchParams.get(key)) {
            redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
        }
    }
    
    return redirectUrl;
}

class PaginationComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setEventListener();
    }

    render() {
        this.innerHTML = `
            <nav class="hidden" id="pagination-nav">
                <ul class="pagination justify-content-end" id="pagination-list">
                </ul>
            </nav>
        `;
        const total = this.getAttribute('totalItems');
        const totalPages = Math.ceil(total / 9);
        const page = parseInt(new URL(window.location.href).searchParams.get('page')) || 1;

        let previousLi = document.createElement('li');
        let previousA = document.createElement('a');
        let nextLi = document.createElement('li');
        let nextA = document.createElement('a');

        previousLi.innerHTML = `<li class="page-item"></li>`;
        previousA.innerHTML = `
            <a class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;

        previousLi.appendChild(previousA);
        document.querySelector('.pagination').appendChild(previousLi);

        for (let i = 0 ; i < totalPages ; i++) {
            let li = document.createElement('li');
            let a = document.createElement('a');

            li.classList.add('page-item');
            a.classList.add('page-link');
            a.innerText = i + 1;

            // Si la página actual coincide con el query param page se le asigna la clase active.
            if (page === (i + 1)) a.classList.add('active');

            li.appendChild(a);
            document.querySelector('.pagination').appendChild(li);
        }

        nextLi.innerHTML = `<li class="page-item"></li>`;
        nextA.innerHTML = `
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        nextLi.appendChild(nextA);
        document.querySelector('.pagination').appendChild(nextLi);
    }

    setEventListener() {
        const paginationItems = document.querySelectorAll('.page-link');
    
        if (paginationItems) {
            for (const item of paginationItems) {
                item.addEventListener('click', (e) => {
                    const itemNumber = e.target.innerText;

                    this.changePage(itemNumber);
                });
            }
        }
    }

    changePage(itemNumber) {
        let redirectUrl; // Será inicializado como tipo URL.
        let page = parseInt(new URL(window.location.href).searchParams.get('page')) || 1;
        const total = this.getAttribute('totalItems');
        const totalPages = Math.ceil(total / 9);

        if (itemNumber === '«') {
            if (page > 1) page--;
            
            redirectUrl = createRedirectUrl();
            redirectUrl.searchParams.set('page', page);
            addActiveClass(page);
            addState(redirectUrl);

            return;
        }

        if (itemNumber === '»') {
            if (page < totalPages) page++;

            redirectUrl = createRedirectUrl();
            redirectUrl.searchParams.set('page', page);
            addActiveClass(page);
            addState(redirectUrl);
            
            return;
        }
        
        page = itemNumber;
        redirectUrl = createRedirectUrl();
        redirectUrl.searchParams.set('page', page);
        addActiveClass(page);
        addState(redirectUrl);

    }
}

window.customElements.define('app-pagination', PaginationComponent);