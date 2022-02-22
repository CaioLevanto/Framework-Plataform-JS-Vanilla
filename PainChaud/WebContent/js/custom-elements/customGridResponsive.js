var vlFinded = [ 
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] }
];

export default class createGrid {
    
    static columnsPreDefine = {
        'Name': 'string',
        'Email': 'email',
        'Fun\u00e7\u00e3o': [ 'Selecione', 'Caixa', 'Balc\u00e3o' ],
        'Senha': 'password',
        'Confirmar Senha': 'password',
        'Ação': 'Action'
    }

    constructor() {
    }

    createGridElement(col, value, hasSearch, hasHeader, hasCol) {        
        let body = document.createElement('div');
        body.id = 'data-grid';
    
        if (col) {
            if (!hasCol) {
                if (hasSearch) {
                    body.appendChild(this._createSearchByColumns(col));
                }
                if (hasHeader) {
                    body.appendChild(this._createGridHeader(col));
                }
            }
        }

        let containerGrid = document.createElement('div');
        containerGrid.id = 'container-grid';
        this.createContainerGrid(containerGrid, value, col);
        
        body.appendChild(containerGrid);
    
        return body;
    }

    createContainerGrid(containerGrid, value, col) {
        if (value) {
            let allColumns = [];
            allColumns.push('id');
            for (let i in col) {
                if (col[i] != 'password' && col[i] != 'Action') {
                    allColumns.push(i);
                }
            };

            for (let grid in value) {
                containerGrid.appendChild(this._createGridBody(value[grid], allColumns));
            }
        }
    }

    _createSearchByColumns(col) { 
        let contentSearch = document.createElement('div');
        contentSearch.id = 'search-grid';

        let search = document.createElement('custom-input');
        search.setAttribute('type', 'search');
        search.id = 'search-header';

        search.addEventListener('keypress', function(e) {
            $('.line-grid-custom').remove();
            //busca pelo key

            new createGrid().createContainerGrid($('#container-grid')[0], vlFinded, createGrid.columnsPreDefine, true, true);
        });

        search.addEventListener('change', function(e) {
            //atualizar grid pelo key
            
        });

        contentSearch.appendChild(search);

        let byCol = document.createElement('select');
        byCol.className = 'custom-select';

        for (let row in col) {
            if (col[row] == 'password' || row == 'Ação') {
                continue
            }

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
            if (col[row] == 'password') {
                continue
            }

            let item = document.createElement('div');
            item.className = 'custom-item-header';
            item.id = row;

            let itemName = document.createElement('p');
            itemName.textContent = row;
            item.appendChild(itemName);

            gHeader.appendChild(item);
        }

        return gHeader;
    }

    _createGridBody(val, col) {
        let valueLine = val.values;
        let actionLine = val.action;

        let line = document.createElement('div');
        line.className = 'line-grid-custom';

        for (let l in valueLine) {
            if (l == '0') {
                line.id = 'line-grid-' + Number.parseInt(valueLine[l]);
                continue;
            }

            let separatorLine = document.createElement('div');
            separatorLine.className = 'separator-grid';
            separatorLine.id = col[l];

            let pLine = document.createElement('p');
            pLine.textContent = valueLine[l];

            separatorLine.appendChild(pLine);
            line.appendChild(separatorLine);
        }

        let divAction = document.createElement('div');
        divAction.id = 'act-line';

        if (!actionLine.length) {
            let actionNull = document.createElement('i');
            actionNull.textContent = 'null';
            actionNull.className = 'act-null';
            divAction.appendChild(actionNull);
        }

        for (let a in actionLine) {
            let action = document.createElement('i');
            action.className = this._getAction(actionLine[Number.parseInt(a)]);

            if (actionLine[a] == 'Editar') {
                action.onclick = function() {
                    console.log(this.parentElement.parentElement.id);
                };
            }

            divAction.appendChild(action);
        }

        line.appendChild(divAction);
        
        return line;
    }

    _getAction(act) {
        let classNameIcon = "fa-solid fa-";
        if (act == 'Editar') {
            return classNameIcon + "pencil";
        } else if (act == 'Deletar') {
            return classNameIcon + "trash-can";
        } else if (act == 'Visualizar') {
            return classNameIcon + "eye";
        }
    }
}