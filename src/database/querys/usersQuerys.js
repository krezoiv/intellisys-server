

export const users_queries = {
    getUsers :'SELECT * FROM usuario;',
    userLogin : 'EXEC spBuscarUsuarioLogin @usuario, @password',
    newUser: 'EXEC spCrearUsuario @codigo, @usuario, @password, @idRol, @idStatus'
}