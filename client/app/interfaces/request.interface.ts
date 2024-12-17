import { IHome } from "./home.interface"

export interface IHomeRequest {
    homeId: number,
    userId: number
}

export interface IUpsertHomeRequest {
    userId: number|undefined,
    home: IHome
}