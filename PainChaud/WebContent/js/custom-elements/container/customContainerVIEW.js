import Factory from '../interface/PageFactory.js';
import * as Utils from '../Utils.js';

class customContainerVIEWElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        const view = Utils.getPageSelected();

        let section = document.createElement('div');
        section.id = "section-custom-view";

        if (view.split('-').includes('Report')) {
            section.appendChild(this._createReport(view));
        } else {
            section.appendChild(this._createHeader(view));
            section.appendChild(this._createGrid(view));
        }

        this.setAttribute('class', 'container');
        this.setAttribute('type', 'view');
        this.append(section);
    }

    _createReport(view) {
        let sectionReport = document.createElement('div');

        if (Factory.hasPage(view)) {
            sectionReport.appendChild(Factory.getPage(view).getReport());
        }

        return sectionReport;
    }

    _createHeader(view) {
        let sectionHeader = document.createElement('div');
        sectionHeader.id = "section-custom-header";
        
        if (Factory.hasPage(view)) {
            sectionHeader.appendChild(Factory.getPage(view).getHeader());
        }
        return sectionHeader;
    }

    _createGrid(view) {
        let sectionMain = document.createElement('div');
        sectionMain.id = "section-custom-main";
        
        if (Factory.hasPage(view)) {
            sectionMain.appendChild(Factory.getPage(view).getGrid());
        }
        return sectionMain;
    }

}

customElements.define("custom-container-view", customContainerVIEWElement);