import {ITrustedNeighbor} from "./trustedNeighbor.interface";
import {IHomeRoleType} from "./homeRole.type";
import {IHomePermissionType} from "./homePermission.type";

export interface IHome {
    homeId: number;
    homeName: string;
    homePhoto: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    purchaseDate: Date;
    purchasePrice: number;
    notes: string;
    trustedNeighbors: ITrustedNeighbor[];    
    role?: IHomeRoleType;
    permissions?: IHomePermissionType[];

    createdBy?: number;
    createdDate?: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
}