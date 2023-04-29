import { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// @mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
// routes
import { PATH_PAGE } from '../../../routes/paths'
// auth
// components
import AuthController from 'controllers/authController'
import { LoginResponse } from 'types/login/interface'
import { IconButtonAnimate } from '../../../components/animate'
import { CustomAvatar } from '../../../components/custom-avatar'
import MenuPopover from '../../../components/menu-popover'
import { useSnackbar } from '../../../components/snackbar'

// ----------------------------------------------------------------------

const OPTIONS = [
    {
        label: 'Home',
        linkTo: '/',
    },
    {
        label: 'Profile',
        linkTo: PATH_PAGE.home,
    },
    {
        label: 'Settings',
        linkTo: PATH_PAGE.home,
    },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const { replace, push } = useRouter()

    // const { user, logoutUser } = useAuthContext()
    const [user, setUser] = useState<LoginResponse>()

    const { enqueueSnackbar } = useSnackbar()

    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    const handleLogout = async () => {
        new AuthController().logout()
    }

    const handleClickItem = (path: string) => {
        handleClosePopover()
        push(path)
    }

    useEffect(() => {
        const authController = new AuthController()
        const userData = authController.getUser()
        if (!userData) {
            return
        }

        setUser(userData)
    }, [])

    return (
        <>
            <IconButtonAnimate
                onClick={handleOpenPopover}
                sx={{
                    p: 0,
                    ...(openPopover && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: theme => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <CustomAvatar src={user?.photoURL} alt={user?.user.username} name={user?.user.username} />
            </IconButtonAnimate>

            <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user?.user.username}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {user?.user.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    {OPTIONS.map(option => (
                        <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </MenuPopover>
        </>
    )
}
