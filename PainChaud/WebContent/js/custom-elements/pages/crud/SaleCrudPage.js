import { findAll, isEdit, getAction, isDelete, isInsert, isUpdate } from './functions/saleFunction.js';
import InterfacePages from '../../interface/InterfacePages.js'; 
import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';

export default class SaleCrudPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Produto': [ 
            [0, "Leite", "0", 4.60], 
            [1, "Cuca de Banana", "0", 8.50],
            [2, "Cuca de Chocolate", "0", 12.00]
        ],
        'Quantidade': 'Number,Add',
        'Comanda': 'Number,Add',
        
        'Tipo': 'string',
        'Data da venda': 'string',
        'Valor': 'string',

        'Action': 'Action'
    }

    getFields(hasReturn) {
        return Field.createElementsFields({
            col: SaleCrudPage.fields,
            hiddenField: ['Data da venda', 'Valor', 'Tipo'], //Colunas que não deve aparecer nos fields, somente visualizar na grid
            clearGrid: true,
            isReturn: (hasReturn ? hasReturn : false)
        }); 
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleCrudPage.fields,
            value: findAll(),
            hasSearch: true,
            hasHeader: true,
            fieldEdit: ["Quantidade"],
            notHeader: ['Data da venda', 'Comanda', 'Tipo'],  //Colunas que não deve aparecer (manipula somente backend)
            hasFooter: true,
            findDB: false
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

    isInsert(obj) {
        return isInsert(obj);
    }

    isEdit(id) {
        return isEdit(id);
    }

};