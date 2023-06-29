import { createContext, useState } from 'react'
// utils
import { ContextType } from './types'

// ----------------------------------------------------------------------

export const Context = createContext<ContextType | null>(null)

// ----------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [tenantId, setTenantId] = useState<string>('1')

    return (
        <Context.Provider
            value={{
                tenantId,
                setTenantId,
            }}
        >
            {children}
        </Context.Provider>
    )
}
