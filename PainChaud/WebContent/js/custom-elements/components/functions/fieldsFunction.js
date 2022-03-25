import { getPageSelected, resetGrid, validateFields, validateHasItemGrid } from "../../Utils.js";
import { actionOnSubmitFields, actionOnSubmitGrid, actionReturn } from "../customActionForm.js";
import { closeDialog, newDialog } from "./dialogFunction.js";

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
    if (getPageSelected('save-type') == 'fields') {
        if (actionOnSubmitFields()) {
            closeDialog();

            if (getPageSelected('inside') == 'crud') {
                actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
            } else {
                resetGrid();
            }
        } else {
            closeDialog();

            newDialog('message', 'Nao foi possivel salvar a ' + getPageSelected('title').toLowerCase());
        }
    } else {
        if (actionOnSubmitGrid()) {
            closeDialog();

            if (getPageSelected('inside') == 'crud') {
                actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
            } else {
                resetGrid();
            }
        } else {
            closeDialog();

            newDialog('message', 'Nao foi possivel salvar a ' + getPageSelected('title').toLowerCase());
        }
    }
}