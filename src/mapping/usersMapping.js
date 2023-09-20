import { sql } from "../database";

class UsersFieldMapping {

    constructor(){
        this.fieldMappings = {
            idUsuario: sql.Int,
            codigo: sql.VarChar(15),
            usuario: sql.VarChar(10),
            password: sql.VarChar(100),
            idRol: sql.Int,
            idStatus: sql.Int,
        };
    };

    getMappings(){
        return this.fieldMappings;
    }
}

export default new UsersFieldMapping();

