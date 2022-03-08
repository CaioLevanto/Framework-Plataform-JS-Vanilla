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

export function addItemGrid(obj, actions) {
    const listFields = $(".data-fields  .separator >");
    const listNames = Utils.getNameHeader();
    
    let vl = {
        "values": {
            'id': 'new',
         },
        "action": []
    }
    let value;
    
    for (let n in listNames) {
        let name = listNames[n];
        let key = listFields[n];
        let form = obj[name];

        if (form) {
            if (key.className == 'custom-select') {
                let productValue = $("#" + form.value)[0];

                if (productValue) {
                    value = productValue.getAttribute('field-value');
                }
            }
            vl.values[key.title] = form.value;
        }

        if (n == 'acao') {
            for (let act in actions) {
                vl.action.push(actions[act]);
            }
        }
    }

    if (value) {
        vl.values['Valor'] = value;
    }

    return new createGrid()._createGridBody(vl, null, ["Quantidade"]);
}