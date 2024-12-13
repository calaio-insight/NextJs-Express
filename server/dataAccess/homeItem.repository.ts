import sql = require('mssql');
import { IHomeItem } from '../interfaces/homeItem.interface';
var dbConfig = require("../config/dbConfig");

async function getHomeItemsByHomeId(homeId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("homeId", sql.Int, homeId)
            .execute("GetHomeItemsByHomeId");
        return response.recordset;
    }
    catch(error){
        console.log(error);
    }
}

async function getHomeItemById(homeItemId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let response = await pool.request()
            .input("homeItemId", sql.Int, homeItemId)
            .execute("GetHomeItemById");
        return response.recordset[0];
    }
    catch(error){
        console.log(error);
    }
}

async function upsertHomeItem(homeItem: IHomeItem, currentUserId: number){
    try{
        let pool = await sql.connect(dbConfig);
        let request = await pool.request();

        if (homeItem.homeItemId != 0 && homeItem.homeItemId != null){
            request.input("homeItemId", sql.Int, homeItem.homeItemId);
        }
        else{
            request
                .input("createdBy", sql.Int, currentUserId)
                .input("createdDate", sql.DateTime2, new Date())
        }

        let response = await request  
            .input("homeId", sql.Int, homeItem.homeId)
            .input("itemName", sql.NVarChar(), homeItem.itemName)
            .input("itemPhoto", sql.NVarChar(sql.MAX), homeItem.itemPhoto)
            .input("purchaseDate", sql.DateTime2, homeItem.purchaseDate)
            .input("purchasePrice", sql.Decimal, homeItem.purchasePrice)
            .input("maintenanceDate", sql.DateTime2, homeItem.maintenanceDate)
            .input("maintenanceCost", sql.Decimal, homeItem.maintenanceCost)
            .input("notes", sql.NVarChar(sql.MAX), homeItem.notes)
            .input("modifiedBy", sql.Int, currentUserId)
            .input("modifiedDate", sql.DateTime2, new Date())
            .output("updatedId", sql.Int)
            .execute("UpsertHomeItem");
        return response.output.updatedId;
    }
    catch(error){
        console.log(error);
    }
}

async function updateHomeItemImage(homeItemId: number, currentUserId: number, imagePath: string){
    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("homeItemId", sql.Int, homeItemId)
            .input("modifiedBy", sql.Int, currentUserId)
            .input("modifiedDate", sql.DateTime2, new Date())
            .input("itemPhoto", sql.NVarChar(sql.MAX), imagePath)
            .execute("UpdateHomeItemImage");
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

//todo delete home item

module.exports = {
    getHomeItemsByHomeId,
    getHomeItemById,
    upsertHomeItem,
    updateHomeItemImage
}