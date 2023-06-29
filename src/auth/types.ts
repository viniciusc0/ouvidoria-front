// ----------------------------------------------------------------------

import React, { SetStateAction } from 'react'

export type ContextType = {
    tenantId: string
    setTenantId: React.Dispatch<SetStateAction<string>>
}
