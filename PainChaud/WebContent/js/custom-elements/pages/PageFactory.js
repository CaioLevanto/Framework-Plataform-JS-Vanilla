import UserPage from './UserPage.js';
import ProductPage from './ProductPage.js';

export default class PageFactory {
    
    static pages = {
        "User": UserPage,
        "Product": ProductPage
    }

    /** 
     * @param { String } pageName 
     * @returns { import('./InterfacePages').default }
     */
    static getPage(pageName) {
        return new PageFactory.pages[pageName];
    }

}