import { useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// @mui
import { Box, Drawer, Stack } from '@mui/material'
// hooks
import useResponsive from '../../../hooks/useResponsive'
// config
import { NAV } from '../../../config'
// components
import { NavSectionVertical } from '../../../components/nav-section'
import Scrollbar from '../../../components/scrollbar'
//
import NavAccount from './NavAccount'
import navConfig from './config'

// ----------------------------------------------------------------------

type Props = {
    openNav: boolean
    onCloseNav: VoidFunction
}

export default function NavVertical({ openNav, onCloseNav }: Props) {
    const { pathname } = useRouter()

    const isDesktop = useResponsive('up', 'lg')

    useEffect(() => {
        if (openNav) {
            onCloseNav()
        }
    }, [pathname])

    const renderContent = (
        <div style={{ backgroundColor: '#fff', height: '100%' }}>
            <Scrollbar
                sx={{
                    height: 1,
                    '& .simplebar-content': {
                        height: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <Stack
                    spacing={3}
                    sx={{
                        pt: 3,
                        pb: 2,
                        px: 2.5,
                        flexShrink: 0,
                    }}
                >
                    <NavAccount />
                </Stack>

                <NavSectionVertical data={navConfig} />

                <Box sx={{ flexGrow: 1 }} />
            </Scrollbar>
        </div>
    )

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
            }}
        >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV.W_DASHBOARD,
                            bgcolor: 'transparent',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: {
                            width: NAV.W_DASHBOARD,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    )
}
