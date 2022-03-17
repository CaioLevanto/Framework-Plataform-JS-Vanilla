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
        success: function (d) { return d },
        error: function (e) { return e }
    });
};

export function getPageSelected() {
    const opt = $('.custom-option.selected')[0];
    return (opt.getAttribute('url') + '-' + opt.getAttribute('custom-type'));
}

export function getClass() {
    return $('.custom-option.selected')[0].getAttribute('url');
}

export function validateFields() {
    const listName = $('#form-fields > .separator >');
    let hasError = true;
    let fieldError = true;

    for (let i = 0; i < listName.length; i++) {
        let field = document.forms['form'][listName[i].title.toLowerCase()];

        if (field) {
            if (field.id == 'produto') {
                if (!this.hasItemInCart(field.value)) {
                    hasError = false;
                }
            }

            if (!field.value || field.value == '') {
                if (field.localName == 'custom-input') {
                    let input = $('#' + field.id + " > input")[0];
    
                    input.className += ' hasError';
                } else {
                    field.className  += ' hasError';

                    if (validError("#" + field.parentElement.id + " .text-atention-error")) {
                        let atention = document.createElement('p');
                        atention.textContent = "Necessario preencher o campo " + field.name;
                        atention.className = "text-atention-error";
                        
                        $("#" + field.parentElement.id)[0].appendChild(atention);
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

function validError(rel) {
    let field = $(rel);

    return (field.length ? true : false);
}

export function hasItemInCart(product) {
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

export function getNameHeader() {
    let fieldsNames = $('#section-custom-right .custom-item-header');
    let names = [];

    for (let n = 0; n < fieldsNames.length; n++) {
        names.push(fieldsNames[n].id.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    }

    return names;
}

export function removeCurrencyFormat(val) {
    return parseFloat(val.replace('R$ ', '').replace(',', '.'));
}