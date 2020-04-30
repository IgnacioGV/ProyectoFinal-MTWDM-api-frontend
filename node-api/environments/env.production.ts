export default {
    API: {
        NAME: 'Micro-Servicio Punto de Venta | NodeJS',
        PORT: 5000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRET_KEY:'mtwdm_j.ignaciogv_2020',
        EXPIRES: '120s'    // 2 min
    },
    MONGODB: {
        HOST: '127.0.0.1',
        //HOST: 'api.midominio.com',
        PORT: 27017,
        USER_NAME: 'dbo-operador',
        USER_PASSWORD: 'operador123',
        DEFAULT_DATABASE: 'dbMTWDM'
    }
};