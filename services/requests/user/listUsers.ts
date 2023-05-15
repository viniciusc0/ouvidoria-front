import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { UserGetProps } from "./types";

export async function listUsers(filters?: FiltersProps){

    let params = {};
    if(filters !== undefined){
        params = getParamsObj(filters);
    }

    try {
        const res = await api.get('/users', {
            params: params
        });
        return res.data;
    } catch(error: any) {
        return undefined;
    }
}