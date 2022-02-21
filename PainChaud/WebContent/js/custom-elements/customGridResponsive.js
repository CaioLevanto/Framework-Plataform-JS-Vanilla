export default class createGrid {
    
    constructor() {
    }

    createGridElement(col, value, hasHeader) {        
        let body = document.createElement('div');
        body.id = 'data-grid';
    
        if (col) {
            if (hasHeader) {
                body.appendChild(this._createSearchByColumns(col));
                body.appendChild(this._createGridHeader(col));
            }
        }
    
        let containerGrid = document.createElement('div');
        containerGrid.id = 'container-grid';
    
        if (value) {
            for (let grid in value) {
                containerGrid.appendChild(this._createGridBody(value[grid], grid));
            }
        }
        
        body.appendChild(containerGrid);
    
        return body;
    }

    _createSearchByColumns(col) { 
        let contentSearch = document.createElement('div');
        contentSearch.id = 'search-grid';

        let search = document.createElement('custom-input');
        search.setAttribute('type', 'search');
        search.id = 'search-header';
        contentSearch.appendChild(search);

        let byCol = document.createElement('select');
        byCol.className = 'custom-select';

        let i = 0;
        for (let row in col) {
            if (col[row] == 'password' || row == 'Ação') {
                continue
            }

            i++;
            let option = document.createElement('option');
            option.value = row;
            option.id = i;
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

            let itemName = document.createElement('p');
            itemName.textContent = row;
            item.appendChild(itemName);

            gHeader.appendChild(item);
        }

        return gHeader;
    }

    _createGridBody(val, i) {
        let valueLine = val.values;
        let actionLine = val.action;

        let line = document.createElement('div');
        line.id = 'line-grid-' + Number.parseInt(i);
        line.className = 'line-grid-custom';

        for (let l in valueLine) {
            if (l == '0') {
                continue
            }

            let separatorLine = document.createElement('div');
            separatorLine.className = 'separator-grid';

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