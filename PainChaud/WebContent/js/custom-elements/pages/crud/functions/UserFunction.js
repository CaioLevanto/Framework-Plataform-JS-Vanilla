import { doAjax } from '../../../Utils.js';
const pathName = 'user';

export function findAll() {
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

export function isDelete(id) {
    return true;
}

export function isUpdate(obj) {
    return true;
}

export function isInsert(obj) {
    return true;
}

export function findById(id) {
    return true;
}