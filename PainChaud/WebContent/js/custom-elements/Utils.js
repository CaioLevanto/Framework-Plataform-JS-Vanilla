import { newDialogError } from "./components/functions/dialogFunction.js";

export function doAjax({async, pathname, url, type, field, params}) {
    $.ajax({
        url: '/Painchaud/rest/' + pathname + url,
        async: async,
        dataType: type,
        type: type,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: JSON.stringify({
            field: field,
            params: params
        }),
        success: function (d) { 
            return d 
        },
        error: function (xhr, ajaxOptions, thrownError) {
            return newDialogError(xhr.status)
        }
    });
};

export function getPageSelected(attr) {
    const opt = $('.custom-option.selected')[0];

    if (!!attr) {
        return opt.getAttribute(attr);
    } else {
        return (opt.getAttribute('url') + '-' + opt.getAttribute('custom-type'));
    }
}

export function getClass() {
    return $('.custom-option.selected')[0].getAttribute('url');
}

export function validateFields(validProduct) {
    const listName = $('#form-fields > .separator >');
    let hasError = true;
    let fieldError = true;

    for (let i = 0; i < listName.length; i++) {
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
        $('.data-fields .hasError').removeClass('hasError');
        $('.text-atention-error').remove();
    }

    return hasError;
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