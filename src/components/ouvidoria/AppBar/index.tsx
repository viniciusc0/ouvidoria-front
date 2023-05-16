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
    ListItemText,
    Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import Image from 'next/image'

const drawerWidth = 240

export default function DrawerAppBar(props: { window?: () => Window; navItems: string[] }) {
    const { window, navItems } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState)
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Grid>
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/ouvidor-digital-br.appspot.com/o/d302435c-c8e5-4d36-bc9c-9f5a59d540d4%2Fpublic%2Flogo?alt=media&token=286cfa4e-6721-42b5-bcc8-8525b3c42b8a"
                    alt="logo"
                    width="118px"
                    height="60px"
                />
            </Grid>
            <Divider />
            <List>
                {navItems.map(item => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
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
                    <Grid sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/ouvidor-digital-br.appspot.com/o/d302435c-c8e5-4d36-bc9c-9f5a59d540d4%2Fpublic%2Flogo?alt=media&token=286cfa4e-6721-42b5-bcc8-8525b3c42b8a"
                            alt="logo"
                        />
                    </Grid>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map(item => (
                            <Button key={item} sx={{ color: '#4D595A' }}>
                                {item}
                            </Button>
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
