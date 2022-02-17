var test = '[{"name": "usuario", "icon": "fa-solid fa-user-plus", "url": "index.html"}, {"name": "produtos", "icon": "fa-solid fa-cart-plus", "url": "index.html"}, {"name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout"}]';

class customRouterElement extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        this.createValues(JSON.parse(test));
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
        let action = attr['action']
        let name = attr['name'];
        let icon = attr['icon'];
        let url = attr['url'];
        
        
        if (action) {
            className += ' logout';
        }
        option.className = className;
        option.id = i;
        
        if (name) {
            option.title = name;
        }
        if (url) {
            option.setAttribute('url', url);
        }

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
            if (removeSelected(this))
                this.classList.add("selected");
        };

        option.appendChild(expandName);
        this.append(option);
    }
}

customElements.define('custom-router', customRouterElement);

function removeSelected(obj) {
    let opt = $(".custom-option");
    let isSelected = true;
    
    opt.get().forEach(list => {
        let listClass = list.classList;

        if (listClass.contains("selected")) {
            if (obj.id == list.id) {
                isSelected = false;
            }

            listClass.remove("selected");
        }
    });

    return isSelected;
}