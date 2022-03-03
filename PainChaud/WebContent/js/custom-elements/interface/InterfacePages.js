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

    _isDelete(id) {
        throw new Error('Not implemented function Delete by option');
    }

    _isUpdate(obj) {
        throw new Error('Not implemented function Update by option');
    }

    _findById(id) {
        throw new Error('Not implemented function Find by Id');
    }

};