import * as Action from './customActionForm.js';
import { formatCharacters, validateFields } from '../Utils.js';

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
            const type = this.getAttribute('type').split(',');

            switch (type[0]) {
                case 'custom': 
                    this.typeCustomInput();
                break;

                case 'search':
                    this.typeCustomSearch();
                break;

                default:
                    this.typeCustomInput(type);
                break;
            }
        }
    }

    typeCustomInput(hasType) {
        if (!this.hasAttribute('label') || this.getAttribute('label') != "") {
            let label = document.createElement('label');
            label.textContent = this.title;
            label.className = 'custom-label';
            this.append(label);
        }

        let input = document.createElement('input');
        input.setAttribute('autocomplete','off');
        
        if (this.hasAttribute('placeholder')) {
            input.placeholder = this.getAttribute('placeholder');
        }
        if (this.value) {
            input.value = this.value;
        }

        let addBtn;
        for (let i in hasType) {

            switch (hasType[i].toLowerCase()) {
                case 'date':
                    input.setAttribute("type", hasType[i]);
                    input.setAttribute('min', this.getAttribute('min'));
                    input.setAttribute('max', this.getAttribute('max'));
                break;

                case 'money':
                    input.setAttribute("type", hasType[i]);
                    input.onblur = function (e) {
                        // let number = Number.parseInt(e.target.value);
        
                        // e.target.value = new Intl.NumberFormat('ja-JP',  {
                        //     style: 'currency',
                        //     currency: 'BRL',
                        // }).format(number);
                    }
                break;

                case 'number':
                    input.setAttribute("type", hasType[i]);
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
                break;

                case 'add':
                    addBtn = document.createElement('custom-button');
                    addBtn.id = 'btn-add-' + this.id;
                    addBtn.setAttribute('icon', 'fa-solid fa-plus');

                    if (this.id == 'comanda') {
                        addBtn.addEventListener('click', () => { alert('oi') });
                    } else {
                        addBtn.addEventListener('click', function() {
                            if (validateFields(true)) {
                                let container = $("#section-custom-right #container-grid")[0];
        
                                let form = document.forms['form'];
                                let action = ["Deletar"];
                                let item = Action.addItemGrid(form, action);
        
                                container.append(item);
        
                                document.forms['form'].reset();
                            }

                            $('#custom-search-header').val('');
                            $('.line-grid-custom.hidden').removeClass('hidden');
                        });
                    }
                break;
                
                default:
                    break;
            }
        }

        input.className = "custom-input-" + this.id;
        input.name = formatCharacters(this.title);
        this.append(input);

        if (addBtn) {
            this.append(addBtn);
        }
    }

    typeCustomSearch() {
        let input = document.createElement('input');
        
        if (this.id) {
            input.id = 'custom-' + this.id;
        } else {
            input.id = "custom-input-search";
        }

        if (this.hasAttribute('title')) {
            input.placeholder = this.getAttribute('title');
        } else {
            input.placeholder = "Buscar por:";
        }

        this.append(input);
    }
}

customElements.define('custom-input', customInputElement);