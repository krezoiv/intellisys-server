import sql from 'mssql';

/**
 * @class EmployeesFieldMappings
 * @description Clase que define los mapeos de campos SQL para la tabla de empleados.
 */
class EmployeesFieldMappings {
  /**
   * @constructor
   * @description Constructor de la clase que inicializa los mapeos de campos SQL.
   */
  constructor() {
    // Define los mapeos de campos SQL para varios campos de la tabla de empleados
    this.fieldMappings = {
      
      code : sql.VarChar(15),
      firstName : sql.VarChar(50),
      secondName : sql.VarChar(50),
      firstLastName : sql.VarChar(50),
      secondLastName: sql.VarChar(50),
      hireDate : sql.Date,
      hireEndDate : sql.Date,
      idCampus : sql.VarChar(3),
      idStatus: sql.Int,
      idWorkposition : sql.Int,
      idMunicipality : sql.Int,
      addressReference : sql.VarChar(200),
      BACaccount : sql.BigInt,
      BAMaccount : sql.BigInt,
      dpi : sql.BigInt
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
export default new EmployeesFieldMappings();
