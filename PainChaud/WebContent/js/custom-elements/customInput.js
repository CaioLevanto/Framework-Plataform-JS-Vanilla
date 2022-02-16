class customInputElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let label = document.createElement('label');
        label.textContent = this.title;
        this.append(label);
        
        let input = document.createElement('input');
        input.setAttribute("type", this.getAttribute("type"));
        input.className = "custom-input-" + this.id;
        this.append(input);
    }

}

customElements.define('custom-input', customInputElement);