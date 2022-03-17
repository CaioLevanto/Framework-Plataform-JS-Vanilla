import { getHeaderView, findAll, isDelete, isUpdate, findById, findSearch } from './functions/comandaFunction.js';
import InterfacePages from '../../interface/InterfacePages.js';
import Grid from '../../components/customGridResponsive.js';

export default class ComandaViewPage extends InterfacePages {
    
    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Identificacao da comanda': 'string',
        'Ação': 'Action'
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

    isDelete(id) {
        return isDelete();
    }

    isUpdate(obj) {
        return isUpdate();
    }

    findById(id) {
        return findById();
    }
    
    findSearch(value, column) {
        return findSearch();
    }

};