import * as Grid from '../customGridResponsive.js';
import * as Field from '../customFields.js';
import * as Utils from '../Utils.js';

var vl = [ 
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": ""}, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": "edit, delete" }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": "edit, delete" } 
];


var fields = {
    'Name': 'string',
    'Email': 'email',
    'Fun\u00e7\u00e3o': [ 'Selecione', 'Caixa', 'Balc\u00e3o' ],
    'Senha': 'password',
    'Confirmar Senha': 'password'
}

export function getFields() {
    return Field.createElementsFields(fields, false);
}

export function getGrid(columns, values) {
    return Grid.createGridElement(fields, vl);
}