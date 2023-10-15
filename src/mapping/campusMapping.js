import sql from 'mssql';

/**
 * @class CampusFieldMappings
 * @description Clase que define los mapeos de campos SQL para la tabla de las campus (sedes).
 */
class CampusFieldMappings {
  /**
   * @constructor
   * @description Constructor de la clase que inicializa los mapeos de campos SQL.
   */
  constructor() {
    // Define los mapeos de campos SQL para varios campos de la tabla de campus (sedes)
    this.fieldCampusMappings = {
      
      idCampus : sql.VarChar(3),
      campusName : sql.VarChar(25),

    };
  }

  /**
   * @method getMappings
   * @description Método que devuelve los mapeos de campos SQL definidos en la clase.
   * @returns {Object} - Un objeto que contiene los mapeos de campos SQL.
   */
  getMappings() {
    return this.fieldCampusMappings;
  }
}

// Exporta una instancia de la clase CampusFieldMappings
export default new CampusFieldMappings();
