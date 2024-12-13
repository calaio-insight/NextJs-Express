import { IHomeItem } from "../interfaces/homeItem.interface";

const homeItemRepo = require('../dataAccess/homeItem.repository');

async function getHomeItemsByHomeId (homeId: number) {
    let homeItems:IHomeItem[] = await homeItemRepo.getHomeItemsByHomeId(homeId);
    return (homeItems);
}

async function getHomeItemById (homeItemId: number) {
    let homeItem:IHomeItem = await homeItemRepo.getHomeItemById(homeItemId);
    return (homeItem);
}

async function upsertHomeItem (homeItem: IHomeItem, currentUserId: number) {
    let homeItemId:number = await homeItemRepo.upsertHomeItem(homeItem, currentUserId);
    return (homeItemId);
}

async function updateHomeItemImage (homeItemId: number, currentUserId: number, imagePath: string) {
    await homeItemRepo.updateHomeItemImage(homeItemId, currentUserId, imagePath);
}

// todo delete home items

module.exports = {
    getHomeItemsByHomeId,
    getHomeItemById,
    upsertHomeItem,
    updateHomeItemImage
}