// Functions for trusted neighbor data access

import sql = require('mssql');
import { ITrustedNeighbor } from '../interfaces/trustedNeighbor.interface';
var dbConfig = require("../config/dbConfig");

async function getTrustedNeighborsByHomeId(homeId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("homeId", sql.Int, homeId)
            .execute("GetTrustedNeighborsByHomeId");
        return response.recordset;
    }
    catch(error){
        console.log(error);
    }
}

async function insertTrustedNeighbor(trustedNeighbor: ITrustedNeighbor, currentUserId: number){
    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("homeId", sql.Int, trustedNeighbor.homeId)
            .input("userId", sql.Int, trustedNeighbor.userId)
            .input("roleId", sql.Int, trustedNeighbor.roleType)
            .input("currentUserId", sql.Int, currentUserId)
            .execute("InsertTrustedNeighbor");
    }
    catch(error){
        console.log(error);
    }
}

async function deleteTrustedNeighborsByHomeId(homeId: number){
    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("homeId", sql.Int, homeId)
            .execute("DeleteTrustedNeighborsByHomeId");
            return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    getTrustedNeighborsByHomeId,
    insertTrustedNeighbor,
    deleteTrustedNeighborsByHomeId
}