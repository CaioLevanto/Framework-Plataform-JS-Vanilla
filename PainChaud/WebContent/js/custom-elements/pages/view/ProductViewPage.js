import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vlFinded = [ 
    {"values": [0, "Coxinha", "Balcao", "Unidade", "R$ 2,50" ] }
];

var vlView = [ 
    {"values": [0, "Coxinha", "Balcao", "Unidade", "R$ 2,50" ] }, 
    {"values": [1, "Pastel", "Balcao", "Unidade", "R$ 4,50" ] }, 
    {"values": [2, "Cuca", "Embalado", "Unidade", "R$ 10,00" ] },
    {"values": [3, "Pao", "Balcao", "Peso", "R$ 4,50" ] }, 
    {"values": [4, "Bolo de Fuba", "Embalado", "Unidade", "R$ 7,50" ] }
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
        'Valor': 'money'
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
        p.addEventListener('keypress', function(e) {
            $('.line-grid-custom').remove();
            //busca pelo key

            new Grid().createContainerGrid($('#container-grid')[0], vlFinded, ProductViewPage.columnsPreDefine);
        });
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