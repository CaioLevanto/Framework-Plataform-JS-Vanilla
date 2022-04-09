import { resetAllFields, returnSubmit, validateCancel, validateSubmit } from './functions/fieldsFunction.js';
import { formatCharacters, getPageSelected, selectReturnValue } from '../Utils.js';
import { actionReturn } from './customActionForm.js';

export function createElementsFields({col, hiddenField, isReturn, hasInside, clearGrid}) {
    let sectionGrid = document.createElement('div');
    sectionGrid.className = 'data-fields';

    let form = document.createElement('form');
    form.setAttribute('return', !!hasInside);
    form.setAttribute('data-id', '');
    form.setAttribute('save-type', getPageSelected('save-type'));
    form.setAttribute('clear-grid', !!clearGrid);
    form.id = 'form-fields';
    form.name = 'form';

    let contentBtn = document.createElement('div');

    if (isReturn) {
        contentBtn.className = 'content-action-return';

        let btnReturn = document.createElement('custom-button');
        btnReturn.id = 'custom-buttom-return';
        btnReturn.title = 'Voltar';
        btnReturn.setAttribute('icon', 'fa-solid fa-turn-down-left');
        btnReturn.addEventListener('click', function() {
            actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
        });
        contentBtn.appendChild(btnReturn);
    } else {
        form.submit = function() {
            returnSubmit();
        }
        form.reset = function() {
            resetAllFields();
        }
        
        for (let obj in col) {
            if (obj == 'Action') {
                continue
            }
    
            if (hiddenField) {
                if (hiddenField.includes(obj)) {
                    continue
                }
            }
    
            let contentGrid = document.createElement('div');
            contentGrid.className = 'separator';
            let fieldType = col[obj];
            let fieldInput;
            
            if (fieldType.includes(',')) {
                    fieldType = new Array(fieldType.split(','))[0];
            }            

            if (Array.isArray(fieldType)) {
                let labelSelect = document.createElement('label');
                labelSelect.className = 'custom-label';
                labelSelect.textContent = obj;
                form.appendChild(labelSelect);
                
                fieldInput = document.createElement('select');
                fieldInput.className = 'custom-select';
                fieldInput.addEventListener("change", function() {
                    selectReturnValue(this.value);
                });
    
                let nameSelect = formatCharacters(obj);
                fieldInput.id = nameSelect;
                fieldInput.name = nameSelect;
    
                for (let opt in fieldType) {
                    let options = document.createElement('option');
                    
                    if (opt == '0') {
                        options.setAttribute('selected', 'selected');
                    }
                    if (Array.isArray(fieldType[opt])) {
                        options.value = fieldType[opt][1];
                        options.setAttribute('field-id', fieldType[opt][0]);
                        options.setAttribute('field-value', fieldType[opt][3]);
                        options.id = formatCharacters(fieldType[opt][1]);
                        options.text = fieldType[opt][1];
                    } else {
                        options.value = opt;
                        options.id = formatCharacters(fieldType[opt]);
                        options.text = fieldType[opt];
                    }
    
                    fieldInput.appendChild(options);
                }
            } else {
                fieldInput = document.createElement('custom-input');
                fieldInput.id = obj.toLowerCase();

                if (obj == 'Comanda') {
                    contentGrid.className += (' ' + obj);
                    fieldInput.setAttribute('optional', true);
    
                    let borderTop = document.createElement('div');
                    borderTop.id = 'border-separator-comanda';
                    form.appendChild(borderTop);
                }
                
                if (!fieldInput.hasAttribute('optional')) {
                        fieldInput.setAttribute('optional', false);
                }
    
                if (fieldType == 'string' || !fieldType) {
                    fieldInput.setAttribute('type', 'custom');
                } else {
                    fieldInput.setAttribute('type', fieldType);
                }
            }
    
            fieldInput.title = obj;
            contentGrid.appendChild(fieldInput);
            form.appendChild(contentGrid);
        }

        let borderSeparator = document.createElement('div');
        borderSeparator.id = 'custom-border-action';
        form.appendChild(borderSeparator);

        contentBtn.className = 'content-action-button';

        let btnSave = document.createElement('custom-button');
        btnSave.className = 'custom-buttom-save';
        btnSave.title = 'Concluir';
        btnSave.id = 1;
        btnSave.addEventListener('click', function() {
            validateSubmit();
        });
        btnSave.setAttribute('clear-grid', !!clearGrid);
        btnSave.setAttribute('form', 'form');
        btnSave.setAttribute('icon', 'fa-solid fa-floppy-disk');
        contentBtn.appendChild(btnSave);

        let btnCancel = document.createElement('custom-button');
        btnCancel.className = 'custom-buttom-cancel';
        btnCancel.setAttribute('icon', 'fa-solid fa-ban');
        btnCancel.addEventListener('click', function() {
            validateCancel();
        });
        btnCancel.title = 'Cancelar';
        btnCancel.id = 2;
        contentBtn.appendChild(btnCancel);
    }

    form.autocomplete = 'off';
    form.appendChild(contentBtn);
    sectionGrid.appendChild(form);

    return sectionGrid;
}