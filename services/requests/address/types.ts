export interface AddressCreationProps{
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
    cep: string;
    latitude: string;
    longitude: string;
};

export interface AddressGetProps extends AddressCreationProps{
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};