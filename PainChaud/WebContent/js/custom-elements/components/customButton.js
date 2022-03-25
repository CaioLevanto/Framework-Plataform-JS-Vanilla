import { resetGrid } from "../Utils.js";

class customButtonElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.children?.length)
                this.createElement();
    }

    createElement() {
        let button = document.createElement('div');
        button.className = 'custom-button-' + this.id;

        if (this.hasAttribute("icon")) {
            let i = document.createElement('i');
            i.className = this.getAttribute("icon");
            button.appendChild(i);
        }

        switch (this.getAttribute('type')) {
            case 'submit':
                button.addEventListener('click', function(e) {
                    e.preventDefault();

                    document.forms['form'].submit();
                });
            break;

            case 'reset':
                button.addEventListener('click', function(e) {
                    e.preventDefault();

                    document.forms['form'].reset();
                    
                    if ($('.' + this.className)[0].parentElement.getAttribute('clear-grid') == 'true') {
                        resetGrid();
                    }
                });
            break;
        }

        if (this.onclick) {
            button.onclick = this.onclick;
        }

        if (this.title) {
            let text = document.createElement('p');
            text.textContent = this.title;
            text.id = 'text-custom-button';
            button.appendChild(text);
        }
        return this.append(button);
    }
}

customElements.define('custom-button', customButtonElement);