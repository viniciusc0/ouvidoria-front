import { useState } from 'react'
import { removeMask } from 'src/utils/functions'
import { businessFiltersInitialValue } from 'src/utils/initialValues'
import { IBusinessFilter } from 'types/IBusiness'

export default function useBusinessFilters() {
    const [businessFilters, setBusinessFilters] = useState<IBusinessFilter>(businessFiltersInitialValue)

    function handleSetBusinessFilters(data: IBusinessFilter) {
        if (data.cnpj) {
            data.cnpj = removeMask(data.cnpj) as string
        }
        setBusinessFilters(data)
    }

    return { businessFilters, handleSetBusinessFilters }
}
