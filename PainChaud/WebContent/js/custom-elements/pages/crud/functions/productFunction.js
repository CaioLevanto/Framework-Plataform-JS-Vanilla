import { doAjax } from '../../../Utils.js';
const pathName = 'product';

export function findAll(id) {
    return [ 
        {
            "values": { 
                'id': 0, 
                'Descricao': "Coxinha", 
                'Local': "Balcao",
                'Tipo': 'Unidade',
                'Valor': 'R$ 2,50' 
            },
            "action": [
                "Editar", 
                "Deletar"
            ]
        },
        {
            "values": { 
                'id': 1, 
                'Descricao': "Pao", 
                'Local': "Balcao",
                'Tipo': 'Peso',
                'Valor': 'R$ 4,50' 
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