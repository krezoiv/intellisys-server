/**
 * @constant employees_queries
 * @description Contiene consultas SQL para interactuar con la tabla de empleados en la base de datos.
 */
export const employees_queries = {
    /**
     * @property {string} getEmployees
     * Consulta SQL para obtener la lista de todos los empleados.
     */
    getEmployeesDetails: 'EXEC StoredProcedure_GetEmployeeDetails;',
  
    /**
     * @property {string} addNewEmployee
     * Consulta SQL para agregar un nuevo empleado a la base de datos.
     * Utiliza parámetros: @codigo, @primerNombre, @segundoNombre, @primerApellido, @segundoApellido, @fechaAlta, @idSede, @idTipoEmpleado, @idStatus, @idCargo.
     */
    addNewEmployee: 'EXEC StoredProcedure_AddNewEmployee ' +
      '@code, @firstName, @secondName, ' +
      '@firstLastName, @secondLastName, ' +
      '@hireDate, @idCampus,' +
      '@idWorkPosition, @idMunicipality, @addressReference,' +
      '@BACaccount, @BAMaccount', 
  
    /**
     * @property {string} getEmployeeById
     * Consulta SQL para buscar un empleado por su código.
     * Utiliza un parámetro: @codigo.
     */
    getEmployeeById: 'EXEC StoredProcedure_SearchEmployeeByCode @code',
    searchEmployee: 'EXEC StoredProcedure_SearchEmployee @searchTerm',
    
    updateEmployee: 'EXEC StoredProcedure_UpdateEmployee @code, @firstName, @secondName, @firstLastName, @secondLastName, @hireDate, @hireEndDate, @idCampus, @idEmployeeType, @idWorkPosition, @idMunicipality, @addressReference, @BACaccount, @BAMaccount'
 
 
  };
  


