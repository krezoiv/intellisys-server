

export const users_queries = {
    getUsers :'SELECT * FROM usuario;',
    userLogin : 'EXEC spBuscarUsuarioLogin @usuario, @password',
    newUser: 'EXEC StoredProcedure_AddUser @userName, @password, @idRole, @idStatus, @idEmployee'
}