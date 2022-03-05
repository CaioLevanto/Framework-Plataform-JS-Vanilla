import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vlFinded = [ 
    {
        "values": { 
            'id': 0, 
            'Nome': "Coxinha", 
            'Local': "Balcao", 
            'Tipo': 'Unidade',
            'Valor': 'R$ 2,50' 
        }
    }
]

var vl = [ 
    {
        "values": { 
            'id': 0, 
            'Nome': "Coxinha", 
            'Local': "Balcao", 
            'Tipo': 'Unidade',
            'Valor': 'R$ 2,50' 
        }
    },
    {
        "values": { 
            'id': 0, 
            'Nome': "Coxinha", 
            'Local': "Balcao", 
            'Tipo': 'Unidade',
            'Valor': 'R$ 2,50' 
        }
    }
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
            value: vl, 
            hasSearch: false, 
            hasHeader: true
        });
    }

    _isDelete(id) {
        return true;
    }

    _isUpdate(obj) {
        return true;
    }

    _findById(id) {
        return true;
    }

};