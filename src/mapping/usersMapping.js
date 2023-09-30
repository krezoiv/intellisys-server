import { sql } from "../database";

class UsersFieldMapping {

    constructor(){
        this.fieldMappings = {
            
            idUser: sql.Int,
            userName: sql.VarChar(20),
            password: sql.VarChar(100),
            idRole: sql.Int,
            idStatus: sql.Int,
            idEmployee: sql.Int,
        };
    };

    getMappings(){
        return this.fieldMappings;
    }
}

export default new UsersFieldMapping();

