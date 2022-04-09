import { getNameFields, getPageSelected, resetGrid, selectReturnValue, validateFields, validateHasItemGrid } from "../../Utils.js";
import { actionOnSubmitFields, actionOnSubmitGrid, actionReturn } from "../customActionForm.js";
import { closeDialog, hasDialog, newDialog } from "./dialogFunction.js";
import Factory from "../../interface/PageFactory.js";

export function validateSubmit() {
    if (getPageSelected('save-type') == 'grid') {
        if (!validateHasItemGrid()) {
            if (getPageSelected('inside') == 'crud') {
                newDialog('grid', 'Sua ' + getPageSelected('title').toLowerCase() + ' esta vazia, deseja continuar sair?');
            } else {
                newDialog('message', 'Para concluir sua ' + getPageSelected('title').toLowerCase() + ' e necessario inserir produtos.');
            }
        } else {
            newDialog('form', 'Voce deseja concluir esta ' + getPageSelected('title').toLowerCase() + "?");
        }
    } else {
        if (validateFields()) { 
            newDialog('form', 'Voce deseja incluir esta ' + getPageSelected('title').toLowerCase() + "?");
        }
    }
}

export function validateCancel() {
    if (getPageSelected('save-type') == 'grid') {
        if (validateHasItemGrid()) {
            newDialog('cancel', 'Deseja cancelar esta ' + getPageSelected('title').toLowerCase() + " e apagar os produtos inseridos?");   
        }
    } else {
        if (validateFields()) {
            newDialog('cancel', 'Deseja cancelar esta ' + getPageSelected('title').toLowerCase() + " e apagar os campos?");
        }
    }
}

export function returnSubmit() {
    switch (getPageSelected('save-type')) {
        case 'fields':
            saveFields();
        break

        case 'grid':
            saveGrid();
        break;
    }
}

function saveFields() {
    if (actionOnSubmitFields()) {
        closeDialog();
        resetForm();
        
        if (getPageSelected('inside') == 'crud') {
            actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
        } else {
            $('#data-grid').remove();
            document.getElementById('section-custom-right').appendChild(Factory.getPage(getPageSelected()).getGrid()); 
        }
    } else {
        if (hasDialog()) {
            closeDialog();

            newDialog('message', 'Nao foi possivel salvar a ' + getPageSelected('title').toLowerCase());
        }
    }
}

function saveGrid() {
    if (actionOnSubmitGrid()) {
        closeDialog();
        resetForm();

        if (getPageSelected('inside') == 'crud') {
            actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
        } else {
            if (document.forms['form'].getAttribute('clear-grid') == 'true') {
                resetGrid();
            }
        }
    } else {
        if (hasDialog()) {
            closeDialog();

            newDialog('message', 'Nao foi possivel salvar a ' + getPageSelected('title').toLowerCase());
        }
    }
}

function resetForm() {
    document.forms['form'].reset();
    $(".custom-select > option[selected='selected']")[0].removeAttribute('selected');
    $(".custom-select > option[value='0']")[0].setAttribute('selected', 'selected');
    $(".custom-select").val('0');
}

export function resetAllFields() {
    let forms = document.forms['form'];
    let listFields = getNameFields();

    for (let i in listFields) {
        let fields = listFields[i];

        if (fields.className == 'custom-select') {
            selectReturnValue(0);
        } else {
            forms[fields.id].value = '';
        }
    }
}