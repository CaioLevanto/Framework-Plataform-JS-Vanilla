import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vl = [ 
    {"values": [0, "1" ],"action": ["Editar"] }, 
    {"values": [1, "2" ], "action": ["Editar"] }, 
    {"values": [2, "3" ], "action": ["Editar"] },
    {"values": [3, "4" ],"action": ["Editar"] }, 
    {"values": [4, "5" ], "action": ["Editar"] }
];

export default class ComandaViewPage extends InterfacePages {
    
    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Identificacao da comanda': 'string',
        'Ação': 'Action'
    }

    getHeader() {
        let headerSearch = document.createElement('div');
        headerSearch.id = 'header-container-search';

        let btnNew = document.createElement('custom-button');
        btnNew.id = 'new-comanda';
        btnNew.title = "Nova comanda";

        return headerSearch.appendChild(btnNew);
    }

    getGrid() {
        return this.grid.createGridElement({
           col: ComandaViewPage.fields, 
           value: vl, 
           hasSearch: false, 
           hasHeader: true
        });
    }

};