import Factory from '../../../interface/PageFactory.js';
import { doAjax } from '../../../Utils.js';
const pathName = 'product';

export function getHeaderView(fields) {
    let headerSearch = document.createElement('div');
    headerSearch.id = 'header-container-search';

    let byCol = document.createElement('select');
    byCol.className = 'custom-select';

    for (let row in fields) {
        if (fields[row] == 'password' || row == 'Action') {
            continue
        }

        let option = document.createElement('option');
        option.value = row;
        option.text = row;
        byCol.appendChild(option);
    }
    headerSearch.appendChild(byCol);

    let p = document.createElement('custom-input');
    p.setAttribute('type', 'search');
    headerSearch.appendChild(p);

    return headerSearch;
}

export function findAll(id) {
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
        url: 'actionView'
    });
}

export function isDelete(id) {
    return true;
}

export function isUpdate(obj) {
    return true;
}

export function isEdit(id) {
    return true;
}

export function findSearch(value, column) {
    return true;
}