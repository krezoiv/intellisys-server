
class MunicipalityModel {
    constructor({
        idMunicipality,
        idDepartment,
        municipality
    }){
        Object.assign(this, {
            idMunicipality,
            idDepartment,
            municipality
        });
    }
}

export default MunicipalityModel;