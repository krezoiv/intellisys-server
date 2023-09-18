/**
 * @constant employees_queries
 * @description Contiene consultas SQL para interactuar con la tabla de empleados en la base de datos.
 */
export const employees_queries = {
    /**
     * @property {string} getEmployees
     * Consulta SQL para obtener la lista de todos los empleados.
     */
    getEmployees: 'EXEC spSeleccionarEmpleados;',
  
    /**
     * @property {string} addNewEmployee
     * Consulta SQL para agregar un nuevo empleado a la base de datos.
     * Utiliza parámetros: @codigo, @primerNombre, @segundoNombre, @primerApellido, @segundoApellido, @fechaAlta, @idSede, @idTipoEmpleado, @idStatus, @idCargo.
     */
    addNewEmployee: 'EXEC spAgregarEmpleado ' +
      '@codigo, @primerNombre, @segundoNombre, ' +
      '@primerApellido, @segundoApellido, ' +
      '@fechaAlta, @idSede, @idTipoEmpleado, ' +
      '@idStatus, @idCargo',
  
    /**
     * @property {string} getEmployeeById
     * Consulta SQL para buscar un empleado por su código.
     * Utiliza un parámetro: @codigo.
     */
    getEmployeeById: 'EXEC BuscarEmpleadoPorCodigo @codigo'
  };
  