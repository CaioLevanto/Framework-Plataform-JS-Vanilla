import * as Utils from '../../../Utils.js';

export function _findAll() {
    return [
        {
            "values": { 
                'id': 0, 
                'Name': "Debora", 
                'Email': "debooraa7x@gmail.com", 
                'Funcao': 'Caixa'
            },
            "action": [
                "Editar", 
                "Deletar"
            ] 
        },
        {   "values": { 
                'id': 1, 
                'Name': "Erick", 
                'Email': "erick.ruan@gmail.com", 
                'Funcao': 'Balcao',
                'Senha': '0' 
            },
            "action": [
                "Editar", 
                "Deletar"
            ] 
        }
    ];
}

export function _removeUser(id) {
    return false;
}

export function _updateUser(obj) {
    return true;
}

export function _findById(id) {
    return true;
}