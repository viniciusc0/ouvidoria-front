// @mui
import {
    AppBar,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Toolbar,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
// utils
import { bgBlur } from '../../../utils/cssStyles'
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop'
import useResponsive from '../../../hooks/useResponsive'
// config
import { HEADER, NAV } from '../../../config'
// components
import Iconify from '../../../components/iconify'
import Logo from '../../../components/logo'
import { useSettingsContext } from '../../../components/settings'
//
import { useState } from 'react'
import AccountPopover from './AccountPopover'

// ----------------------------------------------------------------------

type Props = {
    onOpenNav?: VoidFunction
}

export default function Header({ onOpenNav }: Props) {
    const theme = useTheme()

    const { themeLayout } = useSettingsContext()

    const isNavHorizontal = themeLayout === 'horizontal'

    const isNavMini = themeLayout === 'mini'

    const isDesktop = useResponsive('up', 'lg')

    const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal
    const [age, setAge] = useState('')
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string)
    }

    const renderContent = (
        <>
            {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

            {!isDesktop && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
            )}

            <Stack
                flexGrow={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={{ xs: 0.5, sm: 1.5 }}
            >
                {/* <NotificationsPopover /> */}
                {/* <Grid item xs={12}> */}
                <FormControl sx={{ width: '40%' }}>
                    {/* Exemplo de listagem de empresas */}
                    <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Empresa"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                {/* </Grid> */}

                <AccountPopover />
            </Stack>
        </>
    )

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,

                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(isDesktop && {
                    width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
                    height: HEADER.H_DASHBOARD_DESKTOP,
                    bgcolor: 'background.paper',
                    ...(isOffset && {
                        height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                    }),
                    ...(isNavHorizontal && {
                        width: 1,
                        bgcolor: 'background.default',
                        height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                        borderBottom: theme => `dashed 1px ${theme.palette.divider}`,
                    }),
                    ...(isNavMini && {
                        width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
                    }),
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {/* <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }, color: '#000' }}
                >
                    
                </Typography> */}
                {renderContent}
            </Toolbar>
        </AppBar>
    )
}
