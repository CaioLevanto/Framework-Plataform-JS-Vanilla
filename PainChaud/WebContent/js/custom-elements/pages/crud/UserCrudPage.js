import { findAll, isEdit, getAction, getHeaderClass, isDelete, isInsert, isUpdate } from './functions/userFunction.js';
import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';
import InterfacePages from '../../interface/InterfacePages.js';

export default class UserCrudPage extends InterfacePages {
    
    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = getHeaderClass();

    getFields() {
        return Field.createElementsFields({
            col: UserCrudPage.fields,
            hiddenField: []
        });
    }

    getGrid() {
        return this.grid.createGridElement({
            col: UserCrudPage.fields, 
            value: findAll(),
            hasSearch: true,
            hasHeader: true,
            notHeader: ['Senha'],
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