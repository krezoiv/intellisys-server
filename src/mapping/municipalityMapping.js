import sql from 'mssql';


class MunicipalityFieldsMappings {
    constructor(){
        this.fieldMunicipalityMappings = {
            idMunicipality : sql.Int,
            idDepartment : sql.Int,
            municipality : sql.VarChar(30)
        };
    }

    getMappings(){
        return this.fieldMunicipalityMappings;
    }
}


export default new MunicipalityFieldsMappings();