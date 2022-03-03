import Factory from '../interface/PageFactory.js';
import * as Utils from '../Utils.js';

class customContainerCRUDElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        const crud = Utils.getPageSelected();

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
        sectionLeft.id = "section-custom-left";
        
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
        sectionRight.id = "section-custom-right";
        
        if (Factory.hasPage(crud)) {
            sectionRight.appendChild(Factory.getPage(crud).getGrid());
        }
        return sectionRight;
    }

}

customElements.define("custom-container-crud", customContainerCRUDElement);