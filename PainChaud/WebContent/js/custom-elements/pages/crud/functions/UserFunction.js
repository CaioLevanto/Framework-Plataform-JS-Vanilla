import * as Utils from '../../../Utils.js';

export function _findAllUsers() {
    return [ 
        {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
        {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
        {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] }
    ];
}

export function _removeUser(id) {
    return true;
}

export function _updateUser(obj) {
    return true;
}

export function _findById(id) {
    return true;
}