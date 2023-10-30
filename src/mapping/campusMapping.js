import sql from 'mssql';

/**
 * @class EmployeesFieldMappings
 * @description Clase que define los mapeos de campos SQL para la tabla de empleados.
 */
class CampusFieldMappings {
  /**
   * @constructor
   * @description Constructor de la clase que inicializa los mapeos de campos SQL.
   */
  constructor() {
    // Define los mapeos de campos SQL para varios campos de la tabla de empleados
    this.fieldMappings = {
      
      idCampus : sql.VarChar(3),
      campusName : sql.VarChar(25),
      idMunicipality : sql.Int
    };
  }

  /**
   * @method getMappings
   * @description Método que devuelve los mapeos de campos SQL definidos en la clase.
   * @returns {Object} - Un objeto que contiene los mapeos de campos SQL.
   */
  getMappings() {
    return this.fieldMappings;
  }
}

// Exporta una instancia de la clase EmployeesFieldMappings
export default new CampusFieldMappings();
