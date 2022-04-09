import { hasDialog, newDialogError } from "./components/functions/dialogFunction.js";

let contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

export function doAjax({async, pathname, url, type, data}) {
    let hasReturn;

    if (data) {
        $.ajax({
            url: '/PainChaud/rest/' + pathname + "/" + url,
            async: (async != null) ? async : false,
            type: type,
            dataType: "json",
            contentType: contentType,
            data: data,
            success: function (val) {
                if (val == 'true') {
                    hasReturn = true;
                } else {
                    hasReturn = val;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (hasDialog()) {
                        closeDialog();
                }
                newDialogError(xhr.status);
                return false;
            }
        });
    } else {
        $.ajax({
            url: '/PainChaud/rest/' + pathname + "/" + url,
            async: (async != null) ? async : false,
            type: type,
            dataType: "json",
            contentType: contentType,
            success: function (val) {
                if (val == 'true') {
                    hasReturn = true;
                } else {
                    hasReturn = val;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (hasDialog()) {
                        closeDialog();
                }
                newDialogError(xhr.status);
                return false;
            }
        });
    }

    return hasReturn;
};

export function getPageSelected(attr) {
    const opt = $('.custom-option.selected')[0];

    if (!!attr) {
        return opt.getAttribute(attr);
    } else {
        if (opt.hasAttribute('inside')) {
            // if () { 

            // }
        }
        
        return (opt.getAttribute('url') + '-' + opt.getAttribute('custom-type'));
    }
}

export function getClass() {
    return $('.custom-option.selected')[0].getAttribute('url');
}

export function validateFields(validProduct) {
    const listName = getNameFields();
    let hasError = true;
    let fieldError = true;

    for (let i in listName) {
        let field = document.forms['form'][listName[i].title.toLowerCase()];

        if (field) {
            let fieldId;

            if (field.parentElement.className == 'separator') {
                fieldId = field.id;
            } else {
                fieldId = field.parentElement.id;
            }

            if ($("#" + fieldId)[0].getAttribute('optional') == 'true') {
                continue;
            }

            if (validProduct) {
                if (field.id == 'produto') {
                    if (!hasItemInCart(field.value)) {
                        hasError = false;
                    }
                }
            }

            if (validateHasEmptyOrValue(field)) {
                if (field.localName == 'custom-input') {
                    let input = $('#' + field.id + " > input")[0];
                    
                    if (!input.className.includes('hasError'))
                            input.className += ' hasError';
                } else {
                    if (!field.className.includes('hasError'))
                            field.className  += ' hasError';
                }
                
                let validCustom = $('#' + fieldId)[0];
                
                if (validCustom.className.includes('custom-select')) {
                    let divError = field.parentElement;

                    if (divError.children.length == 1) {
                        let atention = document.createElement('p');
                        atention.textContent = "Necessario preencher o campo " + field.name;
                        atention.className = "text-atention-error";
                        
                        divError.appendChild(atention);
                    }
                } else {
                    if ($("#" + fieldId + " .text-atention-error").length == 0) {
                        let atention = document.createElement('p');
                        atention.textContent = "Necessario preencher o campo " + field.name;
                        atention.className = "text-atention-error";
                        
                        $("#" + fieldId)[0].appendChild(atention);
                    }
                }

                fieldError = false;
                hasError = false;
            }
        }
    }

    if (fieldError) {
        clearAllErrors();
    }

    return hasError;
}

export function clearAllErrors() {
    $('.data-fields .hasError').removeClass('hasError');
    $('.text-atention-error').remove();
}

export function getNameFields() {
    const listName = $('#form-fields > .separator >');
    let fields = new Array();

    for (let i = 0; i < listName.length; i++) {
        if (listName[i].className == 'text-atention-error') {
            continue;
        }

        fields.push(listName[i]);
    }

    return fields;
}

function validateHasEmptyOrValue(val) {
    let value = val.value;
    let className;

    if (val) {
            className = val.className;
    }
    
    return (className.includes('custom-select') ? (value == '0' ? true : false) 
                    : (value == null || value == "" || value == "undefined"));
}

function hasItemInCart(product) {
    let cart = $(".line-grid-custom ." + product.toLowerCase().replaceAll(' ', '-'));
    let qtdErrors = 0;

    if (cart.length) {
        cart[0].parentElement.className += ' hasError';

        qtdErrors++;
    }

    if (!qtdErrors) {
        let errors = $("#container-grid .hasError"); 
        
        if (errors.length) {
                errors.removeClass('hasError');
        }

        return true;
    }

    return false;
}

export function validateHasItemGrid() {
    if (getPageSelected('custom-type') == 'view' && getPageSelected('inside') == 'crud') {
        return ($("custom-inside-crud .line-grid-custom").length > 0);
    } else {
        return ($(".line-grid-custom").length > 0);
    }
}

export function getNameHeader() {
    let fieldsNames = $('#section-custom-right .custom-item-header');
    let names = [];

    for (let n = 0; n < fieldsNames.length; n++) {
        names.push(formatCharacters(fieldsNames[n].id));
    }

    return names;
}

export function removeCurrencyFormat(val) {
    return parseFloat(val.replace('R$ ', '').replace(',', '.'));
}

export function formatCharacters(chr) {
    return chr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '-');
}

export function resetGrid() {
    $('.line-grid-custom').remove();
                        
    let footer = $('#footer-grid')[0];
    
    if (footer)
            footer.children[1].textContent = 'R$ 0,00';
            footer.value = 0;
}

export function capitalizeFirstLetter(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

export function hasEditingItem(id) {
    let idEdit = document.forms['form'].getAttribute('data-id');

    if (idEdit == id) {
        return false;
    } else {
        return (idEdit != null && idEdit != undefined && idEdit.length);
    }
}

export function populateFormByEdit(entity) {
    let form = document.forms['form'];

    for (let field in entity) {

        if (field == 'id') {
            form.setAttribute('data-id', entity[field]);
            continue;
        }

        let input = form[field];

        if (field == 'funcao' || field == 'local' || field == 'tipoMedida') {
            selectReturnValue(entity[field]);
        }

        input.value = entity[field];
    }
}

export function selectReturnValue(opt) {
    let optSelected = $(".custom-select > [selected='selected'] ")[0];
    
    if (optSelected) {
        if (optSelected.hasAttributes('selected')) {
                optSelected.removeAttribute('selected');
        }
    }

    let customSelect = $(".custom-select > [value='" + opt + "']")[0];

    if (customSelect)
            customSelect.setAttribute('selected', 'selected');
}