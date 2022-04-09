import { findAll, isEdit, findSearch, getHeaderView, isDelete, isUpdate } from './functions/productFunction.js';
import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

export default class ProductViewPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Descricao': 'string',
        'Local': [ 'Balcao', 'Embalado' ],
        'Tipo': [ 'Unidade', 'Peso' ],
        'Valor': 'money'
    }

    getHeader() {
        return getHeaderView(ProductViewPage.fields);
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: ProductViewPage.fields,
            value: findAll(0), 
            hasSearch: false, 
            hasHeader: true,
            findDB: true
        });
    }
    
    getAction() {
        return getAction();
    }

    isDelete(id) {
        return isDelete(id);
    }

    isUpdate(obj) {
        return isUpdate(obj);
    }

    isEdit(id) {
        return isEdit(id);
    }

    findSearch(value, column) {
        return findSearch(value, column);
    }

};