import { doAjax } from '../../../Utils.js';
const pathName = 'product';

export function findAll(id) {
    return [ 
        {
            'id': 0, 
            'Descricao': "Coxinha", 
            'Local': "Balcao",
            'Tipo': 'Unidade',
            'Valor': 'R$ 2,50'
        },
        {
            'id': 1, 
            'Descricao': "Pao", 
            'Local': "Balcao",
            'Tipo': 'Peso',
            'Valor': 'R$ 4,50'   
        }
    ];
}

export function getAction() {
    return doAjax({
        pathname: pathName,
        async: false,
        type: 'GET',
        url: 'actionCrud'
    });;
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

export function isEdit(id) {
    return true;
}