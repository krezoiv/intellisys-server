

export const department_queries = {
    getListDepartments : 'EXEC StoredProcedure_GetDepartments;'
}


export const municipalities_queries = {
    getListMunicipalities : 'EXEC StoredProcedure_GetMunicipalities;',
    getMunicipalitiesListByDepartments : 'EXEC StoredProcedure_GetMunicipalitiesByDepartments @idDepartment;',
    getMunicipalityById: 'EXEC StoredProcedure_SearchMunicipalityById @idMunicipality;'
}