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
        let type = opt.getAttribute('custom-type'); 
        const crud = url + "-" + type;

        let section = document.createElement('div');
        section.id = "section-custom-view";

        if (url == 'Report') {
            section.appendChild(this._createReport(crud));
        } else {
            section.appendChild(this._createHeader(crud));
            section.appendChild(this._createGrid(crud));
        }

        this.setAttribute('class', 'container');
        this.setAttribute('type', 'view');
        this.append(section);
    }

    _createReport(crud) {
        let sectionReport = document.createElement('div');

        if (Factory.hasPage(crud)) {
            sectionReport.appendChild(Factory.getPage(crud).getReport());
        }

        return sectionReport;
    }

    _createHeader(crud) {
        let sectionHeader = document.createElement('div');
        sectionHeader.id = "section-custom-header";
        
        if (Factory.hasPage(crud)) {
            sectionHeader.appendChild(Factory.getPage(crud).getHeader());
        }
        return sectionHeader;
    }

    _createGrid(crud) {
        let sectionMain = document.createElement('div');
        sectionMain.id = "section-custom-main";
        
        if (Factory.hasPage(crud)) {
            sectionMain.appendChild(Factory.getPage(crud).getGrid());
        }
        return sectionMain;
    }

}

customElements.define("custom-container-view", customContainerVIEWElement);