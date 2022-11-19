export class HttpRequest {
    #url;
    
    constructor() {
        this.#url = 'http://localhost:3000/api';
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