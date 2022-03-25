import { findRoutesByUser } from './functions/routerFunction.js';

class customRouterElement extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        this.createValues(findRoutesByUser(1));
    }

    createValues(columns) {
        let id = 0;

        columns.forEach(colValue => {
            this.createElement(colValue, id++);
        });
    }

    createElement(listAttributes, id) {
        let option = document.createElement('div');
        option.className = 'custom-option';
        option.id = id;
        
        let divExpandTitle;
        
        for (let attr in listAttributes) {

            let values = listAttributes[attr];

            switch (attr) {
                case 'name':
                    option.title = values;

                    divExpandTitle = document.createElement('div');
                    divExpandTitle.className = 'expand-name';
                    
                    let titleExpand = document.createElement('p');
                    titleExpand.textContent = values;
                    divExpandTitle.appendChild(titleExpand);
                    
                    break;
                    
                case 'type':
                    option.setAttribute('custom-type', values);

                    break;

                case 'action':
                    option.className += ' logout';

                    break;

                case 'icon':
                    let iconOption = document.createElement('i');
                    iconOption.className = values;
                    option.appendChild(iconOption);

                    break;

                case 'url':
                    option.setAttribute('url', values);

                    break;

                case 'inside':
                    option.setAttribute('inside', values);

                    break;
                
                case 'save':
                    option.setAttribute('save-type', values);

                    break;

                default:
                    break;
            }
        }

        option.onclick = function() {
            if (removeSelected(this))
                this.classList.add("selected");
                createContainer(false, this);
        }

        if (divExpandTitle) {
            option.appendChild(divExpandTitle);
        }
        
        this.append(option);
    }
    
}

customElements.define('custom-router', customRouterElement);

function createContainer(hasType, option) {
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

function removeSelected(obj) {
    let opt = $(".custom-option");
    let isSelected = true;
    
    opt.get().forEach(list => {
        let listClass = list.classList;

        if (listClass.contains("selected")) {
            if (obj.id == list.id) {
                isSelected = false;
            } else {
                listClass.remove("selected");
            }
        }
    });

    return isSelected;
}