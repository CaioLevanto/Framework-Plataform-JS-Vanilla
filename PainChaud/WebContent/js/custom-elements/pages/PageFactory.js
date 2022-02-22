import UserPage from './UserPage.js';
import ProductPage from './ProductPage.js';
import ReportPage from './ReportPages.js';

export default class PageFactory {
    
    static pages = {
        "User": UserPage,
        "Product": ProductPage,
        "Report": ReportPage
    }

    /** 
     * @param { String } pageName 
     * @returns { import('./InterfacePages').default }
     */
    static getPage(pageName) {
        return new PageFactory.pages[pageName];
    }

}