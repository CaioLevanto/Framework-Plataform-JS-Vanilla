import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Function from './functions/UserFunction.js';

export default class UserCrudPage extends InterfacePages {
    
    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Name': 'custom',
        'Email': 'custom',
        'Fun\u00e7\u00e3o': [ 'Selecione', 'Caixa', 'Balc\u00e3o' ],
        'Senha': 'custom',
        'Ação': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: UserCrudPage.fields,
            hiddenField: []
        });
    }

    getGrid() {
        return this.grid.createGridElement({
            col: UserCrudPage.fields, 
            value: Function._findAllUsers(),
            hasSearch: true,
            hasHeader: true,
            notHeader: ['Senha']
        });
    }

    _isDelete(id) {
        return Function._removeUser(id);
    }

    _isUpdate(obj) {
        return Function._updateUser(obj);
    }

};