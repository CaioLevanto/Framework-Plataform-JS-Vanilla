import Factory from './pages/PageFactory.js';

class customContainerVIEWElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let url = $('.custom-option.selected')[0].getAttribute('url');

        let section = document.createElement('div');
        section.id = "section-custom-view";

        if (url == 'Report') {
            let sectionReport = document.createElement('div');

            sectionReport.appendChild(Factory.getPage(url).getReport());

            section.appendChild(sectionReport);
        } else {
            let sectionHeader = document.createElement('div');
            sectionHeader.id = "section-custom-header";
    
            sectionHeader.appendChild(Factory.getPage(url).getHeader());
            section.appendChild(sectionHeader);
    
            let sectionMain = document.createElement('div');
            sectionMain.id = "section-custom-main";
    
            sectionMain.appendChild(Factory.getPage(url).getGrid());
            section.appendChild(sectionMain);
        }

        this.append(section);
    }

}

customElements.define("custom-container-view", customContainerVIEWElement);