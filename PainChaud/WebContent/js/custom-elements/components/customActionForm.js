import Factory from '../interface/PageFactory.js';

export function actionReturn() {
    $('custom-inside-crud').remove();
    $('custom-container-view').show()
}

export function actionSubmit(hasInside) {
    alert('submit');

    if (hasInside) {
        const selected = $('.custom-option.selected')[0];
        const url = selected.getAttribute('url');
        const container = $('.container')[0];
        const type = container.getAttribute('type')
        const crud = url + '-' + type;

        actionReturn();

        $('#data-grid').remove();
        let section = document.getElementById('section-custom-main');
        section.appendChild(Factory.getPage(crud).getGrid());
    }
}

export function actionOnSubmit(hasInside) {
    // alert('onSubmit');

    if (hasInside) {
        const selected = $('.custom-option.selected')[0];
        const url = selected.getAttribute('url');
        const container = $('.container')[0];
        const type = container.getAttribute('type')
        const crud = url + '-' + type;
        
        actionReturn();
        
        $('#data-grid').remove();
        let section = document.getElementById('section-custom-main');
        section.appendChild(Factory.getPage(crud).getGrid());
    }
}

export function addItemGrid() {
    alert('oi');
}