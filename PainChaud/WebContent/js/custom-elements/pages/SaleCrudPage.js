import Grid from '../customGridResponsive.js';
import * as Field from '../customFields.js';
import InterfacePages from './InterfacePages.js';
import * as Utils from '../Utils.js';

var vlCrud = [ 
    {"values": [0, "Coxinha", "1", "R$ 2,50" ],"action": ["Deletar"] }, 
    {"values": [1, "Pastel", "1", "R$ 4,50" ], "action": ["Deletar"] }, 
    {"values": [2, "Cuca", "1", "R$ 10,00" ], "action": ["Deletar"] },
    {"values": [3, "Pao", "1", "R$ 4,50" ],"action": ["Deletar"] }, 
    {"values": [4, "Bolo de Fuba", "1", "R$ 7,50" ], "action": ["Deletar"] }
];

export default class SaleCrudPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Produto': [ "Balcao", "Embalado" ],
        'Quantidade': 'Number',
        'Comanda': 'Number',

        'Data da venda': 'string',
        'Valor': 'string',

        'AÃ§Ã£o': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: SaleCrudPage.fields, 
            hiddenField: ['Data da venda', 'Valor'] //Colunas que não deve aparecer nos fields, somente visualizar na grid
        }); 
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleCrudPage.fields,
            value: vlCrud,
            hasSearch: true,
            hasHeader: true,
            fieldEdit: ["Quantidade"],
            notHeader: ['Data da venda', 'Comanda'] //Colunas que não deve aparecer (manipula somente backend)
        });
    }

};