import { addState } from "../helpers/manage-history-state.js";

const actualUrl = new URL(window.location.href);
let page = parseInt(actualUrl.searchParams.get('page')) || 1;

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
                <ul class="pagination justify-content-end">
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

        // const guardParam = this.getAttribute('guard-param');
        // const guardParamValue = actualUrl.searchParams.get(guardParam);

        if (itemNumber === '«') {
            // if (guardParam && guardParamValue) {
            //     window.location.href = window.location.href.split('?')[0] 
            //         + `?${ guardParam }=${ guardParamValue }&page=${ page - 1 }`;
            //     return;
            // }

            for (const key of paramKeys) {
                if (key === 'page') continue;

                if (actualUrl.searchParams.get(key)) {
                    redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
                }
            }
            
            page--;
            redirectUrl.searchParams.set('page', page);
            addState(redirectUrl);

            // window.location.href = window.location.href.split('?')[0] 
            //     + `?page=${ page - 1 }`;
            return;
        }

        if (itemNumber === '»') {
            // if (guardParam && guardParamValue) {
            //     window.location.href = window.location.href.split('?')[0] 
            //         + `?${ guardParam }=${ guardParamValue }&page=${ page + 1 }`;
            //     return;
            // }

            for (const key of paramKeys) {
                if (key === 'page') continue;

                if (actualUrl.searchParams.get(key)) {
                    redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
                }
            }

            page++;
            redirectUrl.searchParams.set('page', page);
            addState(redirectUrl);
            
            return;
        }

        // if (guardParam && guardParamValue) {
        //     window.location.href = window.location.href.split('?')[0] 
        //         + `?${ guardParam }=${ guardParamValue }&page=${ itemNumber }`;
        //     return;
        // }

        for (const key of paramKeys) {
            if (key === 'page') continue;

            if (actualUrl.searchParams.get(key)) {
                redirectUrl.searchParams.set(key, actualUrl.searchParams.get(key));
            }
        }
        
        page = itemNumber;
        redirectUrl.searchParams.set('page', page);
        addState(redirectUrl);
    }
}

window.customElements.define('app-pagination', PaginationComponent);