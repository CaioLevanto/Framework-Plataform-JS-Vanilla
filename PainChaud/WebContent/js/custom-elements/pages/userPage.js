import Grid from '../customGridResponsive.js';
import * as Field from '../customFields.js';
import InterfacePages from './InterfacePages.js';
import * as Utils from '../Utils.js';

var vl = [ 
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] },
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] }
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
        'Confirmar Senha': 'password',
        'Ação': 'Action'
    }

    getFields() {
        return Field.createElementsFields(UserPage.fields, false);
    }

    getGrid() {
        return this.grid.createGridElement(UserPage.fields, vl, true);
    }

};