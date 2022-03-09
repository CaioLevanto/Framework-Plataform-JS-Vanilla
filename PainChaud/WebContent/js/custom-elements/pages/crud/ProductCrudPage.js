import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';


var vlCrud = [ 
    {
        "values": { 
            'id': 0, 
            'Descrição': "Coxinha", 
            'Local': "Balcao",
            'Tipo': 'Unidade',
            'Valor': 'R$ 2,50' 
        },
        "action": [
            "Editar", 
            "Deletar"
        ]
    },
    {
        "values": { 
            'id': 1, 
            'Descrição': "Pao", 
            'Local': "Balcao",
            'Tipo': 'Peso',
            'Valor': 'R$ 4,50' 
        },
        "action": [
            "Editar", 
            "Deletar"
        ]
    }
];

export default class ProductCrudPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Descrição': 'string',
        'Local': [ 'Balcao', 'Embalado' ],
        'Tipo': [ 'Unidade', 'Peso' ],
        'Valor': 'money',
        'Ação': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: ProductCrudPage.fields
        });
    }

    getGrid() {
        return this.grid.createGridElement({
            col: ProductCrudPage.fields,
            value: vlCrud, 
            hasSearch: true, 
            hasHeader: true,

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