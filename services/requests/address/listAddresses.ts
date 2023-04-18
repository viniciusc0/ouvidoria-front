// import { AddressFiltersProps, AddressGetProps } from "./interfaces";
import api from "../api";

function getParamsObj({status, limit, offset, description} : AddressFiltersProps){

    let params = {
        Status: status
    };

    if(limit != ''){
        const param = {Limit: limit};
        params = Object.assign(param, params);
    }

    if(offset != ''){
        const param = {Offset: offset};
        params = Object.assign(params, param);
    }

    if(description != ''){
        const param = {Description: description};
        params = Object.assign(params, param);
    }

    return params;
}

export async function listAddressesWithFilters(addressFilters : AddressFiltersProps) : Promise<AddressGetProps[] | undefined>{

    const params = getParamsObj(addressFilters);

    try {
        const res = await api.get('/Address', {
            params: params
        });
        return res.data as AddressGetProps[];
    } catch(error: any) {
        return undefined;
    }
}

// export async function listAddresses() : Promise<AddressGetProps[] | undefined>{

//     try {
//         const res = await api.get('/Address');
//         return res.data as AddressGetProps[];
//     } catch(error: any) {
//         return undefined;
//     }
// }