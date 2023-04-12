export function getShowableItem(jsonObject : { [key: string]: any }, key : string) : string{
    if(key === 'id'){
        return ''
    }else if(key === 'status'){
        return jsonObject[key] ? 'Ativo(a)' : 'Inativo(a)'
    }

    return jsonObject[key] as string;
} 