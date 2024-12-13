import sql = require('mssql');
import { IHome } from '../interfaces/home.interface';
var dbConfig = require("../config/dbConfig");

// Gets all homes user has created or is a "trusted neighbor" for
async function getHomesByUserId(userId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("userId", sql.Int, userId)
            .execute("GetHomesByUserId");
        return response.recordset;
    }
    catch(error){
        console.log(error);
    }
}

async function getHomeById(homeId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("homeId", sql.Int, homeId)
            .execute("GetHomeById");
        return response.recordset[0];
    }
    catch(error){
        console.log(error);
    }
}

async function upsertHome(home: IHome, currentUserId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let request = await pool.request();

        if (home.homeId != 0 && home.homeId != null){
            request.input("homeId", sql.Int, home.homeId);
        }
        else{
            request
                .input("createdBy", sql.Int, currentUserId)
                .input("createdDate", sql.DateTime2, new Date())
        }

        let response = await request  
            .input("homeName", sql.NVarChar(250), home.homeName)
            .input("homePhoto", sql.NVarChar(sql.MAX), home.homePhoto)
            .input("address", sql.NVarChar(250), home.address)
            .input("address2", sql.NVarChar(250), home.address2)
            .input("city", sql.NVarChar(250), home.city)
            .input("state", sql.NVarChar(2), home.state)
            .input("zip", sql.NVarChar(50), home.zip)
            .input("purchaseDate", sql.DateTime2, home.purchaseDate)
            .input("purchasePrice", sql.Decimal, home.purchasePrice)
            .input("notes", sql.NVarChar(sql.MAX), home.notes)
            .input("modifiedBy", sql.Int, currentUserId)
            .input("modifiedDate", sql.DateTime2, new Date())
            .output("updatedId", sql.Int)
            .execute("UpsertHome");
        return response.output.updatedId;
    }
    catch(error){
        console.log(error);
    }
}

// TODO: DeleteHome

async function updateHomeImage(homeId: number, currentUserId: number, imagePath: string){
    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("homeId", sql.Int, homeId)
            .input("modifiedBy", sql.Int, currentUserId)
            .input("modifiedDate", sql.DateTime2, new Date())
            .input("homePhoto", sql.NVarChar(sql.MAX), imagePath)
            .execute("UpdateHomeImage");
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    getHomesByUserId,
    getHomeById,
    upsertHome,
    updateHomeImage
}