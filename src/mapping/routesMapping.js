import sql from "mssql";

/**
 * @class WorkPositiondMappings
 * @description Clase que define los mapeos de campos SQL para la tabla de las workPosition (cargo)
 */
class RoutesFieldsMappings {
     /**
   * @constructor
   * @description Constructor de la clase que inicializa los mapeos de campos SQL.
   */
  constructor() {
     // Define los mapeos de campos SQL para varios campos de la tabla workPosition (cargo)
    this.fieldsRoutesMappings = {
      idRoute: sql.Int,
      routeName: sql.VarChar(50),
      idCampus : sql.VarChar(3),
    };
  };
  
  /**
   * @method getMappings
   * @description Método que devuelve los mapeos de campos SQL definidos en la clase.
   * @returns {Object} - Un objeto que contiene los mapeos de campos SQL.
   */
  getMappings() {
    return this.fieldsRoutesMappings;
  };
};

// Exporta una instancia de la clase WorkPositionFieldMappings
export default new RoutesFieldsMappings();