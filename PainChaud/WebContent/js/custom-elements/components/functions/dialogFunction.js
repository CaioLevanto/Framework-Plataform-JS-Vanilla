export function newDialog(type, msg) {
    let dialog = document.createElement('custom-dialog');
    dialog.setAttribute('type', type);
    dialog.setAttribute('message', msg);

    document.getElementsByTagName('main')[0].appendChild(dialog);
    openDialog();
}

export function newDialogError(cdError) {
    let dialog = document.createElement('custom-dialog');
    dialog.setAttribute('type', 'error');
    // dialog.setAttribute('message', msg);
    dialog.setAttribute('error', cdError);

    document.getElementsByTagName('main')[0].appendChild(dialog);
    openDialog();
}

export function closeDialog() {
    let dialog = document.getElementsByTagName('custom-dialog')[0];

    if (dialog)
            dialog.remove();
}   

export function openDialog() {
    document.getElementById('custom-dialog').showModal();
}

export function hasDialog() {
    return document.getElementById('custom-dialog');
}