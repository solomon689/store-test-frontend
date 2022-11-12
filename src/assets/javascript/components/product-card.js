export class ProductCardComponent {
    constructor(
        urlImage,
        cardTitle,
        cardText,
    ) {
        this.urlImage = urlImage;
        this.cardTitle = cardTitle;
        this.cardText = cardText;
    }

    render() {
        return `
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card shadow-sm" style="width: 18rem;">
                    <img src="${ this.urlImage || 'https://www.picturetopeople.org/images/photo_editor/not_loaded_sample.gif' }" class="card-img-top" alt="Imagen del producto">
                    <div class="card-body">
                        <h5 class="card-title">${ this.cardTitle }</h5>
                        <p class="card-text fw-semibold fs-6">Valor: ${ this.cardText }</p>
                    </div>
                </div>
            </div>
        `;
    }
}