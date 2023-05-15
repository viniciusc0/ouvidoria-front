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
import BusinessController from 'controllers/businessController'
import { useEffect, useState } from 'react'
import { businessInitialValue } from 'src/utils/initialValues'
import AccountPopover from './AccountPopover'
import { useStorageContext } from 'src/storage/useStorageContext'

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

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentBusinessId(event.target.value as string)
    }

    const [businesses, setBusinesses] = useState([businessInitialValue])

    const { currentBusinessId, setCurrentBusinessId } = useStorageContext()

    useEffect(() => {
        const listBusinesses = async () => {
            const businessController = new BusinessController()
            try {
                const data = await businessController.getAll()
                setBusinesses(data)
            } catch (error) {
                console.log(error)
            }
        }

        listBusinesses()
    }, [])

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
                <FormControl sx={{ width: '40%' }}>
                    <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentBusinessId}
                        label="Empresa"
                        onChange={handleChange}
                    >
                        {businesses.map(business => (
                            <MenuItem key={business.id} value={business.id!}>
                                {business.reasonName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
