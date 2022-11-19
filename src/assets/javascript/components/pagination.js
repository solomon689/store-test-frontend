import { addState } from "../helpers/manage-history-state.js";

const actualUrl = new URL(window.location.href);
let page = parseInt(actualUrl.searchParams.get('page')) || 1;

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
            li.innerHTML =  `<li class="page-item"></li>`;
            a.innerHTML = `<a class="page-link">${ i + 1 }</a>`;

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
        const actualUrl = new URL(window.location.href);
        const redirectUrl = new URL(window.location.origin + window.location.pathname);
        const paramKeys = actualUrl.searchParams.keys();

        if (itemNumber === '«') {
            for (const key of paramKeys) {
                if (key === 'page') continue;

                if (actualUrl.searchParams.get(key)) {
                    redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
                }
            }
            
            page--;
            redirectUrl.searchParams.set('page', page);
            addActiveClass(page);
            addState(redirectUrl);

            return;
        }

        if (itemNumber === '»') {
            for (const key of paramKeys) {
                if (key === 'page') continue;

                if (actualUrl.searchParams.get(key)) {
                    redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
                }
            }

            page++;
            redirectUrl.searchParams.set('page', page);
            addActiveClass(page);
            addState(redirectUrl);
            
            return;
        }

        for (const key of paramKeys) {
            if (key === 'page') continue;

            if (actualUrl.searchParams.get(key)) {
                redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
            }
        }
        
        page = itemNumber;
        redirectUrl.searchParams.set('page', page);
        addActiveClass(page);
        addState(redirectUrl);
    }
}

window.customElements.define('app-pagination', PaginationComponent);