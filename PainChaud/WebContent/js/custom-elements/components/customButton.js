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

        if (this.getAttribute('type') == 'submit') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                //Realiza validação;
                document.forms['form'].onsubmit();
    
                //Confirma envio;
                document.forms['form'].submit();
            });
        }
        if (this.getAttribute('type') == 'reset') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
    
                //Confirma envio;
                document.forms['form'].reset();
            });
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