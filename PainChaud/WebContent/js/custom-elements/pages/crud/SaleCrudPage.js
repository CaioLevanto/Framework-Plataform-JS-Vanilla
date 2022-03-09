import InterfacePages from '../../interface/InterfacePages.js'; 
import Grid from '../../components/customGridResponsive.js';
import * as Function from './functions/SaleFunction.js';
import * as Field from '../../components/customFields.js';
import * as Utils from '../../Utils.js';


var vl = [ 
];

export default class SaleCrudPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Produto': [ 
            ["Leite", "0", "R$ 4,60"], 
            ["Cuca de Banana", "0", "R$ 8,50"],
            ["Cuca de Chocolate", "0", "R$ 12,00"]
        ],
        'Quantidade': 'Number,Add',
        'Comanda': 'Number,Add,Comanda',
        
        'Tipo': 'string',
        'Data da venda': 'string',
        'Valor': 'string',

        'AÃ§Ã£o': 'Action'
    }

    getFields() {
        return Field.createElementsFields({
            col: SaleCrudPage.fields, 
            hiddenField: ['Data da venda', 'Valor', 'Tipo'] //Colunas que não deve aparecer nos fields, somente visualizar na grid
        }); 
    }

    getGrid(hasSearch) {
        return this.grid.createGridElement({
            col: SaleCrudPage.fields,
            value: vl,
            hasSearch: true,
            hasHeader: true,
            fieldEdit: ["Quantidade"],
            notHeader: ['Data da venda', 'Comanda', 'Tipo'] //Colunas que não deve aparecer (manipula somente backend)
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