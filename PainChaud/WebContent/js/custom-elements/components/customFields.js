import * as Action from './customActionForm.js';

export function createElementsFields({col, hiddenField, isReturn, hasInside}) {
    let sectionGrid = document.createElement('div');
    sectionGrid.className = 'data-fields';

    let form = document.createElement('form');
    form.setAttribute('return', !!hasInside);
    form.setAttribute('data-id', '');
    form.id = 'form-fields';
    form.name = 'form';
    form.submit = function(e) {
        return Action.actionOnSubmit(document.forms['form'].getAttribute('return'));
    }
    
    for (let obj in col) {
        if (obj == 'Ação') {
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

        if (Array.isArray(fieldType)) {
            let labelSelect = document.createElement('label');
            labelSelect.className = 'custom-label';
            labelSelect.textContent = obj;
            form.appendChild(labelSelect);
            
            fieldInput = document.createElement('select');
            fieldInput.className = 'custom-select';

            let nameSelect = obj.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            fieldInput.id = nameSelect;
            fieldInput.name = nameSelect;

            for (let opt in fieldType) {
                let options = document.createElement('option');
                
                if (opt == '0') {
                    options.setAttribute('selected', 'selected');
                }

                options.value = opt;
                options.id = fieldType[opt];
                options.text = fieldType[opt];
                fieldInput.appendChild(options);
            }
        } else {
            fieldInput = document.createElement('custom-input');
            fieldInput.id = obj.toLowerCase();

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

    let contentBtn = document.createElement('div');

    if (isReturn) {
        contentBtn.className = 'content-action-return';

        let btnReturn = document.createElement('custom-button');
        btnReturn.className = 'custom-buttom-return';
        btnReturn.title = 'Voltar';
        btnReturn.id = 1;
        btnReturn.setAttribute('icon', 'fa-solid fa-turn-down-left');
        btnReturn.addEventListener('click', function() {
            Action.actionReturn();
        });
        contentBtn.appendChild(btnReturn);
    } else {
        contentBtn.className = 'content-action-button';

        let btnSave = document.createElement('custom-button');
        btnSave.className = 'custom-buttom-save';
        btnSave.title = 'Concluir';
        btnSave.id = 1;
        btnSave.setAttribute('type', 'submit');
        btnSave.setAttribute('form', 'form');
        btnSave.setAttribute('icon', 'fa-solid fa-floppy-disk');
        contentBtn.appendChild(btnSave);

        let btnCancel = document.createElement('custom-button');
        btnCancel.className = 'custom-buttom-cancel';
        btnCancel.setAttribute('icon', 'fa-solid fa-ban');
        btnCancel.setAttribute('type', 'reset');
        btnCancel.title = 'Cancelar';
        btnCancel.id = 2;
        contentBtn.appendChild(btnCancel);
    }

    form.autocomplete = 'off';
    form.appendChild(contentBtn);
    sectionGrid.appendChild(form);

    return sectionGrid;
}