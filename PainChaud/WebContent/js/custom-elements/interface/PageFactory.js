import UserPage from '../pages/crud/UserCrudPage.js';
import ProductCrudPage from '../pages/crud/ProductCrudPage.js';
import ProductViewPage from '../pages/view/ProductViewPage.js';
import ReportPage from '../pages/view/ReportPages.js';
import SaleCrudPage from '../pages/crud/SaleCrudPage.js';
import SaleViewPage from '../pages/view/SaleViewPage.js';
import SaleInsideViewPage from '../pages/view/SaleInsideViewPage.js';
import ComandaCrudPage from '../pages/crud/ComandaCrudPage.js';
import ComandaViewPage from '../pages/view/ComandaViewPage.js';

export default class PageFactory {
    
    static pages = {
        "User-crud": UserPage,
        "Sale-crud": SaleCrudPage,
        "Sale-view": SaleViewPage,
        "Product-crud": ProductCrudPage,
        "Product-view": ProductViewPage,
        "Report-view": ReportPage,
        "Comanda-crud": ComandaCrudPage,
        "Comanda-view": ComandaViewPage,
        'Sale-inside': SaleInsideViewPage
    }

    /** 
     * @param { String } pageName 
     * @returns { import('./InterfacePages').default }
     */
    static getPage(pageName) {
        return new PageFactory.pages[pageName];
    }

    static hasPage(pageName) {
        return (PageFactory.pages[pageName] != null);
    }

}