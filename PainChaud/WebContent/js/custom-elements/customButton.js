class customButtonElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let button = document.createElement('div');
        let text = document.createElement('p');

        button.className = 'custom-button-' + this.id;

        if (this.hasAttribute("icon")) {
            let i = document.createElement('i');
            i.className = this.getAttribute("icon");
            button.appendChild(i);
        }
        
        text.textContent = this.title;
        text.id = 'text-custom-button';

        button.appendChild(text);
        return this.append(button);
    }

}

customElements.define('custom-button', customButtonElement);