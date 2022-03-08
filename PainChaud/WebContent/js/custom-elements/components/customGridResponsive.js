import Factory from '../interface/PageFactory.js';
import * as Utils from '../Utils.js';

var vlFinded = [ 
    {"values": [0, "Caio", "caio.cdmatos@gmail.com", "Administrador" ],"action": [] }, 
    {"values": [1, "Debora", "debooraa7x@gmail.com", "Caixa" ], "action": ["Editar", "Deletar"] }, 
    {"values": [2, "Erick", "erick.ruan@gmail.com", "Balcão" ], "action": ["Editar", "Deletar"] }
];

var vl = [ 
    {"values": { 
        'id': 0, 
        'Name': "Caio", 
        'Email': "caio.cdmatos@gmail.com", 
        'Funcao': "Administrador" 
    },"action": [] }
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

    createGridElement({col, value, hasSearch, hasHeader, hasCol, fieldEdit, notHeader}) {        
        let body = document.createElement('div');
        body.id = 'data-grid';
    
        if (col) {
            if (!hasCol) {
                if (hasSearch) {
                    body.appendChild(this._createSearchByColumns(col, notHeader));
                }
                if (hasHeader) {
                    body.appendChild(this._createGridHeader(col, notHeader));
                }
            }
        }

        let containerGrid = document.createElement('div');
        containerGrid.id = 'container-grid';
        this.createContainerGrid(containerGrid, value, col, fieldEdit, notHeader);
        
        body.appendChild(containerGrid);
    
        return body;
    }

    createContainerGrid(containerGrid, value, col, fieldEdit, notHeader) {
        if (value) {
            let allColumns = {};
            
            allColumns['id'] = true;
            for (let i in col) {
                if (notHeader) {
                    if (notHeader.includes(i)) {
                        allColumns[i] = false;
                        continue
                    }
                }

                if (col[i] == 'password' && col[i] == 'Action') {
                    allColumns[i] = false;
                    continue
                }

                allColumns[i] = true;
            };

            for (let grid in value) {
                containerGrid.appendChild(this._createGridBody(value[grid], allColumns, fieldEdit));
            }
        }
    }

    _createSearchByColumns(col, notHeader) { 
        let contentSearch = document.createElement('div');
        contentSearch.id = 'search-grid';

        let search = document.createElement('custom-input');
        search.setAttribute('type', 'search');
        search.id = 'search-header';

        search.addEventListener('keypress', function(e) {
            $('.line-grid-custom').remove();
            //busca pelo key

            new createGrid().createContainerGrid($('#container-grid')[0], vlFinded, createGrid.columnsPreDefine);
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

            if (notHeader) {
                if (notHeader.includes(row)) {
                    continue
                }
            }

            let option = document.createElement('option');
            option.value = row;
            option.text = row;
            byCol.appendChild(option);
        }
        contentSearch.appendChild(byCol);

        return contentSearch;
    }
 
    _createGridHeader(col, notHeader) {
        let gHeader = document.createElement('div');
        gHeader.id = 'custom-header-grid';

        for (let row in col) {
            if (col[row] == 'password') {
                continue
            }

            if (notHeader) {
                if (notHeader.includes(row)) {
                    continue
                }
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

    _createGridBody(val, col, fieldEdit) {
        let valueLine = val.values;
        let actionLine = val.action;

        let line = document.createElement('div');
        line.className = 'line-grid-custom';

        this._createLine_(line, valueLine, col, fieldEdit);
        this._createIconAction_(line, actionLine);
        
        return line;
    }

    _createLine_(insertLine, valueLine, col, fieldEdit) {
        for (let l in valueLine) {
            if (col) {
                if (!col[l]) {
                    continue
                }
            }

            if (l == 'id') {
                insertLine.id = 'line-grid-' + Number.parseInt(valueLine[l]);
                continue;
            }

            let separatorLine = document.createElement('div');
            separatorLine.className = 'separator-grid ' + valueLine[l];
            separatorLine.id = l;

            if (l == "Valor") {
                const removeCurrency = valueLine[l].replace('R$ ', '');
                separatorLine.value = parseFloat(removeCurrency.replace(',', '.')).toFixed(2);
            }

            if (fieldEdit?.includes(l)) {
                let itemField = document.createElement('input');
                itemField.value = Number.parseInt(valueLine[l]);
                itemField.className = 'qtd-field-item';
                itemField.id = 'qtd-item-' + l  ;
                itemField.title = 'Quantidade';
                itemField.type = 'Number';
                itemField.max = '999';
                itemField.min = '1';
                if (valueLine["Tipo"]) {
                    itemField.setAttribute('unit-type', valueLine["Tipo"]);
                }
                itemField.onblur = function(e) {
                    let field = e.target;

                    if (field.value > field.max) {
                        field.value = 1;
                        alert('Campo ' + field.name + ' excedeu quantidade maxima');
                    } else if (field.value < field.min && field.getAttribute('unit-type') == '0') {
                        field.value = 1;
                        alert('Campo ' + field.name + ' excedeu quantidade minima');
                    }

                    const value = $("#" + field.parentElement.parentElement.id + " > #Valor");
                    const qtd = parseFloat(field.value);    
                    const vlTotal = (value.val() * qtd).toFixed(2);

                    value[0].childNodes[0].textContent = ("R$ " + vlTotal.toString().replace('.', ','));
                }
                
                separatorLine.appendChild(itemField);
            } else {
                let pLine = document.createElement('p');
                pLine.textContent = valueLine[l];
                separatorLine.appendChild(pLine);
            }

            insertLine.appendChild(separatorLine);
        }
    }

    _createIconAction_(insertLine, actionLine) {
        if (actionLine) {
            let divAction = document.createElement('div');
            divAction.id = 'act-line';
    
            if (!actionLine.length) {
                let actionNull = document.createElement('i');
                actionNull.textContent = 'null';
                actionNull.className = 'act-null';
                divAction.appendChild(actionNull);
            }
    
            for (let a in actionLine) {
                const nameAction = actionLine[Number.parseInt(a)];

                let action = document.createElement('i');
                action.className = this._getAction(nameAction);

                if (nameAction == "Deletar") {
                    action.onclick = function() {
                        const lineId = this.parentElement.parentElement.id;
    
                        if (Factory.getPage(Utils.getPageSelected())._isDelete(lineId.replace("line-grid-", "")))
                            $('#' + lineId).remove();
                    };
                }
                if (nameAction == "Editar") {
                    action.onclick = function() {
                        // const children = $("#" + this.parentElement.parentElement.id)[0].childNodes;
                        const field = $(".data-fields  .separator >");

                        for (let i = 0; i < field.length; i++) {
                            console.log(document.forms['form'][field[i].id.toLowerCase()
                                            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")]);
                        }
                    }
                }
                if (nameAction == "Visualizar") {
                    action.onclick = function() {
                    //    Factory.getPage(Utils.getClass() + "inside")
                        this.parentElement.parentElement.id.replace("line-grid-", "");
                    }
                }
    
                divAction.appendChild(action);
            }

            insertLine.appendChild(divAction);
        }
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