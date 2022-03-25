import { getPageSelected } from "../Utils.js";
import { actionReturn } from "./customActionForm.js";
import { closeDialog } from "./functions/dialogFunction.js";

class customDialog extends HTMLElement {
 
    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.children?.length)
                this.createElement();
    }

    createElement() {
        let dialog = document.createElement('dialog');
        dialog.id = 'custom-dialog';
        dialog.className = this.getAttribute('type');

        dialog.appendChild(this.createHeader());
        dialog.appendChild(this.createBody());

        this.append(dialog);
    }

    createHeader() {
        let dialogHeader = document.createElement('div');
        dialogHeader.id = 'dialog-header';

        let txtAlert = document.createElement('p');
        switch (this.getAttribute('type')) {
            case 'form':
                txtAlert.textContent = 'Confirmacao:';
            break;

            case 'error':
                txtAlert.textContent = 'Error:';
            break;

            case 'message':
                txtAlert.textContent = 'Aviso:'
            break;

            case 'cancel':
            case 'grid':
                txtAlert.textContent = 'Atencao:';
            break;

            default:
                break;
        }
        dialogHeader.appendChild(txtAlert);

        return dialogHeader;
    }

    createBody() {
        let dialogBody = document.createElement('div');
        dialogBody.id = 'dialog-body';

        if (this.hasAttribute('error')) {
            let imgError = document.createElement('img');
            imgError.src = 'https://http.cat/' + this.getAttribute('error') + '.jpg';
            dialogBody.appendChild(imgError);
        } else {
            let textMessage = document.createElement('p');
            textMessage.textContent = this.getAttribute('message');
            dialogBody.appendChild(textMessage);
        }
        
        switch (this.getAttribute('type')) {
            case 'form':
                dialogBody.appendChild(this.createBtnConfirmAndCancel());
            break;

            case 'error':
            case 'message':
                dialogBody.appendChild(this.createBtnOk());
            break;

            case 'cancel':
            case 'grid':
                dialogBody.appendChild(this.createBtnYesOrNo());
            break;

            default:
                break;
        }

        return dialogBody;
    }

    createBtnConfirmAndCancel() {
        let actionDialog = document.createElement('div');
        actionDialog.id = 'action-dialog';

        let btnConfirm = document.createElement('custom-button');
        btnConfirm.setAttribute('type', 'submit');
        btnConfirm.title = 'Confirmar';
        btnConfirm.id = 'confirm';
        actionDialog.appendChild(btnConfirm);

        let btnCancel = document.createElement('custom-button');
        btnCancel.addEventListener('click', function() {
            closeDialog();
        });
        btnCancel.title = 'Cancelar';
        btnCancel.id = 'cancel';
        actionDialog.appendChild(btnCancel);

        return actionDialog;
    }

    createBtnOk() {
        let actionDialog = document.createElement('div');
        actionDialog.id = 'action-dialog';

        let btnOk = document.createElement('custom-button');
        btnOk.addEventListener('click', function() {
            closeDialog();
        });
        btnOk.title = 'Ok';
        btnOk.id = 'ok';
        actionDialog.appendChild(btnOk);

        return actionDialog;
    }

    createBtnYesOrNo() {
        let actionDialog = document.createElement('div');
        actionDialog.id = 'action-dialog';

        let btnYes = document.createElement('custom-button');
        btnYes.setAttribute('clear-grid', document.forms['form'].getAttribute('clear-grid'));
        btnYes.setAttribute('type', 'reset');
        btnYes.addEventListener('click', function() {
            closeDialog();

            actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
        });
        btnYes.title = 'Sim';
        btnYes.id = 'sim';
        actionDialog.appendChild(btnYes);

        let btnNo = document.createElement('custom-button');
        btnNo.addEventListener('click', function() {
            closeDialog();
        });
        btnNo.title = 'Nao';
        btnNo.id = 'no';
        actionDialog.appendChild(btnNo);

        return actionDialog;
    }
}

customElements.define('custom-dialog', customDialog);