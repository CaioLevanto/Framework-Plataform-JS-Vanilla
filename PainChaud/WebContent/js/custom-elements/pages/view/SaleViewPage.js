import { findAll, findById, findSearch, getHeaderView, isDelete, isUpdate } from './functions/saleFunction.js';
import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

export default class SaleViewPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fieldView = {
        'Data da venda': 'string',
        'Valor total': 'Number',
        'Ação': 'Action'
    }

    static fieldsCrud = {
        'Produto': [ "Balcao", "Embalado" ],
        'Quantidade': 'Number',
        'Comanda': 'Number',

        'Data da venda': 'string',
        'Valor': 'string',

        'Ação': 'Action'
    }

    getHeader() {
        return getHeaderView();
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleViewPage.fieldView,
            value: findAll(0),
            hasSearch: false,
            hasHeader: true,
            notHeader: ['Comanda'], //Colunas que n�o deve aparecer (manipula somente backend)
            findDB: true 
        });
    }

    isDelete(id) {
        return isDelete(id);
    }

    isUpdate(obj) {
        return isUpdate(obj);
    }

    findById(id) {
        return findById(id);
    }

    findSearch(value, column) {
        return findSearch(value, column);
    }

};