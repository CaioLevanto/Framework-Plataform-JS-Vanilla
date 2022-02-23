import Grid from '../customGridResponsive.js';
import * as Field from '../customFields.js';
import InterfacePages from './InterfacePages.js';
import * as Utils from '../Utils.js';

var vl = [ 
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [3, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [4, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [5, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [6, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [7, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [8, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [9, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [10, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [11, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [12, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [13, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [14, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [15, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [16, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [17, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [18, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [19, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [20, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [21, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [22, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [23, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [24, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [25, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [26, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] }
];

export default class UserPage extends InterfacePages {
    
    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Name': 'string',
        'Email': 'email',
        'Fun\u00e7\u00e3o': [ 'Selecione', 'Caixa', 'Balc\u00e3o' ],
        'Senha': 'password',
        'Ação': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: UserPage.fields,
            hiddenField: []
        });
    }

    getGrid() {
        return this.grid.createGridElement({
            col: UserPage.fields, 
            value: vl,
            hasSearch: true,
            hasHeader: true
        });
    }

};