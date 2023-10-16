/**
 * Clase CampusModel
 * 
 * Esta clase representa un modelo de datos para un campus.
 * Puede utilizarse como una plantilla base para representar información relacionada con campus.
 */
class CampusModel {
    // El constructor de la clase CampusModel toma un objeto como argumento
    // que contiene las propiedades idCampus y campusName.
    constructor({
        idCampus,
        campusName
    }){
        // Utilizamos Object.assign para asignar las propiedades del objeto argumento
        // a las propiedades de la instancia de la clase CampusModel.
        Object.assign(this,{
            idCampus,
            campusName
        });
    }
}

// Exportamos la clase CampusModel como un módulo.
export default CampusModel;
