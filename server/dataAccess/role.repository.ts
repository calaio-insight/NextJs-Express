import sql = require('mssql');
import { IHomeRoleType } from '../interfaces/homeRole.type';
var dbConfig = require("../config/dbConfig");

async function getHomePermissionsByRoleId(homeRole: IHomeRoleType) {
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("homeRoleId", sql.Int, homeRole)
            .execute("GetHomePermissionsByRoleId");
        return response.recordset;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

module.exports = {
    getHomePermissionsByRoleId,
}