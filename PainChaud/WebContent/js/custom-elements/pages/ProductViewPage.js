import Grid from '../customGridResponsive.js';
import * as Field from '../customFields.js';
import InterfacePages from './InterfacePages.js';
import * as Utils from '../Utils.js';


var vlView = [ 
    {"values": [0, "Coxinha", "Balcao", "Unidade", "R$ 2,50" ],"action": ["Visualizar"] }, 
    {"values": [1, "Pastel", "Balcao", "Unidade", "R$ 4,50" ], "action": ["Visualizar"] }, 
    {"values": [2, "Cuca", "Embalado", "Unidade", "R$ 10,00" ], "action": ["Visualizar"] },
    {"values": [3, "Pao", "Balcao", "Peso", "R$ 4,50" ],"action": ["Visualizar"] }, 
    {"values": [4, "Bolo de Fuba", "Embalado", "Unidade", "R$ 7,50" ], "action": ["Visualizar"] }
];

export default class ProductViewPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Nome': 'string',
        'Local': [ 'Balcao', 'Embalado' ],
        'Tipo': [ 'Unidade', 'Peso' ],
        'Valor': 'money',
        'Ação': 'Action'
    }

    getHeader() {
        let headerSearch = document.createElement('div');
        headerSearch.id = 'header-container-search';

        let byCol = document.createElement('select');
        byCol.className = 'custom-select';

        for (let row in ProductViewPage.fields) {
            if (ProductViewPage.fields[row] == 'password' || row == 'Ação') {
                continue
            }

            let option = document.createElement('option');
            option.value = row;
            option.text = row;
            byCol.appendChild(option);
        }
        headerSearch.appendChild(byCol);

        let p = document.createElement('custom-input');
        p.setAttribute('type', 'search');
        headerSearch.appendChild(p);

        return headerSearch;
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: ProductViewPage.fields,
            value: vlView, 
            hasSearch: false, 
            hasHeader: true
        });
    }

};