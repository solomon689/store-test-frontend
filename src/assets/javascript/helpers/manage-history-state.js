export const addState = (url) => {
    window.history.pushState(
        window.history.state,
        document.title,
        url
    );

    window.dispatchEvent(new Event('popstate'));
}