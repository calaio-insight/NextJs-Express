import {IHomeRoleType} from "./homeRole.type";

export interface ITrustedNeighbor {
    trustedNeighborId?: number;
    homeId: number;
    userId: number;
    roleType?: IHomeRoleType;    
    displayName: string;
}