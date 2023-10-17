import sql from "mssql";

/**
 * Clase EmployeeTypeFieldMappings
 * 
 * Esta clase define un mapeo de campos para el modelo de datos de tipo de empleado.
 */
class EmployeeTypeFieldMappings {
    /**
     * Constructor de la clase EmployeeTypeFieldMappings.
     * 
     * Define el mapeo de campos para el modelo de tipo de empleado.
     */
    constructor() {
        // Mapeo de campos para el modelo de tipo de empleado.
        this.fieldsEmployeeTypeMappings = {
            idEmployeeType: sql.Int,
            employeeType: sql.VarChar(25)
        };
    }

    /**
     * Método getMappings
     * 
     * Obtiene el mapeo de campos para el modelo de tipo de empleado.
     * @returns {object} - Un objeto que contiene el mapeo de campos.
     */
    getMappings() {
        return this.fieldsEmployeeTypeMappings;
    }
}

// Exporta una instancia única de la clase EmployeeTypeFieldMappings.
export default new EmployeeTypeFieldMappings();
