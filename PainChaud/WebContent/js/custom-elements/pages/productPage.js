import * as Grid from '../customGridResponsive.js';
import * as Utils from '../Utils.js';

export function getHeader() {
    let p = document.createElement('custom-input');
    p.setAttribute('type', 'search');
    p.textContent = "teste de header";
    return p;
}

export function getGrid(field, value) {
    let p = document.createElement('p');
    p.textContent = "teste de grid";
    return p;
}