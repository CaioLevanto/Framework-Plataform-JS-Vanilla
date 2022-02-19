import * as User from './pages/userPage.js';

const typePage = {
    "user": {1: User.getFields(), 2: User.getGrid()}
}

class customContainerCRUDElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let section = document.createElement('div');
        section.className = "section-custom-element";

        let sectionLeft = document.createElement('div');
        sectionLeft.className = "section-custom-left";
        
        sectionLeft.appendChild(typePage['user'][1]);
        section.appendChild(sectionLeft);

        let border = document.createElement('div');
        border.className = "border-custom";
        section.appendChild(border);
        
        let sectionRight = document.createElement('div');
        sectionRight.className = "section-custom-right";
        
        sectionRight.appendChild(typePage['user'][2]);
        section.appendChild(sectionRight);

        this.append(section);
    }

}

customElements.define("custom-container-crud", customContainerCRUDElement);