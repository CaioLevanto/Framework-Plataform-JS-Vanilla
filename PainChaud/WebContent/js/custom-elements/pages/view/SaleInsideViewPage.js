import Grid from '../../components/customGridResponsive.js';
import InterfacePages from '../../interface/InterfacePages.js';
import * as Utils from '../../Utils.js';

var vlCrud = [ 
    {"values": [0, "10/10/2022", "R$ 18,90" ] }, 
    {"values": [1, "10/10/2022", "R$ 20,00" ] }, 
    {"values": [2, "10/10/2022", "R$ 15,00" ] },
    {"values": [3, "10/10/2022", "R$ 10,00" ] }, 
    {"values": [4, "10/10/2022", "R$ 5,90" ] }
];

export default class SaleInsideViewPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fieldsCrud = {
        'Produto': [ "Balcao", "Embalado" ],
        'Quantidade': 'Number',
        'Comanda': 'Number',

        'Data da venda': 'string',
        'Valor': 'string',

        'AÃ§Ã£o': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: SaleInsideViewPage.fieldsCrud, 
            hiddenField: ['Data da venda', 'Valor'] //Colunas que não deve aparecer nos fields, somente visualizar na grid
        }); 
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleInsideViewPage.fieldsCrud,
            value: vlCrud,
            hasSearch: false,
            hasHeader: true,
            notHeader: ['Comanda'] //Colunas que não deve aparecer (manipula somente backend)
        });
    }

};