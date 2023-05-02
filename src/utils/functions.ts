import { IBusiness, IBusinessForm } from "types/IBusiness";

export function getShowableItem(jsonObject: { [key: string]: any }, key: string): string {
    if (key === 'id') {
        return '';
    } else if (key === 'address') {
        return '';
    } else if (key === 'createdAt' || key === 'updatedAt') {
        return '';
    } else if (key === 'status') {
        return jsonObject[key] ? 'Ativo(a)' : 'Inativo(a)';
    } else if (key === 'work_days') {
        const work_days = jsonObject[key] as string[];
        let work_days_str = '';
        work_days.map((day: string) => work_days_str = work_days_str + day + ', ');
        return work_days_str.substring(0, work_days_str.length - 2);
    } else if (key === 'role') {
        return jsonObject[key].name;
    }

    return jsonObject[key] as string;
}

export function removeMask(str: string | undefined) {
    if (str != undefined)
        return str.replace(/[^\d]/g, '');

}

export function convertBusinessDataToBackendFormat(data: IBusinessForm) {
    let obj = {
        cnpj: removeMask(data.cnpj),
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: removeMask(data.contactPhone),
        fantasyName: data.fantasyName,
        reasonName: data.reasonName,
        status: data.status,
        address: {
            cep: removeMask(data.cep),
            city: data.city,
            district: data.district,
            number: data.number,
            street: data.street,
            uf: data.uf
        }
    } as IBusiness;

    if (data.id && obj.address) {
        obj = {
            ...obj,
            address: {
                ...obj.address,
                id: data.id
            }
        };
    }

    return obj;
}

export function convertBusinessDataToFrontendFormat(data: IBusiness) {

    let obj = {
        cnpj: data.cnpj,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        fantasyName: data.fantasyName,
        reasonName: data.reasonName,
        status: data.status,
    } as IBusinessForm;


    if (data.address != null) {
        obj = {
            ...obj,
            id: data.address.id,
            cep: data.address.cep,
            city: data.address.city,
            district: data.address.district,
            number: data.address.number,
            street: data.address.street,
            uf: data.address.uf
        }
    }
    return obj;



}