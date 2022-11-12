export const showErrorAlert = (message) => {
    return `
        <div class="alert alert-danger text-center" role="alert">
            <p>
                ${ message }
                <br>
                <a href="index.html" class="alert-link">volver al inicio</a>
            </p>
        </div>
    `;
}

export const showInfoAlert = (message) => {
    return `
        <div class="alert alert-primary text-center" role="alert">
            <p>
                ${ message }
                <br>
                <a href="index.html" class="alert-link">volver al inicio</a>
            </p>
        </div>
    `;
}