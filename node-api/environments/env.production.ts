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
        EXPIRES: '5min'    // 2 min
    },
    MONGODB: {
        //HOST: '127.0.0.1',
        HOST: '192.168.42.129',
        PORT: 27017,
        USER_NAME: 'dbo-operador',
        USER_PASSWORD: 'operador123',
        DEFAULT_DATABASE: 'dbMTWDM'
    }
};