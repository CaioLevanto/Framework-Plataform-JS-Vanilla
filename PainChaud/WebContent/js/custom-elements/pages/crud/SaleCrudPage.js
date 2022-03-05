import InterfacePages from '../../interface/InterfacePages.js'; 
import Grid from '../../components/customGridResponsive.js';
import * as Function from './functions/SaleFunction.js';
import * as Field from '../../components/customFields.js';
import * as Utils from '../../Utils.js';


var vl = [ 
    {
        "values": { 
            'id': 0, 
            'Produto': "Coxinha", 
            'Quantidade': "1", 
            'Valor': 'R$ 2,50',
            'Tipo': '0' 
        },
        "action": [
            "Deletar"
        ] 
    },
    {   "values": { 
            'id': 1, 
            'Produto': "Pao", 
            'Quantidade': "1", 
            'Valor': 'R$ 4,50',
            'Tipo': '1' 
        },
        "action": [
            "Deletar"
        ] 
    }
];

export default class SaleCrudPage extends InterfacePages {

    constructor() {
        super();
        
        this.grid = new Grid();
    }

    static fields = {
        'Produto': [ "Pao", "Bolacha" ],
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