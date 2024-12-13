import { IUser } from "../interfaces/user.interface";
import { IUserTrustedNeighbor } from "../interfaces/userTrustedNeighbor.interface";

const userTrustedNeighborRepo = require('../dataAccess/userTrustedNeighbor.repository');
const userRepo = require('../dataAccess/user.repository');

//Get list of trusted neighbors for current user
async function getUserTrustedNeighborsByUserId (userId: number) {
    let userTrustedNeighbors:IUserTrustedNeighbor[] = await userTrustedNeighborRepo.getUserTrustedNeighborsByUserId(userId);
    return (userTrustedNeighbors);
}

//Search db for a specific user (w/ intention to add them to user trusted neighbor list)
async function getPossibleTrustedNeighborByUserEmail (userEmail: string) {
    let user:IUser|null = await userRepo.getUserByEmail(userEmail);
    return (user);
}

//Add a user to current user's trusted neighbor list
async function insertUserTrustedNeighbor (userTrustedNeighbor: IUserTrustedNeighbor) {
    let userTrustedNeighborId:number = await userTrustedNeighborRepo.insertUserTrustedNeighbor(userTrustedNeighbor);
    return (userTrustedNeighborId);
}

//Remove a user from current user's trusted neighbor list ~ cascade remove that neighbor from all homes of current user
async function deleteUserTrustedNeighbor (userTrustedNeighborId: number, currentUserId: number) {
    await userTrustedNeighborRepo.deleteUserTrustedNeighbor(userTrustedNeighborId, currentUserId);
}

module.exports = {
    getUserTrustedNeighborsByUserId,
    getPossibleTrustedNeighborByUserEmail,
    insertUserTrustedNeighbor,
    deleteUserTrustedNeighbor
}