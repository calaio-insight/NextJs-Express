const { PORT, SQL_USER, SQL_PASS, SQL_SERVER, SQL_DB } = require('./config');

const config = {
    user: `${SQL_USER}`,
    password: `${SQL_PASS}`,
    server: `${SQL_SERVER}`,
    database: `${SQL_DB}`,
    options:{
        encrypt: true,        
    },
    port: 1433
}

module.exports = config;