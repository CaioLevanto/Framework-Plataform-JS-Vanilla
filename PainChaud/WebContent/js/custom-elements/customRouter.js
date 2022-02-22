var test = [
    {"name": "usuario", "icon": "fa-solid fa-user-plus", "url": "User", "type": "crud"}, 
    {"name": "produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "view"},
    {"name": "relatorio", "icon": "fa-solid fa-chart-line", "url": "Report", "type": "view"}, 
    {"name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"}
];

var test2 = [ {0:[
    {"name": "usuario", "icon": "fa-solid fa-user-plus", "url": "User", "type": "crud"}, 
    {"name": "produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "view"},
    {"name": "relatorio", "icon": "fa-solid fa-chart-line", "url": "Report", "type": "view"}, 
    {"name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"}
]}, {1: [ 
    {"name": "usuario", "icon": "fa-solid fa-user-plus", "url": "User", "type": "crud"}, 
    {"name": "produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "view"},
    {"name": "relatorio", "icon": "fa-solid fa-chart-line", "url": "Report", "type": "view"}, 
    {"name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"} 
]}, {2: [
    {"name": "usuario", "icon": "fa-solid fa-user-plus", "url": "User", "type": "crud"}, 
    {"name": "produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "view"},
    {"name": "relatorio", "icon": "fa-solid fa-chart-line", "url": "Report", "type": "view"}, 
    {"name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"}
]}];

class customRouterElement extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        this.createValues(test);
    }

    createValues(columns) {
        let i = 0;

        columns.forEach(value => {
            this.createElement(value, i++);
        });
    }

    createElement(attr, i) {
        let option = document.createElement('div');
        let className = 'custom-option';
        let customType = attr['type'];
        let action = attr['action']
        let name = attr['name'];
        let icon = attr['icon'];
        let url = attr['url'];
        
        if (action) {
            className += ' logout';
        }
        if (!i) {
            className += ' selected';
            _createContainer(attr['type'], this);
        }

        option.className = className;
        option.id = i;
        
        if (name) {
            option.title = name;
        }
        if (url) {
            option.setAttribute('url', url);
        }
        
        option.setAttribute('custom-type', customType);
        if (icon) {
            let i = document.createElement('i');
            i.className = icon;
            option.appendChild(i);
        }

        let expandName = document.createElement('div');
        expandName.className = 'expand-name';
        if (name) {
            let p = document.createElement('p');
            p.textContent = name;
            expandName.appendChild(p);
        }

        option.onclick = function() {
            if (_removeSelected())
                this.classList.add("selected");
                _createContainer(false, this);
        }

        option.appendChild(expandName);
        this.append(option);
    }
    
}

customElements.define('custom-router', customRouterElement);

function _createContainer(hasType, option) {
    if (option.hasAttribute("custom-type") || hasType) {
        if (hasType == 'close') {
            $("main >").remove();
        } else {
            $("main >").remove();
            
            $("main").append(document.createElement(
                'custom-container-' + (hasType ? hasType : option.getAttribute('custom-type'))));
        }
    }
}

function _removeSelected() {
    let opt = $(".custom-option");
    let isSelected = true;
    
    opt.get().forEach(list => {
        let listClass = list.classList;

        if (listClass.contains("selected")) {
            if (this.id == list.id) {
                isSelected = false;
            } else {
                listClass.remove("selected");
            }
        }
    });

    return isSelected;
}