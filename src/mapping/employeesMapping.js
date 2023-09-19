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
    //* Define los mapeos de campos SQL para varios campos de la tabla de empleados
    this.fieldMappings = {
      codigo: sql.VarChar(15),
      primerNombre: sql.VarChar,
      segundoNombre: sql.VarChar,
      primerApellido: sql.VarChar,
      segundoApellido: sql.VarChar,
      fechaAlta: sql.Date,
      fechaBaja: sql.Date,
      idSede: sql.VarChar,
      idTipoEmpleado: sql.Int,
      idStatus: sql.Int,
      idCargo: sql.Int,
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

//* Exporta una instancia de la clase EmployeesFieldMappings
export default new EmployeesFieldMappings();
