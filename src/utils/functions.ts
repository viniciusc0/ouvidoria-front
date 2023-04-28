import { CompanyCreationProps, CompanyFormData, CompanyGetProps } from "services/requests/company/types";

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

export function removeMask(str: string) {
    return str.replace(/[^\d]/g, '')
}

export function convertCompanyDataToBackendFormat(data: CompanyFormData) {
    return {
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
    } as CompanyCreationProps
}

export function convertCompanyDataToFrontendFormat(data: CompanyGetProps) {
    return {
        cnpj: data.cnpj,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        fantasyName: data.fantasyName,
        reasonName: data.reasonName,
        status: data.status,
        cep: data.address.cep,
        city: data.address.city,
        district: data.address.district,
        number: data.address.number,
        street: data.address.street,
        uf: data.address.uf
    } as CompanyFormData;
}