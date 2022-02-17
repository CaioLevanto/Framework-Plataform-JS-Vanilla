class customContainerVIEWElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createElement();
    }

    createElement() {
        let section = document.createElement('div');
        section.className = "section-custom-view";

        let sectionLeft = document.createElement('div');
        sectionLeft.className = "section-custom-header";
        section.appendChild(sectionLeft);

        let sectionRight = document.createElement('div');
        sectionRight.className = "section-custom-main";
        section.appendChild(sectionRight);

        this.append(section);
    }

}

customElements.define("custom-container-view", customContainerVIEWElement);