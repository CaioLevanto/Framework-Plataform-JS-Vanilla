import Factory from '../interface/PageFactory.js';
import { validateFields, getPageSelected, getNameHeader } from '../Utils.js';
import createGrid from './customGridResponsive.js';

export function actionReturn(inside, container) {
    $('custom-inside-' + inside).remove();
    $('custom-container-' + container).show();

    if (inside == 'crud') {
        $('#data-grid').remove();
        document.getElementById(getPageSelected('custom-type') == 'view' ? 
            'section-custom-main' : 'section-custom-right').appendChild(
                Factory.getPage(getPageSelected()).getGrid());
    }
}

export function actionOnSubmitFields() {
    if (validateFields(false))
        return Factory.getPage(getPageSelected()).isInsert(createObjectForm($('#form-fields > .separator >')))
}

export function actionOnSubmitGrid() {
    let lines = $("#section-custom-right .line-grid-custom");

    if (lines.length > 0) {
        let listValus = new Array();
    
        for (let i = 0; i < lines.length; i++) {
            listValus.push(JSON.parse(lines[i].getAttribute('fields-value')))
        }
    
        console.log(JSON.stringify(listValus));
        return true;
    }
    return false;
}

function createObjectForm(list) {
    let form = document.forms['form'];
    let idEdit = form.getAttribute('data-id');
    let obj = {};

    if (idEdit != '')
        obj['id'] = idEdit;

    for (let i = 0; i < list.length; i++) {
        let line = list[i];

        let value = form[line.id].value;

        if (form[line.id].className.includes('select')) {
            obj[line.title.toLowerCase()] = parseInt(value);
        } else {
            obj[line.title.toLowerCase()] = value;
        }
    }

    return JSON.stringify(obj);
}

export function addItemGrid(obj, listActions) {
    const listFields = $(".data-fields  .separator >");
    const listNames = getNameHeader();
    
    let vl = {
        "values": {
            'id': 'new',
         },
        "action": []
    }
    let value;
    let qtd;
    
    for (let n in listNames) {
        let name = listNames[n];
        let key = listFields[n];
        let form = obj[name];
        
        if (form) {
            let title = key.title;
            let productValue;

            if (key.className == 'custom-select') {
                productValue = $("#produto > [value='" + form.value + "']")[0];

                if (productValue) {
                    value = parseFloat(productValue.getAttribute('field-value'));
                }
            }
            if (title == 'Quantidade') {
                qtd = parseInt(form.value);
            }
            vl.values[title] = form.value;
        }

        if (name == 'acao') {
            for (let act in listActions) {
                vl.action.push(listActions[act]);
            }
        }
    }

    if (value) {
        vl.values['Valor'] = ("R$ " + value.toFixed(2).replace('.', ','));
        
        let footer = $("#footer-grid")[0];
        let sumValues = (footer.value + (value * qtd));
        footer.value = sumValues;

        footer.children[1].textContent = 'R$ ' + sumValues.toFixed(2);
    }

    return new createGrid().createGridBody(vl, null, ["Quantidade"]);
}