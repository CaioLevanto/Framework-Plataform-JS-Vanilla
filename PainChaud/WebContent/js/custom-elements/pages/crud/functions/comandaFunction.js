import { doAjax } from '../../../Utils.js';
const pathName = 'comanda';

export function findAll(id) {
    return [];
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