import { getHeaderView, findAll, isDelete, isUpdate, isEdit, findSearch, getAction } from './functions/comandaFunction.js';
import InterfacePages from '../../interface/InterfacePages.js';
import Grid from '../../components/customGridResponsive.js';

export default class ComandaViewPage extends InterfacePages {
    
    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Identificacao da comanda': 'string',
        'Action': 'Action'
    }

    getHeader() {
        return getHeaderView();
    }

    getGrid() {
        return this.grid.createGridElement({
           col: ComandaViewPage.fields, 
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
        return isDelete();
    }

    isUpdate(obj) {
        return isUpdate();
    }

    isEdit(id) {
        return isEdit();
    }
    
    findSearch(value, column) {
        return findSearch();
    }

};