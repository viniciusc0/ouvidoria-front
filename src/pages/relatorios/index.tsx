import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import DoneIcon from '@mui/icons-material/Done'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import InboxIcon from '@mui/icons-material/Inbox'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'

const reportData = [
    { title: 'Entregue', Icon: DoneIcon, count: 10 },
    { title: 'Em andamento', Icon: HourglassEmptyIcon, count: 15 },
    { title: 'Finalizado Procedente', Icon: CheckCircleIcon, count: 20 },
    { title: 'Parcialmente Procedente', Icon: CheckCircleOutlineIcon, count: 25 },
    { title: 'Finalizado Improcedente', Icon: CancelIcon, count: 30 },
    { title: 'Dados Insuficientes', Icon: ReportProblemIcon, count: 35 },
    { title: 'Total de relatos recebidos', Icon: InboxIcon, count: 40 },
    { title: 'Não Qualificado', Icon: ClearAllIcon, count: 45 },
]

const Relatorios = ({ data = reportData }) => {
    const { themeStretch } = useSettingsContext()

    return (
        <>
            <Typography variant="h4" sx={{ margin: '25px' }}>
                Relatórios
            </Typography>
            <Container sx={{ marginTop: '40px' }} maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={2}>
                    {data.map((report, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    minWidth: 275,
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <report.Icon
                                    style={{
                                        fontSize: 40,
                                        marginTop: '20px',
                                        marginBottom: '-16px',
                                        color: '#0c8670',
                                    }}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography
                                        sx={{ marginBottom: '16px', color: 'gray' }}
                                        variant="h5"
                                        component="div"
                                    >
                                        {report.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: '24px', color: '#0c8670' }} variant="body2">
                                        {report.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

Relatorios.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Relatorios
