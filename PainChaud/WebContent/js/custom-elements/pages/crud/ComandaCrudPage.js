import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vl = [ 
    {
        "values": { 
            'id': 0, 
            'Produto': "Coxinha", 
            'Quantidade': "1", 
            'Tipo': '0',
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
            'Tipo': '1',
            'Valor': 'R$ 4,50' 
        },
        "action": [
            "Deletar"
        ]
    }
];

export default class ComandaCrudPage extends InterfacePages {
    
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

    getFields(isReturn) {
        return Field.createElementsFields({
            col: ComandaCrudPage.fields,
            hiddenField: ["Valor"],
            isReturn: isReturn
        });
    }

    getGrid() {
        return this.grid.createGridElement({
           col: ComandaCrudPage.fields, 
           value: vl, 
           hasSearch: true, 
           hasHeader: true,
           fieldEdit: ["Quantidade"]
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