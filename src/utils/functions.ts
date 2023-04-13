export function getShowableItem(jsonObject : { [key: string]: any }, key : string) : string{
    if(key === 'id'){
        return '';
    }else if(key === 'status'){
        return jsonObject[key] ? 'Ativo(a)' : 'Inativo(a)';
    }else if(key === 'work_days'){
        const work_days = jsonObject[key] as string[];
        let work_days_str  = '';
        work_days.map((day : string) => work_days_str = work_days_str + day + ', ');
        return work_days_str.substring(0, work_days_str.length - 2);
    }

    return jsonObject[key] as string;
} 