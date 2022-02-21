import Factory from './pages/PageFactory.js';

class customContainerVIEWElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let section = document.createElement('div');
        section.id = "section-custom-view";

        let sectionHeader = document.createElement('div');
        sectionHeader.id = "section-custom-header";

        sectionHeader.appendChild(Factory.getPage('Product').getHeader());
        section.appendChild(sectionHeader);

        let sectionBorder = document.createElement('div');
        sectionBorder.id = "section-custom-border";
        section.appendChild(sectionBorder);

        let sectionMain = document.createElement('div');
        sectionMain.id = "section-custom-main";

        sectionMain.appendChild(Factory.getPage('Product').getGrid());
        section.appendChild(sectionMain);

        this.append(section);
    }

}

customElements.define("custom-container-view", customContainerVIEWElement);