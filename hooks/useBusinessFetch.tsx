import BusinessController from 'controllers/businessController'
import { useEffect, useState } from 'react'
import { IBusinessFilter, IBusiness } from 'types/IBusiness'

export default function useBusinessFetch(businessFilters: IBusinessFilter) {
    const [loading, setLoading] = useState(false)
    const [businesses, setBusinesses] = useState<IBusiness[]>([])

    const getBusinesses = async () => {
        setLoading(true)
        const businessControler = new BusinessController()
        const businesses = await businessControler.getAll(businessFilters)
        setBusinesses(businesses)
        setLoading(false)
    }

    useEffect(() => {
        getBusinesses()
    }, [businessFilters])

    return { businesses, setBusinesses, loading }
}
