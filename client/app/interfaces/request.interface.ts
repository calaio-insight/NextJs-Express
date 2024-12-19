import { IHome } from "./home.interface"
import { IHomeItem } from "./homeItem.interface"

export interface IHomeRequest {
    homeId: number,
    userId: number
}

export interface IUpsertHomeRequest {
    userId: number|undefined,
    home: IHome
}

export interface IUpsertHomeItemRequest {
    userId: number|undefined,
    homeItem: IHomeItem
}

export interface IUploadHomeIconRequest {
    userId: number|undefined,
    homeId: number,
    file: FormData
}