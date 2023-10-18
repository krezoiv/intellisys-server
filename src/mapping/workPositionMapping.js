import sql from "mssql";

/**
 * @class WorkPositiondMappings
 * @description Clase que define los mapeos de campos SQL para la tabla de las workPosition (cargo)
 */
class WorkPositionFieldMappings {
     /**
   * @constructor
   * @description Constructor de la clase que inicializa los mapeos de campos SQL.
   */
  constructor() {
     // Define los mapeos de campos SQL para varios campos de la tabla workPosition (cargo)
    this.fieldWorkPositionMappings = {
      idWorkposition: sql.Int,
      workPosition: sql.VarChar(50),
      idEmployeeType : sql.Int
    };
  };
  
  /**
   * @method getMappings
   * @description Método que devuelve los mapeos de campos SQL definidos en la clase.
   * @returns {Object} - Un objeto que contiene los mapeos de campos SQL.
   */
  getMappings() {
    return this.fieldWorkPositionMappings;
  };
};

// Exporta una instancia de la clase WorkPositionFieldMappings
export default new WorkPositionFieldMappings();