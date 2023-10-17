  /**
 * @constant employeesType_queries
 * @description Contiene consultas SQL para interactuar con la tabla de workPosition en la base de datos.
 */
  export const employeesType_queries = {
    /**
   * @property {string} getListEmployeeType
   * Consulta SQL para obtener la lista de todos los tipo de empleado.
   */
    getListEmployeeType :  'EXEC StoredProcedure_GetEmployeeType ;'
}