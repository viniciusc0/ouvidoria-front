import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { convertBusinessDataToFrontendFormat } from 'src/utils/functions'
import { businessFormDataInitialValue } from 'src/utils/initialValues'
import { IBusinessForm } from 'types/IBusiness'

export default function useSingleBusinessFetch() {
    const [formData, setFormData] = useState<IBusinessForm>(businessFormDataInitialValue)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const id = router.query.id as string

    useEffect(() => {
        const handleGetBusiness = async (id: string) => {
            setLoading(true)
            const businessController = new BusinessController()
            try {
                const data = await businessController.getById(id)
                const businessConvertedData = convertBusinessDataToFrontendFormat(data)
                setFormData(businessConvertedData)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        handleGetBusiness(id)
    }, [])

    return { formData, loading }
}
