export function createGridElement(col, value) {
    let func = new allFunctions();
    
    let body = document.createElement('div');
    body.id = 'data-grid';

    body.appendChild(func._createSearchByColumns(col));

    let separatorBody = document.createElement('div');
    separatorBody.className = 'custom-border-action';
    body.appendChild(separatorBody);

    body.appendChild(func._createGridHeader(col));
    body.appendChild(func._createGridBody(value));

    return body;
}

class allFunctions {
    
    constructor() {
    }

    _createSearchByColumns(col) { 
        let contentSearch = document.createElement('div');
        contentSearch

        let search = document.createElement('custom-input');
        search.setAttribute('type', 'search');
        search.id = 'search-header';
        contentSearch.appendChild(search);

        let byCol = document.createElement('select');
        byCol.id = 'search-columns-grid';

        for (let row in col) {
            let option = document.createElement('option');
            option.value = row;
            option.text = row;
            byCol.appendChild(option);
        }
        contentSearch.appendChild(byCol);

        return contentSearch;
    }
 
    _createGridHeader(col) {
        let gHeader = document.createElement('div');
        gHeader.id = 'custom-header-grid';

        for (let row in col) {
            let item = document.createElement('div');
            item.className = 'custom-item-header';

            let itemName = document.createElement('p');
            itemName.textContent = row;
            item.appendChild(itemName);

            gHeader.appendChild(item);
        }

        return gHeader;
    }

    _createGridBody(val) {
        return document.createElement('div');
    }

}

//Usuario: NOME, EMAIL, FUNÇÃO

//barra de pesquisa + campo de busca

//borda de separação

//criação da grid