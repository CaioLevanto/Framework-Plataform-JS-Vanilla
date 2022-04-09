import { doAjax } from '../../../Utils.js';
const pathName = 'usuario';

export function getHeaderClass() {
    let header = doAjax({
        pathname: pathName,
        async: false,
        type: 'GET',
        url: 'getHeader'
    });

    if (header)
        return JSON.parse(header);
    
    return null;
}

export function findAll() {
    return doAjax({
        pathname: pathName,
        async: false,
        type: 'GET',
        url: 'findAll'
    });
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
    return doAjax({
        pathname: pathName,
        async: false,
        type: 'GET',
        url: 'delete/' + id
    });
}

export function isUpdate(obj) {
    return doAjax({
        pathname: pathName,
        async: false,
        type: 'POST',
        url: 'update',
        data: obj
    });
}

export function isInsert(obj) {
    if (hasItem()) {
        return doAjax({
            pathname: pathName,
            async: false,
            data: obj,
            type: 'POST',
            url: 'update'
        });
    } else {
        return doAjax({
            pathname: pathName,
            async: false,
            data: obj,
            type: 'POST',
            url: 'insert'
        });
    }
}

export function isEdit(id) {
    return doAjax({
        pathname: pathName,
        async: false,
        type: 'GET',
        url: 'edit/' + id
    });
}

function hasItem() {
    let attrId = document.forms['form'].getAttribute('data-id');

    if (attrId != '') {
        return doAjax({
            pathname: pathName,
            async: false,
            type: 'GET',
            url: 'hasItem/' + attrId
        });
    } else {
        return false;
    }
}