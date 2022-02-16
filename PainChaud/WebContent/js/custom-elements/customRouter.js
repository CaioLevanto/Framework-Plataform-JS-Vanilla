class customRouterElement extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        this.createValues()
    }

    createValues() {
        
    }
}

customElements.define('custom-router', customRouterElement);