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

    _typeCustomInput(hasType) {
        if (!this.hasAttribute('label') || this.getAttribute('label')) {
            let label = document.createElement('label');
            label.textContent = this.title;
            label.className = 'custom-label';
            this.append(label);
        }
    
        let input = document.createElement('input');
        
        if (hasType) {
            input.setAttribute("type", hasType);
        }

        if (this.value) {
            input.value = this.value;
        }

        if (hasType == 'date') {
            input.setAttribute('min', this.getAttribute('min'));
            input.setAttribute('max', this.getAttribute('max'));
        }

        if (hasType == 'money') {
            input.onblur = function (e) {
                let number = Number.parseInt(e.target.value);

                e.target.value = new Intl.NumberFormat('ja-JP',  {
                    style: 'currency',
                    currency: 'BRL',
                }).format(number);
            }
        }

        if (hasType == 'Number') {
            input.max = '9999';
            input.min = '1';
            input.onblur = function(e) {
                let field = e.target;

                if (input.value != "") {
                    if (field.value > field.max) {
                        field.value = 1;
                        alert('Campo ' + field.name + ' excedeu quantidade maxima');
                    } else if (field.value < field.min) {
                        field.value = 1;
                        alert('Campo ' + field.name + ' excedeu quantidade minima');
                    }
                }
            }
        }

        input.className = "custom-input-" + this.id;
        input.name = this.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        this.append(input);
    }

    _typeCustomSearch() {
        let input = document.createElement('input');
        input.id = "custom-input-search";

        if (this.hasAttribute('title')) {
            input.placeholder = this.getAttribute('title');
        } else {
            input.placeholder = "Buscar por:";
        }

        this.append(input);
    }
}

customElements.define('custom-input', customInputElement);

function localStringToNumber(s) {
    return Number(String(s).replace(/[^0-9.-]+/g,""));
}