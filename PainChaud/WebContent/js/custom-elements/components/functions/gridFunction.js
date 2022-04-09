import { doAjax } from "../../Utils.js";

export function searchItemByValue(value) {
    if (value != null && value != "") {
        let val = $('#container-grid #' + $('#search-grid > .custom-select').val()).children();
        
        for (let l = 0; l < val.length; l++) {
            let lineGrid = val[l].parentElement.parentElement;
            let valueLine;

            if (val[l].type == 'number') {
                valueLine = val[l].value;
            } else {
                valueLine = val[l].textContent.toString().toLowerCase();
            }
            
            let hasHidden = lineGrid.className.includes('hidden');

            if (valueLine.indexOf(value.toLowerCase()) == -1) {
                if (!hasHidden)
                        lineGrid.className += ' hidden';
            } else {
                if (hasHidden)
                        lineGrid.className = lineGrid.className.replace(' hidden', '');
            }
        }
    } else {
        $('.line-grid-custom.hidden').removeClass('hidden');
    }
}

export function getDescriptionEnum(field, index) {
    let fieldEnum = new Object();
    fieldEnum.field = field;
    fieldEnum.index = index;

    return doAjax({
        async: false,
        pathname: 'utils',
        type: 'POST',
        url: 'enum',
        data: JSON.stringify(fieldEnum)
    })
}