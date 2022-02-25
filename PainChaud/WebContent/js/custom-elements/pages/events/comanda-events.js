export function createNewComanda() {
    $('custom-container-view').hide();
    
    const main = document.querySelector('main');
    main.appendChild(document.createElement('custom-inside-crud'));
}