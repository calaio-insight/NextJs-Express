import sql = require('mssql');
import { IUser } from '../interfaces/user.interface';
var dbConfig = require("../config/dbConfig");


async function getUserByEmail(email: string){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("userEmail", sql.NVarChar(250), email)
            .execute("GetUserByEmail");
        return response.recordset[0];
    }
    catch(error){
        console.log(error);
    }
}

async function getUserById(userId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("userId", sql.Int, userId)
            .execute("GetUserById");
        return response.recordset[0];
    }
    catch(error){
        console.log(error);
    }
}

async function insertUser(user: IUser){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("email", sql.NVarChar(250), user.email)
            .input("firstName", sql.NVarChar(250), user.firstName)
            .input("lastName", sql.NVarChar(250), user.lastName)
            .input("displayName", sql.NVarChar(250), user.displayName)
            .input("photoUrl", sql.NVarChar(250), user.photoUrl)
            .output("newId", sql.Int)
            .execute("InsertUser");
        return response.output.newId;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    insertUser
}