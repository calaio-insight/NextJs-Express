export interface IHomeItem {
    homeItemId: number;
    homeId: number;
    itemName: string;
    itemPhoto: string;
    purchaseDate?: Date;
    purchasePrice?: number;
    maintenanceDate?: Date;
    maintenanceCost?: number;
    notes: string;    

    createdBy?: number;
    createdDate?: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
}