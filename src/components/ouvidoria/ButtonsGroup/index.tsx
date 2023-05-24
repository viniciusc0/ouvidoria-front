import { Button, Grid } from '@mui/material'
import { useRouter } from 'next/router'

export function ButtonsGroup() {
    const { push, query } = useRouter()
    const CustomButtom = ({ onClick, children }) => (
        <Button variant="contained" onClick={onClick} sx={{ padding: '10px 20px', fontSize: '16px' }}>
            {children}
        </Button>
    )

    return (
        <Grid
            item
            sx={{ display: 'flex', gap: '10px', margin: '30px 0 70px 0', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            <CustomButtom onClick={() => push(`/ouvidoria/formulario?company=${query.company}`)}>
                Registre pela web
            </CustomButtom>
        </Grid>
    )
}
