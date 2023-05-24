import { Grid, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
// import MailOutlineIcon from '@mui/icons-material/MailOutline';

function FormSuccess({ protocol }: { protocol: string }) {
    return (
        <Grid padding="20px">
            <Grid display="flex" justifyContent="center" marginY="10px">
                <CheckCircleOutlineIcon sx={{ fontSize: '60px', color: 'green' }} />
            </Grid>
            <Typography variant="h4" fontWeight="normal" color="green" marginBottom="10px">
                Formulário enviado com sucesso!
            </Typography>
            <Typography variant="h6" fontWeight="normal" color="#474747">
                O número do protocolo é:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
                {protocol}
            </Typography>
        </Grid>
    )
}

export default FormSuccess
