import api from "../api";
import { FiltersProps, getParamsObj } from "../utils";
import { CompanyGetProps } from "./types";

export async function listCompanies(filters: FiltersProps) : Promise<CompanyGetProps[] | undefined>{

    const params = getParamsObj(filters);

    try {
        const res = await api.get('/businesses' , {
            params: params
        });
        return res.data as CompanyGetProps[];
    } catch(error: any) {
        return undefined;
    }
}