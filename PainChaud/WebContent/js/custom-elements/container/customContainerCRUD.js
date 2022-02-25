import Factory from '../interface/PageFactory.js';

class customContainerCRUDElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let opt = $('.custom-option.selected')[0];
        let url = opt.getAttribute('url');
        let type = opt.getAttribute('custom-type');
        const crud = url + "-" + type;

        let section = document.createElement('div');
        section.id = "section-custom-element";

        section.appendChild(this._createField(crud));
        section.appendChild(this._createBorder());
        section.appendChild(this._createGrid(crud));

        this.setAttribute('class', 'container');
        this.setAttribute('type', 'crud');
        this.append(section);
    }

    _createField(crud) {
        let sectionLeft = document.createElement('div');
        sectionLeft.className = "section-custom-left";
        
        if (Factory.hasPage(crud)) {
            sectionLeft.appendChild(Factory.getPage(crud).getFields());
        }
        return sectionLeft;
    }

    _createBorder() {
        let border = document.createElement('div');
        border.className = "border-custom";
        return border;
    }

    _createGrid(crud) {
        let sectionRight = document.createElement('div');
        sectionRight.className = "section-custom-right";
        
        if (Factory.hasPage(crud)) {
            sectionRight.appendChild(Factory.getPage(crud).getGrid());
        }
        return sectionRight;
    }

}

customElements.define("custom-container-crud", customContainerCRUDElement);