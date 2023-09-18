

export const employees_queries = {
    getEmployees: 'EXEC spSeleccionarEmpleados;',
    addNewEmployee: 'EXEC spAgregarEmpleado ' +
    '@codigo, @primerNombre, @segundoNombre, ' +
    '@primerApellido, @segundoApellido, ' +
    '@fechaAlta, @idSede, @idTipoEmpleado, ' +
    '@idStatus, @idCargo',
    getEmployeeById: 'EXEC BuscarEmpleadoPorCodigo @Codigo = '
}