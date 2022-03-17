var routes = [ [
    //Administrador
    {
        "name": "Usuarios", "icon": "fa-solid fa-user-plus", "url": "User", "type": "crud"}, 
    {
        "name": "Vendas", "icon": "fa-solid fa-cash-register", "url": "Sale", "inside": "crud", "type": "view"},
    {
        "name": "Produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "crud"},
    {
        "name": "Retatorio", "icon": "fa-solid fa-chart-line", "url": "Report", "type": "view"}, 
    {
        "name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"}
], [ 
    //Caixa
    {
        "name": "Venda", "icon": "fa-solid fa-user-plus", "url": "Sale", "type": "crud"}, 
    {
        "name": "Produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "view"},
    {
        "name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"} 
], [
    //Balcão
    {
        "name": "Comanda", "icon": "fa-solid fa-user-plus", "url": "Comanda", "inside": "crud", "type": "view"}, 
    {
        "name": "Produtos", "icon": "fa-solid fa-cart-plus", "url": "Product", "type": "view"},
    {
        "name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"}
], [
    //Caso não haja permissão
    {"name": "Sair", "icon": "fa-solid fa-right-from-bracket", "action": "logout", "type": "close"}
] ];


export function findRoutesByUser(userId) {
    return routes[userId];
}