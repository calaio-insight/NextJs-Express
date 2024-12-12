import { IHome } from "../interfaces/home.interface";
import { IHomeRoleType } from "../interfaces/homeRole.type";

const homeRepo = require('../dataAccess/home.repository');
const trustedNeighborsRepo = require('../dataAccess/trustedNeighbor.repository');
const roleRepo = require('../dataAccess/role.repository');

async function getHomesByUserId (userId: number) {
    let homes:IHome[] = await homeRepo.getHomesByUserId(userId);

    for (let home of homes){
        home.trustedNeighbors = await trustedNeighborsRepo.getTrustedNeighborsByHomeId(home.homeId);
        await getRoleForHome(home, userId);  
    }

    return (homes);
}

async function getHomeById (homeId: number, currentUserId: number) {
    let home:IHome = await homeRepo.getHomeById(homeId);

    if (home != null){
        home.trustedNeighbors = await trustedNeighborsRepo.getTrustedNeighborsByHomeId(home.homeId);
        await getRoleForHome(home, currentUserId);
    }
    console.log('Home', home);

    return (home);
}

async function upsertHome (home: IHome, currentUserId: number) {
    // Insert/update home
    let homeId:number = await homeRepo.upsertHome(home, currentUserId);

    // Clear and re-insert trustedNeighbors list
    if (home != null){
        await trustedNeighborsRepo.deleteTrustedNeighborsByHomeId(home.homeId);
        for (let neighbor of home.trustedNeighbors){
            neighbor.homeId = homeId;
            await trustedNeighborsRepo.insertTrustedNeighbor(neighbor, currentUserId);
        }
    }

    return (homeId);
}

// TODO: DeleteHome

async function updateHomeImage (homeId: number, currentUserId: number, imagePath: string) {
    let isSuccess = await homeRepo.updateHomeImage(homeId, currentUserId, imagePath);
    return isSuccess;
}


async function getRoleForHome(home: IHome, currentUserId: number){
    if (home.createdBy == currentUserId){
        // Is owner
        home.role = IHomeRoleType.HomeOwner;
    }
    else {
        // Get role if not owner
        let currentRole = home.trustedNeighbors?.find(x => x.trustedNeighborId == currentUserId)?.roleType;
        home.role = currentRole ?? IHomeRoleType.Viewer;
    }

    // Get permissions
    home.permissions = await roleRepo.getHomePermissionsByRoleId(home.role ?? IHomeRoleType.Viewer);
}


module.exports = {
    getHomesByUserId,
    getHomeById,
    upsertHome,
    updateHomeImage
}