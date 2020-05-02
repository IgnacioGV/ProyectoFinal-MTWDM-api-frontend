//Express Imports
import Express from 'express';
import {Request, Response} from 'express';
//Debugs and Color imports
import {DEBUG, COLOR} from './utils/debug';

//API Utils Import

import {APIUtils, APIStatusEnum} from './utils/api.utils'

//Jsonwebtokens import

import jwt from 'jsonwebtoken';

//Acceso a las variables de entorno
import ENV from './environments/env.production'

//JSON Web Token Middleware

import AuthToken from './middlewares/token.middleware';

const token=AuthToken(ENV);

//MongoDB Helper import

import MongoDBHelper from './helpers/mongodb.helper';
import MongoDBClient from 'mongodb';


//Enviroments 

/*
const env={
    PORT: process.env.PORT || 5000,
    NAME: process.env.NAME || 'Micro-Servicio Punto de Venta | NodeJS',
    ENVIRONMENT: process.env.ENVIRONMENT || 'Development'
};*/

//Variables de declaracion

const debug=DEBUG();
const color=COLOR();
const app = Express();
const apiutils=APIUtils(ENV);
const mongodb=MongoDBHelper.getInstance(ENV);

app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(function(req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "http://app.midominio.com"); 
    //res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//el primer parametro '/' es la ruta despues del localhost:3000 


app.post('/login', (req:Request, res:Response)=>{

    const {userName, password}=req.body;

    const mockuser={
        fullName:'Jose Ignacio García Velázquez',
        userName:'ignaciogv',
        password:'123456',
        email:'j.ignaciogv@gmail.com'
    };

    const mokcRoles=['Captura_Rol', 'Admon_Catalags_Rol', 'Print_Rol' ];

    //const secretKey='mtwdm_j.ignaciogv_2020';

    //Validar usuario y contraseña

    if (userName==mockuser.userName&&password==mockuser.password) {
        
        //construccion de Payload
        const payload={
        fullName:mockuser.fullName,
        userName:mockuser.userName,
        email:mockuser.email,
        roles:mokcRoles
        }

        //Generar el Token para ese usuario

        jwt.sign(payload, ENV.TOKEN.SECRET_KEY, {expiresIn:ENV.TOKEN.EXPIRES}, (err,token)=>{

            //Existe Error
            if (err) {
               return res.status(500).json(

                    apiutils.BodyResponse(APIStatusEnum.Internal_Server_Error,'Internal Server Error','Error al intentar crear el Token',null, err)
                )
            }
            //Creacion Exitosa
            return res.status(200).json(

                apiutils.BodyResponse(APIStatusEnum.Success,'OK','Token generado de forma correcta',{userName:mockuser.userName,token}, null)

            )
        })
    }else{

       return res.status(403).json(

            apiutils.BodyResponse(
                APIStatusEnum.Forbidden, 
                'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para realizarla. ', 
                'Credenciales Invalidad. El usuario y/o contraseña proporciondos son incorrectos. Favor de verificarlos',
                {msg:'Invalid Credentials'}, 
                null
                )
        )

    }

});
//Get Products
app.get('/products', token.verify,async(req: Request, res: Response)=>{

   const products=await mongodb.db.collection('cars').find({}).toArray();
   console.log('API-Productos', products);

    res.status(200).json(
       apiutils.BodyResponse(
           APIStatusEnum.Success, 'OK', 'La solicitud ha teido exito',
           { 
           products,
           authUser:req.body.authUser
           }
       )
    );
});
//Get Product by Id
app.get('/product/:id', token.verify,async(req: Request, res: Response)=>{

    const {id} =req.params;
    const _id=new MongoDBClient.ObjectID(id);

    const products=await mongodb.db.collection('cars').find({_id}).toArray();
    console.log('API-Productos', products);
 
     res.status(200).json(
        apiutils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha teido exito',
            { 
            products,
            authUser:req.body.authUser
            }
        )
     );
 });

//Get Categories
 app.get('/categories/:name',token.verify,async(req: Request, res: Response)=>{

    const {name} =req.params;
   
    const category=await mongodb.db.collection('cars').find({'categoria': { $regex: name.toLowerCase(), '$options':'i' } }).toArray();
    //db.collection.find({name:{'$regex' : 'string', '$options' : 'i'}})
    console.log('API-Productos', category);
     
     res.status(200).json(
        apiutils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha teido exito',
            { 
            category,
            authUser:req.body.authUser
            }
        )
     );
 });

//Get Products by name throught search
 app.get('/search/:name', token.verify,async(req: Request, res: Response)=>{

    const {name} =req.params;
   
    const product=await mongodb.db.collection('cars').find({'descripcion':  { $regex : name.toLowerCase(), '$options':'i'}  }).toArray();
    console.log('API-Productos', product);
 
     res.status(200).json(
        apiutils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha teido exito',
            { 
            product,
            authUser:req.body.authUser
            }
        )
     );
 });

//Start Express Service
app.listen(ENV.API.PORT, async()=>{
    //Conectando con MongoDB
    try {
       await mongodb.connect();
    } catch (error) {
        process.exit();
    }
    
    debug.express(`El servidor ${color.express('Express')} se inicio ${color.success('correctamente')} en el puerto ${color.info(ENV.API.PORT)}`);
});