import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vlView = [ 
    {
        "values": { 
            'id': 0, 
            'Data da venda': "10/10/2022", 
            'Valor total': "R$ 18,90"
        },
        'action': [
            "Visualizar"
        ]
    },
    {
        "values": { 
            'id': 1, 
            'Data da venda': "11/10/2022", 
            'Valor total': "R$ 29,90"
        },
        'action': [
            "Visualizar"
        ]
    }
];

export default class SaleViewPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fieldView = {
        'Data da venda': 'string',
        'Valor total': 'Number',
        'Ação': 'Action'
    }

    static fieldsCrud = {
        'Produto': [ "Balcao", "Embalado" ],
        'Quantidade': 'Number',
        'Comanda': 'Number',

        'Data da venda': 'string',
        'Valor': 'string',

        'Ação': 'Action'
    }

    getHeader() {
        const d = new Date();

        let betweenDate = document.createElement('div');
        betweenDate.id = 'header-container-dates';

        let initial = document.createElement('custom-input');
        initial.setAttribute('type', 'date');
        initial.title = 'Data inicial:';
        initial.id = 'date-initial';
        initial.setAttribute('min', '2022-01-10');
        initial.setAttribute('max', d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate());
        betweenDate.appendChild(initial);

        let end = document.createElement('custom-input');
        end.setAttribute('type', 'date');
        end.title = 'Data Final:';
        end.id = 'date-final';
        end.setAttribute('min', '2022-01-10');
        end.setAttribute('max', d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate());
        betweenDate.appendChild(end);

        return betweenDate;
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleViewPage.fieldView,
            value: vlView,
            hasSearch: false,
            hasHeader: true,
            notHeader: ['Comanda'] //Colunas que n�o deve aparecer (manipula somente backend)
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