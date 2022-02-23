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

var vlView = [ 
    {"values": [0, "Coxinha", "1", "R$ 2,50" ],"action": ["Visualizar"] }, 
    {"values": [1, "Pastel", "1", "R$ 4,50" ], "action": ["Visualizar"] }, 
    {"values": [2, "Cuca", "1", "R$ 10,00" ], "action": ["Visualizar"] },
    {"values": [3, "Pao", "1", "R$ 4,50" ],"action": ["Visualizar"] }, 
    {"values": [4, "Bolo de Fuba", "1", "R$ 7,50" ], "action": ["Visualizar"] }
];

export default class SalePage extends InterfacePages {

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
            col: SalePage.fields, 
            hiddenField: ['Data da venda', 'Valor'] //Colunas que não deve aparecer nos fields, somente visualizar na grid
        }); 
    }

    getHeader() {
        const d = new Date();

        let betweenDate = document.createElement('div');
        betweenDate.id = 'header-container-dates';

        let initial = document.createElement('custom-input');
        initial.setAttribute('type', 'date');
        initial.title = 'Data inicial:';
        initial.id = 'date-initial';
        initial.setAttribute('min', '2022-01-10');
        initial.setAttribute('max', d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate());
        betweenDate.appendChild(initial);

        let end = document.createElement('custom-input');
        end.setAttribute('type', 'date');
        end.title = 'Data Final:';
        end.id = 'date-final';
        end.setAttribute('min', '2022-01-10');
        end.setAttribute('max', d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate());
        betweenDate.appendChild(end);

        return betweenDate;
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SalePage.fields,
            value: (hasSearch == 'crud') ? vlCrud : vlView,
            hasSearch: (hasSearch == 'crud'),
            hasHeader: true,
            fieldEdit: ["Quantidade"],
            notHeader: ['Data da venda', 'Comanda'] //Colunas que não deve aparecer (manipula somente backend)
        });
    }

};