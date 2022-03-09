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
        'Funcao': [ 'Selecione', 'Caixa', 'Balcao' ],
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
            value: Function._findAll(),
            hasSearch: true,
            hasHeader: true,
            notHeader: ['Senha']
        });
    }

    _onSubmit(obj) {
        return true;
    }

    _isDelete(id) {
        return true;
    }

    _isUpdate(obj) {
        return true;
    }

    _findById(id) {
        return true;
    }

};