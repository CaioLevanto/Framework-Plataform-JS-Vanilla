import Grid from '../customGridResponsive.js';
import * as Field from '../customFields.js';
import InterfacePages from './InterfacePages.js';
import * as Utils from '../Utils.js';

var vlCrud = [ 
    {"values": [0, "Coxinha", "Balcao", "Unidade", "R$ 2,50" ],"action": ["Editar", "Deletar"] }, 
    {"values": [1, "Pastel", "Balcao", "Unidade", "R$ 4,50" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Cuca", "Embalado", "Unidade", "R$ 10,00" ], "action": ["Editar", "Deletar"] },
    {"values": [3, "Pao", "Balcao", "Peso", "R$ 4,50" ],"action": ["Editar", "Deletar"] }, 
    {"values": [4, "Bolo de Fuba", "Embalado", "Unidade", "R$ 7,50" ], "action": ["Editar", "Deletar"] }
];

export default class ProductCrudPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Nome': 'string',
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
            hasHeader: true
        });
    }

};