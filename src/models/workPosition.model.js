
/**
 * Clase WorkPosistionModel
 * 
 * Esta clase representa un modelo de datos para una posición de trabajo.
 * Puede utilizarse como una plantilla base para representar información relacionada con posición de trabajo.
 */
class WorkPositionModel {
    // El constructor de la clase WorkPositionModel toma un objeto como argumento
    // que contiene las propiedades proporcionadas dentro del constructror
    constructor({
        idWorkPosition,
        workPosition,
        idEmployeeType
    }){
        // Utilizamos Object.assign para asignar las propiedades del objeto argumento
        // a las propiedades de la instancia de la clase WorkPositionModel.
        Object.assign(this,{
            idWorkPosition,
            workPosition,
            idEmployeeType,
        });
    }
}

// Exportamos la WorkPositionModel como un módulo.
export default WorkPositionModel;