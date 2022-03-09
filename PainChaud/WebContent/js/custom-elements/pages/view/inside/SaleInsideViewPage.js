import InterfacePages from '../../../interface/InterfacePages.js';
import Grid from '../../../components/customGridResponsive.js';
import * as Field from '../../../components/customFields.js';
import * as Utils from '../../../Utils.js';

var vl = [ 
    {
        "values": { 
            'id': 0, 
            'Produto': "Coxinha", 
            'Quantidade': "1",
            'Valor': 'R$ 2,50' 
        },
        "action": [
            "Deletar"
        ]
    },
    {
        "values": { 
            'id': 1, 
            'Produto': "Pao", 
            'Quantidade': "1",
            'Valor': 'R$ 2,50' 
        },
        "action": [
            "Deletar"
        ]
    }
];



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
            value: vl,
            hasSearch: false,
            hasHeader: true
        });
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