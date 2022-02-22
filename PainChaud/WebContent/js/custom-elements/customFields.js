export function createElementsFields(array, isReturn) {
    let sectionGrid = document.createElement('div');
    sectionGrid.className = 'data-fields';

    let form = document.createElement('form');
    form.id = 'form-fields';
    form.name = 'form';
    
    for (let obj in array) {
        if (obj == 'Ação') {
            continue
        }

        let contentGrid = document.createElement('div');
        contentGrid.className = 'separator';
        let fieldType = array[obj];
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

    if (isReturn) {
        
    } else {
        let contentBtn = document.createElement('div');
        contentBtn.className = 'content-action-button';

        let btnSave = document.createElement('custom-button');
        btnSave.className = 'custom-buttom-save';
        btnSave.title = 'Cadastrar';
        btnSave.type = 'submit';
        btnSave.setAttribute('icon', 'fa-solid fa-floppy-disk');
        btnSave.id = 1;
        contentBtn.appendChild(btnSave);

        let btnCancel = document.createElement('custom-button');
        btnCancel.className = 'custom-buttom-cancel';
        btnCancel.setAttribute('icon', 'fa-solid fa-ban');
        btnCancel.title = 'Cancelar';
        btnCancel.id = 2;
        contentBtn.appendChild(btnCancel);

        form.appendChild(contentBtn);
    }

    sectionGrid.appendChild(form);

    return sectionGrid;
}