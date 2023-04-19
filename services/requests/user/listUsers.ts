import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { UserGetProps } from "./types";

export async function listUsers(filters : FiltersProps) : Promise<UserGetProps[] | undefined>{

    const params = getParamsObj(filters);

    try {
        const res = await api.get('/users', {
            params: params
        });
        return res.data as UserGetProps[];
    } catch(error: any) {
        return undefined;
    }
}