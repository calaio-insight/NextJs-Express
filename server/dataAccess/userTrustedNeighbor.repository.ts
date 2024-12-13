import sql = require('mssql');
import { IUserTrustedNeighbor } from '../interfaces/userTrustedNeighbor.interface';
var dbConfig = require("../config/dbConfig");

async function getUserTrustedNeighborsByUserId(userId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("userId", sql.Int, userId)
            .execute("GetUserTrustedNeighborsByUserId");
        return response.recordset;
    }
    catch(error){
        console.log(error);
    }
}

async function insertUserTrustedNeighbor(userTrustedNeighbor: IUserTrustedNeighbor){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("userId", sql.Int, userTrustedNeighbor.userId)
            .input("trustedUserId", sql.Int, userTrustedNeighbor.trustedUserId)
            .output("newId", sql.Int)
            .execute("InsertUserTrustedNeighbor");
        return response.output.newId;
    }
    catch(error){
        console.log(error);
    }
}

async function deleteUserTrustedNeighbor(userTrustedNeighborId: number, currentUserId: number){
    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("userTrustedNeighborId", sql.Int, userTrustedNeighborId)
            .input("userId", sql.Int, currentUserId)
            .execute("DeleteUserTrustedNeighbor");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getUserTrustedNeighborsByUserId,
    insertUserTrustedNeighbor,
    deleteUserTrustedNeighbor
}