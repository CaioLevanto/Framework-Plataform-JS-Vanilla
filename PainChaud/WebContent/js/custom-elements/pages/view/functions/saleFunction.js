import { doAjax } from '../../../Utils.js';
const pathName = 'sale';

export function getHeaderView() {
    const d = new Date();

    let mounth = (d.getMonth() + 1);
    let mounthFormat = ((mounth < 10) ? "0" + mounth : mounth);

    let betweenDate = document.createElement('div');
    betweenDate.id = 'header-container-dates';

    //Data inicial
    let initial = document.createElement('custom-input');
    initial.setAttribute('type', 'date');
    initial.title = 'Data inicial:';
    initial.id = 'date-initial';
    initial.setAttribute('min', '2022-01-10'); //colocar a data mais antiga registrada no banco (min)

    initial.setAttribute('max', d.getFullYear() + "-" + mounthFormat + "-" + d.getDate());
    betweenDate.appendChild(initial); //colocar a data mais nova registrada no banco (max)

    //Data final
    let end = document.createElement('custom-input');
    end.setAttribute('type', 'date');
    end.title = 'Data Final:';
    end.id = 'date-final';
    
    end.setAttribute('min', '2022-01-10');

    end.setAttribute('max', d.getFullYear() + "-" + mounthFormat + "-" + d.getDate());
    betweenDate.appendChild(end);

    return betweenDate;
}

export function findAll(id) {
    return [ 
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
}

export function findAllInside(id) {
    return [ 
        {
            "values": { 
                'id': 0, 
                'Produto': "Coxinha", 
                'Quantidade': "1",
                'Valor': 'R$ 2,50' 
            },
            "action": [
                "Deletar"
            ]
        },
        {
            "values": { 
                'id': 1, 
                'Produto': "Pao", 
                'Quantidade': "1",
                'Valor': 'R$ 2,50' 
            },
            "action": [
                "Deletar"
            ]
        }
    ];
}

export function isDelete(id) {
    return true;
}

export function isUpdate(obj) {
    return true;
}

export function findById(id) {
    return true;
}

export function findSearch(value, column) {
    return true;
}