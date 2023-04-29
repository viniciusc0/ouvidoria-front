import { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// components
//
import AuthController from 'controllers/authController'
import LoadingScreen from 'src/components/loading-screen'
import { LoginResponse } from 'types/login/interface'
import { useAuthContext } from './useAuthContext'

// ----------------------------------------------------------------------

type AuthGuardProps = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isInitialized } = useAuthContext()

    const { pathname, push } = useRouter()

    const [requestedLocation, setRequestedLocation] = useState<string | null>(null)
    const [user, setUser] = useState<LoginResponse>()

    useEffect(() => {
        // if (requestedLocation && pathname !== requestedLocation) {
        //     push(requestedLocation)
        // }
        // if (isAuthenticated) {
        //     setRequestedLocation(null)
        // }
        const authController = new AuthController()
        const user = authController.getUser()
        setUser(user)
    }, [pathname, push])

    // if (!isInitialized) {
    //   return <LoadingScreen />;
    // }

    // if (!isAuthenticated) {
    //   if (pathname !== requestedLocation) {
    //     setRequestedLocation(pathname);
    //   }
    //   return <Login />;
    // }
    if (!user) {
        return <LoadingScreen />
    }

    return <>{children}</>
}
