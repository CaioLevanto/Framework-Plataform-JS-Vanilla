import * as Utils from '../../../Utils.js';

export function _findAll() {
    return [ 
        {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
        {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
        {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] }
    ];
}

export function _findById(id) {
    return true;
}

export function _delete(id) {
    return true;
}

export function _update(obj) {
    return true;
}