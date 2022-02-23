import Factory from './pages/PageFactory.js';

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
        section.className = "section-custom-element";

        let sectionLeft = document.createElement('div');
        sectionLeft.className = "section-custom-left";
        
        if (Factory.hasPage(crud)) {
            sectionLeft.appendChild(Factory.getPage(crud).getFields());
        }
        section.appendChild(sectionLeft);

        let border = document.createElement('div');
        border.className = "border-custom";
        section.appendChild(border);
        
        let sectionRight = document.createElement('div');
        sectionRight.className = "section-custom-right";
        
        if (Factory.hasPage(crud)) {
            sectionRight.appendChild(Factory.getPage(crud).getGrid());
        }
        section.appendChild(sectionRight);

        this.append(section);
    }

}

customElements.define("custom-container-crud", customContainerCRUDElement);