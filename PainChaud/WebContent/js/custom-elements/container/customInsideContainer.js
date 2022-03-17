import Factory from '../interface/PageFactory.js';

class customContainerVIEWElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let opt = $('.custom-option.selected')[0];
        let url = opt.getAttribute('url');
        const crud = url + "-" + "crud";

        let section = document.createElement('div');
        section.id = "section-custom-element";

        section.appendChild(this.createField(crud, this.getAttribute('return')));
        section.appendChild(this.createBorder());
        section.appendChild(this.createGrid(crud));

        this.append(section);
    }

    createField(crud, hasReturn) {
        let sectionLeft = document.createElement('div');
        sectionLeft.id = "section-custom-left";
        
        if (Factory.hasPage(crud)) {
            sectionLeft.appendChild(Factory.getPage(crud).getFields(hasReturn ? (hasReturn == 'true') : false));
        }
        return sectionLeft;
    }

    createBorder() {
        let border = document.createElement('div');
        border.className = "border-custom";
        return border;
    }

    createGrid(crud) {
        let sectionRight = document.createElement('div');
        sectionRight.id = "section-custom-right";
        
        if (Factory.hasPage(crud)) {
            sectionRight.appendChild(Factory.getPage(crud).getGrid());
        }
        return sectionRight;
    }

}

customElements.define("custom-inside-crud", customContainerVIEWElement);