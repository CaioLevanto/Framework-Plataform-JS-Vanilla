export default class InterfacePages {

    getHeader() {
        throw new Error('Not implemented Header');
    }

    getFields() {
        throw new Error('Not implemented Field');
    }
    
    getFields(isReturn) {
        throw new Error('Not implemented Field');
    }

    getGrid() {
        throw new Error('Not implemented Grid');
    }

    getReport() {
        throw new Error('Not implemented Report');
    }

    isDelete(id) {
        throw new Error('Not implemented function Delete by option');
    }

    isUpdate(obj) {
        throw new Error('Not implemented function Update by option');
    }

    isInsert(obj) {
        throw new Error('Not implemented function Update by option');
    }

    findById(id) {
        throw new Error('Not implemented function Find by Id');
    }

    findSearch(value, column) {
        throw new Error('Not implemented function Find serach');
    }

};