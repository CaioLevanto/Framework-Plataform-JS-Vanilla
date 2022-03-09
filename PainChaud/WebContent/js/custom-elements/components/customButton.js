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

        if (this.onclick) {
            button.onclick = this.onclick;
        }

        if (this.getAttribute('type') == 'submit') {
            button.addEventListener('click', function(e) {
                //Confirma envio;
                document.forms['form'].submit();
                e.preventDefault();
            });
        }
        if (this.getAttribute('type') == 'reset') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                //Confirma envio;
                document.forms['form'].reset();
                $('.line-grid-custom').remove();

                let footer = $('#footer-grid')[0];
                footer.children[0].textContent = 'R$ 0,00';
                footer.value = 0;
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