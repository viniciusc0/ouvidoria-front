import { Fab, Grid } from '@mui/material'
import { useRouter } from 'next/router'

export function ButtonsGroup({ size }: { size?: 'regular' | 'small' }) {
    const width = size === 'small' ? '230px' : '280px'
    const fontSize = '17px'
    const fontWeight = '300'

    const { push, query } = useRouter()

    return (
        <Grid
            item
            sx={{ display: 'flex', gap: '10px', margin: '30px 0 70px 0', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            <Fab
                onClick={() => push(`/ouvidoria/formulario?company=${query.company}`)}
                variant="extended"
                sx={{ width: width, backgroundColor: '#FF2F2F', fontSize: fontSize, fontWeight: fontWeight }}
            >
                Registre pela web
            </Fab>
            <Fab
                variant="extended"
                sx={{ width: width, backgroundColor: '#4D595A', fontSize: fontSize, fontWeight: fontWeight }}
            >
                Registre pelo whatsapp
            </Fab>
            <Fab
                variant="extended"
                sx={{ width: width, backgroundColor: '#748081', fontSize: fontSize, fontWeight: fontWeight }}
            >
                0800 591 1872
            </Fab>
        </Grid>
    )
}
