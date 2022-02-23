import UserPage from './UserPage.js';
import ProductCrudPage from './ProductCrudPage.js';
import ProductViewPage from './ProductViewPage.js';
import ReportPage from './ReportPages.js';
import SaleCrudPage from './SaleCrudPage.js';
import SaleViewPage from './SaleViewPage.js';
import ComandaPage from './ComandaPage.js';

export default class PageFactory {
    
    static pages = {
        "User-crud": UserPage,
        "Sale-crud": SaleCrudPage,
        "Sale-view": SaleViewPage,
        "Product-crud": ProductCrudPage,
        "Product-view": ProductViewPage,
        "Report-view": ReportPage,
        "Comanda-crud": ComandaPage
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