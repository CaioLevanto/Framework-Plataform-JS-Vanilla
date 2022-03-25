import { formatCharacters, getPageSelected, removeCurrencyFormat } from '../Utils.js';
import { searchItemByValue } from './functions/gridFunction.js';
import Factory from '../interface/PageFactory.js';

var valueFooter;

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

    createGridElement({col, value, hasSearch, hasHeader, hasCol, fieldEdit, notHeader, hasFooter, findDB}) {        
        let body = document.createElement('div');
        body.id = 'data-grid';
    
        if (col && !hasCol) {
            if (hasSearch) {
                body.appendChild(this.createSearchByColumns(col, notHeader, findDB));
            }
            if (hasHeader) {
                body.appendChild(this.createGridHeader(col, notHeader));
            }
        }

        let containerGrid = document.createElement('div');
        containerGrid.id = 'container-grid';

        valueFooter = 0;
        this.createContainerGrid(containerGrid, value, col, fieldEdit, notHeader);
        body.appendChild(containerGrid);

        if (hasFooter) {
            body.appendChild(this.createFooterGrid());
        }
    
        return body;
    }

    createContainerGrid(containerGrid, value, col, fieldEdit, notHeader) {
        if (value) {
            for (let grid in value) {
                containerGrid.appendChild(this.createGridBody(value[grid], this.getAllColumns(col, notHeader), fieldEdit));
            }
        }
    }

    createFooterGrid() {
        let footerGrid = document.createElement('div');
            
        let valueFixed = valueFooter.toFixed(2);
        footerGrid.id = 'footer-grid';
        footerGrid.value = valueFooter;

        let textFooter = document.createElement('p');
        textFooter.textContent = 'Valor total:';
        footerGrid.appendChild(textFooter);

        let pFooter = document.createElement('p');
        pFooter.textContent = 'R$ ' + valueFixed;
        footerGrid.appendChild(pFooter);

        return footerGrid;
    }

    getAllColumns(col, notHeader) {
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

        return allColumns;
    }

    createSearchByColumns(col, notHeader, findDB) { 
        let contentSearch = document.createElement('div');
        contentSearch.id = 'search-grid';

        let searchInput = document.createElement('custom-input');
        searchInput.setAttribute('type', 'search');
        searchInput.id = 'search-header';
        
        if (findDB) {
            searchInput.addEventListener('keyup', function(e) {
                $('.line-grid-custom').remove();
                //busca pelo key
                
                Factory.getPage(getPageSelected()).findSearch(e.target.value, $('#search-grid > .custom-select').val());
            });
        } else {
            searchInput.addEventListener('keyup', function(e) {
                searchItemByValue(e.target.value);
            });
        }

        contentSearch.appendChild(searchInput);

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
 
    createGridHeader(col, notHeader) {
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

    createGridBody(val, col, fieldEdit) {
        let valueLine = val.values;
        let actionLine = val.action;

        let line = document.createElement('div');
        line.className = 'line-grid-custom';

        let fieldsInAttribute = {};
        this.createLine(line, valueLine, col, fieldEdit, fieldsInAttribute);
        line.setAttribute('fields-value', JSON.stringify(fieldsInAttribute));

        this.createIconAction(line, actionLine);
        
        return line;
    }

    createLine(insertLine, valueLine, col, fieldEdit, fieldsInAttribute) {
        let oldValue;
        let qtd;

        for (let l in valueLine) {
            if (col) {
                if (!col[l]) {
                    continue
                }
            }

            if (l == 'id') {
                let lineId;

                if (valueLine[l] == 'new') {
                    let id = 0

                    while (!lineId) {
                        let line = $("#line-grid-new-" + id);

                        if (!line.length) {
                            lineId = 'line-grid-new-' + id;

                            break;
                        }
                        id++;
                    }
                } else {
                    lineId = 'line-grid-' + valueLine[l];
                }

                insertLine.id = lineId;
                continue;
            }

            let separatorLine = document.createElement('div');
            separatorLine.className = 'separator-grid ' + valueLine[l].toString().toLowerCase().replaceAll(' ', '-');
            separatorLine.id = l;

            switch (l) {
                case 'Quantidade': 
                    qtd = valueLine[l];
                break;

                case 'Valor':
                    let valFloat =  removeCurrencyFormat(valueLine[l]);
                    oldValue = valFloat;
                    separatorLine.value = valFloat.toFixed(2);
    
                    if (qtd) {
                        valueLine[l] = 'R$ ' + (valFloat * qtd).toFixed(2);
                    }
    
                    valueFooter = (valueFooter + valFloat); 
                break;
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

                    let footer = $('#footer-grid')[0];
                    footer.value = ((footer.value - removeCurrencyFormat(value[0].textContent)) + 
                            parseFloat(vlTotal));
                    
                    
                    footer.children[1].textContent = 'R$ ' + footer.value.toFixed(2);
                    value[0].childNodes[0].textContent = ("R$ " + vlTotal.toString().replace('.', ','));
                }
                
                separatorLine.appendChild(itemField);
            } else {
                let pLine = document.createElement('p');
                pLine.textContent = valueLine[l];
                separatorLine.appendChild(pLine);
            }
            
            switch (l) {
                case 'Valor':
                    fieldsInAttribute[l] = oldValue;
                break;

                case 'Produto':
                    fieldsInAttribute[l] = $('.custom-select #' + formatCharacters(valueLine[l]))[0].getAttribute('field-id');
                break;

                default:
                    fieldsInAttribute[l] = valueLine[l];
                break;
            }
            insertLine.appendChild(separatorLine);
        }
    }

    createIconAction(insertLine, actionLine) {
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
                action.className = this.getAction(nameAction);

                switch (nameAction) {
                    case 'Deletar':
                        action.onclick = function() {
                            const line = this.parentElement.parentElement;
        
                            if (Factory.getPage(getPageSelected()).isDelete(line.id.replace("line-grid-", ""))) {
                                let valLine = $("#" + line.id + " #Valor");
    
                                if (valLine.length) {
                                    let removeVal = removeCurrencyFormat(valLine[0].textContent);
    
                                    let footer = $('#footer-grid')[0];
                                    footer.value = (footer.value - removeVal);
                                    footer.children[1].textContent = 'R$ ' + footer.value.toFixed(2);
                                }

                                line.remove();
                            }
                        };
                    break;

                    case 'Editar':
                        action.onclick = function() {
                            if (getPageSelected('inside') == 'crud') {
                                $('custom-container-view').hide();
                            
                                let inside = document.createElement('custom-inside-crud');
                                inside.setAttribute('edit', true);
                                inside.setAttribute('lineId', $("#" + this.parentElement.parentElement.id)[0].id.replace('line-grid-', ''));
                                
                                document.querySelector('main').appendChild(inside);
                            } else {
                                alert('findById insert in fields');
                            }
                        }
                    break;

                    case 'Visualizar':
                        action.onclick = function() {
                            $('custom-container-view').hide();

                            let inside = document.createElement('custom-inside-crud');
                            inside.setAttribute('return', true);
                            inside.setAttribute('lineId', $("#" + this.parentElement.parentElement.id)[0].id.replace('line-grid-', ''));

                            document.querySelector('main').appendChild(inside);
                        }
                    break;

                    default:
                        break;
                }
    
                divAction.appendChild(action);
            }

            insertLine.appendChild(divAction);
        }
    }

    getAction(act) {
        let classNameIcon = "fa-solid fa-";

        switch (act) {
            case 'Editar':
                return classNameIcon + "pencil";

            case 'Deletar':
                return classNameIcon + "trash-can";

            case 'Visualizar':
                return classNameIcon + "eye";
        }
    }
}