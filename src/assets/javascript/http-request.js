export class HttpRequest {
    #url;
    
    constructor() {
        this.#url = 'https://bsale-backend-test.onrender.com/api';
        this.headers = {
            'Content-Type': 'application/json',
        }
    }

    get(url, headers = this.headers) {
        return fetch(`${ this.#url }${ url }`, {
            method: 'GET',
            headers,
            keepalive: true,
        });
    }
}