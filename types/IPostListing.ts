export type IPostListing = {
    id: string
    protocol: string
    status: string
    createdAt: string
    closedate: string
    tenant: {
        description: string
    }
    type: string
    company: string
    response: {
        'tipo-denuncia': {
            group: string
            label: string
            value: string
        }
    }
}
