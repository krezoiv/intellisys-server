
import { response } from 'express';

export const login = async (req, res)=>{

    try {
        res.json({
            ok: true,
            msg: 'hola mundo'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error Inesperado, hable con el administrador'
        })
    }
}