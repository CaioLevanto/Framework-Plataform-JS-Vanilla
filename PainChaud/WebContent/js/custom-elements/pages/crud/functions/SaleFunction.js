import { doAjax } from '../../../Utils.js';
const pathName = 'sale';

export function findAll() {
    return [];
}

export function getAction() {
    return doAjax({
        pathname: pathName,
        async: false,
        type: 'GET',
        url: 'actionCrud'
    });
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