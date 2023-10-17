  /**
 * @constant workPosition_queries
 * @description Contiene consultas SQL para interactuar con la tabla de workPosition en la base de datos.
 */
  export const workPosition_queries = {
    /**
   * @property {string} getListWorkPosition
   * Consulta SQL para obtener la lista de todos los cargos de trabajo.
   */
  getListWorkPosition :  'EXEC StoredProcedure_GetWorkPosition ;',
  getWorkPositionByEmployee : 'EXEC StoredProcedure_GetWorkPositionByEmployeesType @idEmployeeType ;'
}