const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

export const  generateJWT = (userId) => {

    return new Promise( ( resolve, reject )=>{

        const payload ={
            userId,
            usuario
        };
        
        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        }, (err, token ) => {
            if(err){
                console.log(err); 
                reject('No se pudo generar el JWT')
            }else{
                resolve(token)
            }
        }); 

    });

}