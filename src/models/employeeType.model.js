

/**
 * Clase EmployeeTypeModel
 * 
 * Esta clase representa un modelo de datos para un tipo de empleado.
 */
class EmployeeTypeModel {
    // El constructor de la clase tipo de empleado  toma un objeto como argumento
    // que contiene las propiedades proporcionadas dentro del constructror
    constructor({
        idEmployeeType,
        employeeType
    }){
        // Utilizamos Object.assign para asignar las propiedades del objeto argumento
        // a las propiedades de la instancia de la clase EmployeeTypeModel.
        Object.assign(this,{
            idEmployeeType,
            employeeType,
        });
    }
}

// Exportamos la WorkPositionModel como un módulo.
export default EmployeeTypeModel;