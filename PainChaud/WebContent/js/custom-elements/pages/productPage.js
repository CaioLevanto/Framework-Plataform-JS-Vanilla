import Grid from '../customGridResponsive.js';
import InterfacePages from './InterfacePages.js';
import * as Utils from '../Utils.js';

export default class ProductPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    getHeader() {
        let p = document.createElement('custom-input');
        p.setAttribute('type', 'search');
        p.textContent = "teste de header";
        return p;
    }

    getGrid() {
        return this.grid.createGridElement([], [], false);
    }

};