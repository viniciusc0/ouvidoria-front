import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Toolbar,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const drawerWidth = 240

export default function DrawerAppBar(props: { window?: () => Window; logoUrl: string }) {
    const { window, logoUrl } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const router = useRouter()

    const navItems = [
        // { label: 'ACESSO DO CLIENTE', path: '/ouvidoria' },
        { label: 'STATUS DA DENÚNCIA', path: '/ouvidoria/status-denuncia' },
        // { label: 'CÓDIGO DE CONDUTA', path: '/ouvidoria' },
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState)
    }

    const { query } = useRouter()

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Grid>{logoUrl && <Image src={logoUrl} alt="logo" width="118px" height="60px" />}</Grid>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link href={item.path}>
                                <a style={{ textDecoration: 'none', color: '#4D595A' }}> {item.label}</a>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: 'white', padding: '10px 0' }}>
                <Toolbar>
                    <IconButton
                        color="success"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        onClick={() => router.push(`/ouvidoria/${query.company}`)}
                    >
                        {logoUrl && <img src={logoUrl} alt="logo" />}
                    </Grid>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, index) => (
                            <Link key={index} href={item.path + `?company=${query.company}`} passHref>
                                <a style={{ textDecoration: 'none', color: '#4D595A' }}>
                                    <Button>{item.label}</Button>
                                </a>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 0 }}>
                <Toolbar />
            </Box>
        </Box>
    )
}
