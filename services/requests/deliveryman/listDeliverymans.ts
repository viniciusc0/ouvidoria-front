import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { DeliverymanGetProps } from "./types";

export async function listDeliverymans(filters : FiltersProps) : Promise<DeliverymanGetProps[] | undefined>{
 
    const params = getParamsObj(filters);

    try {
        const res = await api.get('/couriers',{
            params: params
        });
        return res.data as DeliverymanGetProps[];
    } catch(error: any) {
        return undefined;
    }
}