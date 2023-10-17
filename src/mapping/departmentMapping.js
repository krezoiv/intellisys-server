import sql from 'mssql';


class DepartmentFieldsMappings {

    constructor(){
        this.fieldDepartmentMappings = {
            idDepartment : sql.Int,
            department : sql.VarChar(30),
        }
    }

    getMappings() {
        return this.fieldDepartmentMappings;
    }
}

export default new DepartmentFieldsMappings();