import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {APIUtils, APIStatusEnum} from '../utils/api.utils';

//import ENV from '../environments/env.production';



export default (CONFIG:any)=>{

    const apiUtils=APIUtils(CONFIG);

    return{

        verify:(req:Request, res:Response, next:NextFunction)=>{

            const bearerHeader=req.headers['authorization'];

            if (typeof bearerHeader!=='undefined') {
                const bearer= bearerHeader.split(' ');
                const bearerToken=bearer[1];
                jwt.verify(bearerToken, CONFIG.TOKEN.SECRET_KEY, (err:any, tokenDecoded:any)=>{
                    if (err) {
                        return res.status(APIStatusEnum.Forbidden).json(
                            apiUtils.BodyResponse(APIStatusEnum.Forbidden,
                                //Descripcion
                                'Acceso prohibido al verificar el token (MiddleWare TOKENs)',
                                //Mensaje
                                'El Token proporcionado, no es un Token valido. Favor de verificarlo', 
                                //Result
                                {}, 
                                //Error
                                err)
                        )
                    }

                    req.body.authUser=tokenDecoded;

                    next();
                });

            } else {

                //Unautorized

                return res.status(APIStatusEnum.Unauthorezed).json(
                    apiUtils.BodyResponse(APIStatusEnum.Forbidden,
                        //Descripcion
                        'Acceso no autorizado (MiddleWare TOKENs)',
                        //Mensaje
                        'Necesita proporcionarun Token, para acceder a la solicitud', 
                        //Result
                        {}, 
                        //Error
                        {})
                )
                
            }

        }
    }


}

