import Factory from '../interface/PageFactory.js';
import * as Utils from '../Utils.js';
import createGrid from './customGridResponsive.js';

export function actionReturn() {
    $('custom-inside-crud').remove();
    $('custom-container-view').show()
}

export function actionSubmit(hasInside) {
    alert('submit');

    if (hasInside) {
        const opt = Utils.getPageSelected();

        actionReturn();

        $('#data-grid').remove();
        let section;

        if (opt.split('-').includes('view')) {
            section = document.getElementById('section-custom-main');
        } else {
            section = document.getElementById('section-custom-right');
        }

        section.appendChild(Factory.getPage(opt).getGrid());
    }
}

export function actionOnSubmit(hasInside) {
    // alert('onSubmit');

    if (hasInside) {
        const opt = Utils.getPageSelected();

        actionReturn();
    
        $('#data-grid').remove();
        let section;

        if (opt.split('-').includes('view')) {
            section = document.getElementById('section-custom-main');
        } else {
            section = document.getElementById('section-custom-right');
        }

        section.appendChild(Factory.getPage(Utils.getPageSelected()).getGrid());
    }
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
                    value = productValue.getAttribute('field-value');
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
        vl.values['Valor'] = value;
        
        let footer = $("#footer-grid")[0];
        let sumValues = (footer.value + (parseFloat(value.replace('R$ ', '').replace(',', '.')) * qtd));
        footer.value = sumValues;

        footer.children[0].textContent = 'R$ ' + sumValues.toFixed(2);
    }

    return new createGrid()._createGridBody(vl, null, ["Quantidade"]);
}