import Factory from '../interface/PageFactory.js';
import * as Utils from '../Utils.js';

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

export function addItemGrid() {
    alert('oi');
}