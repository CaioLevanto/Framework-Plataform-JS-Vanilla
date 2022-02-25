import Grid from '../../components/customGridResponsive.js';
import * as Field from '../../components/customFields.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vl = [ 
    {"values": [0, "Coxinha", "1", "R$ 2,50" ],"action": ["Deletar"] }, 
    {"values": [1, "Pastel", "1", "R$ 4,50" ], "action": ["Deletar"] }, 
    {"values": [2, "Cuca", "1", "R$ 10,00" ], "action": ["Deletar"] },
    {"values": [3, "Pao", "1", "R$ 4,50" ],"action": ["Deletar"] }, 
    {"values": [4, "Bolo de Fuba", "1", "R$ 7,50" ], "action": ["Deletar"] }
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

};