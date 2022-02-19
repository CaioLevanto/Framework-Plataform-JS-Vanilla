class customInputElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.children?.length)
                this.createElement();
    }

    createElement() {
        if (this.hasAttribute('type')) {
            const type = this.getAttribute('type');

            if (type == 'custom') {
                this._typeCustomInput();
            } else if (type == 'search') {
                this._typeCustomSearch();
            } else {
                this._typeCustomInput(type);
            }
        }
    }

    _typeCustomInput(type) {
        let label = document.createElement('label');
        label.textContent = this.title;
        label.className = 'custom-label';
        this.append(label);
    
        let input = document.createElement('input');
        if (type) {
            input.setAttribute("type", type);
        }
        input.className = "custom-input-" + this.id;
        this.append(input);
    }

    _typeCustomSearch() {
        let input = document.createElement('input');
        input.id = "custom-input-search";
        input.placeholder = "Buscar por:";
        this.append(input);
    }
}

customElements.define('custom-input', customInputElement);

