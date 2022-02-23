import Factory from './pages/PageFactory.js';

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
        let type = opt.getAttribute('custom-type'); 
        const crud = url + "-" + type;

        let section = document.createElement('div');
        section.id = "section-custom-view";

        if (url == 'Report') {
            let sectionReport = document.createElement('div');

            if (Factory.hasPage(crud)) {
                sectionReport.appendChild(Factory.getPage(crud).getReport());
            }

            section.appendChild(sectionReport);
        } else {
            let sectionHeader = document.createElement('div');
            sectionHeader.id = "section-custom-header";
            
            if (Factory.hasPage(crud)) {
                sectionHeader.appendChild(Factory.getPage(crud).getHeader());
            }
            section.appendChild(sectionHeader);
    
            let sectionMain = document.createElement('div');
            sectionMain.id = "section-custom-main";
            
            if (Factory.hasPage(crud)) {
                sectionMain.appendChild(Factory.getPage(crud).getGrid());
            }
            section.appendChild(sectionMain);
        }

        this.append(section);
    }

}

customElements.define("custom-container-view", customContainerVIEWElement);