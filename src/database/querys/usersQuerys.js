

export const users_queries = {
    getUsers :'SELECT * FROM users;',
    userLogin : 'EXEC spBuscarUsuarioLogin @usuario, @password',
    newUser: 'StoredProcedure_AddNewUser @userName, @password, @idRole, @idStatus, @idEmployee, @userCode'
}