import Factory from '../../../interface/PageFactory.js';
import { doAjax } from '../../../Utils.js';
const pathName = 'comanda';

export function getHeaderView() {
    let headerSearch = document.createElement('div');
    headerSearch.id = 'header-comanda-search';

    let btnNew = document.createElement('custom-button');
    btnNew.id = 'new-comanda';
    btnNew.title = "Nova comanda";
    btnNew.addEventListener('click', () => {
        $('custom-container-view').hide();
    
        document.querySelector('main').appendChild(document.createElement('custom-inside-crud'));
    });
    headerSearch.appendChild(btnNew);

    let inputSearch = document.createElement('custom-input');
    inputSearch.setAttribute('type', 'search');
    inputSearch.id = 'comanda';
    inputSearch.addEventListener('keyup', function(e) {
        $('.line-grid-custom').remove();
        //busca pelo key
        
        Factory.getPage(Utils.getPageSelected()).findSearch(e.target.value, $('#search-grid > .custom-select').val());
    });
    headerSearch.appendChild(inputSearch);

    return headerSearch; 
}

export function findAll(id) {
    return [ 
        {
            "values": { 
                'id': 0, 
                'Identificacao da comanda': 0
            },
            "action": [
                "Editar"
            ]
        },
        {
            "values": { 
                'id': 1, 
                'Identificacao da comanda': 1
            },
            "action": [
                "Editar"
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

export function findById(id) {
    return true;
}

export function findSearch(value, column) {
    return true;
}