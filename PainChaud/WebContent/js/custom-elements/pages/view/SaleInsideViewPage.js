import InterfacePages from '../../interface/InterfacePages.js';
import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';
import * as Utils from '../../Utils.js';
import { findAllInside } from './functions/saleFunction.js';

export default class SaleInsideViewPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Produto': [ "Pao", "Coxinha", "Risoles", "Bolo" ],
        'Quantidade': 'Number,Add',
        'Valor': 'string',
        'Ação': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: SaleInsideViewPage.fields,
            hiddenField: ['Produto', 'Quantidade', 'Valor']
        }); 
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleInsideViewPage.fields,
            value: findAllInside(0),
            hasSearch: false,
            hasHeader: true,
            findDB: true
        });
    }

    isDelete(id) {
        return true;
    }

    isUpdate(obj) {
        return true;
    }

    findById(id) {
        return true;
    }

    findSearch(value, column) {
        return true;
    }

};