import { actionReturn } from "./custom-elements/components/customActionForm.js";
import { getPageSelected } from "./custom-elements/Utils.js";

document.addEventListener('DOMContentLoaded', function() {
    $('header').append(document.createElement('custom-router'));
    $('custom-router #0').click();
});

document.addEventListener('keydown', function(e) {
    if (e.key == 'Escape')
        if (document.getElementById('custom-buttom-return') != null)
            actionReturn(getPageSelected('inside'), getPageSelected('custom-type'));
})
