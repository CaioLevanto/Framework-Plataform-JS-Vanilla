import Factory from '../interface/PageFactory.js';
import { validateFields, getPageSelected } from '../Utils.js';
import createGrid from './customGridResponsive.js';

export function actionReturn() {
    $('custom-inside-crud').remove();
    $('custom-container-view').show()
}

export function actionOnSubmit(form) {
    let allFields = $('#form-fields > .separator >');
    let validReturn = false;
    
    if (validateFields()) {
        if (Factory.getPage(getPageSelected()).isInsert(createObjectForm(allFields))) {
            if (form.getAttribute('return') == 'true') {
                actionReturn();
            }
            
            $('#data-grid').remove();
            document.getElementById(getPageSelected().split('-').includes('view') ? 
                'section-custom-main' : 'section-custom-right').appendChild(
                    Factory.getPage(getPageSelected()).getGrid());
    
            validReturn = true;
        }
    }

    return validReturn;
}

function createObjectForm(list) {
    let form = document.forms['form'];
    let obj = {};

    for (let i = 0; i < list.length; i++) {
        let line = list[i];

        obj[line.title] = form[line.id].value;
    }

    console.log(JSON.stringify(obj));
}

export function addItemGrid(obj, listActions) {
    const listFields = $(".data-fields  .separator >");
    const listNames = Utils.getNameHeader();
    
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

            if (key.className == 'custom-select') {
                let productValue = $("#produto > [value='" + form.value + "']")[0];

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