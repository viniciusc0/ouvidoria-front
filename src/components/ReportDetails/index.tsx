import { Button, Card, Grid } from '@mui/material'
import { BlackTypography, CardItem, ColumnGrid, GrayTypography, TitleTypography } from '../CustomMuiComponents'

function ReportDetails() {
    return (
        <Grid display="flex" justifyContent="space-between">
            <Grid>
                <Card sx={{ padding: '25px', width: '280px' }}>
                    <Grid display="flex" flexDirection="column" rowGap="20px">
                        <CardItem title="Número sequencial" value="0909879798" />
                        <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Relatos vinculados</GrayTypography>
                            <Button variant="outlined" color="secondary" sx={{ width: '90px' }}>
                                Selecionar
                            </Button>
                        </Grid>
                        <CardItem title="Data de criação" value="10 de março de 2023" />
                        <CardItem title="Status" value="Em andamento" />
                        <CardItem title="Tipo" value="Assédio moral" />
                        <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Sensibilidade</GrayTypography>
                            <Button variant="contained" color="error" sx={{ width: '50px' }}>
                                Alta
                            </Button>
                        </Grid>
                        <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Canal de origem</GrayTypography>
                            <Button variant="outlined" color="secondary" sx={{ width: '50px' }}>
                                Web
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid width="70%" display="flex" flexDirection="column" rowGap="20px">
                <Card sx={{ padding: '25px' }}>
                    <TitleTypography>Manifestante</TitleTypography>
                    <Grid
                        marginTop="20px"
                        display="flex"
                        flexDirection="row"
                        columnGap="30px"
                        justifyContent="space-between"
                    >
                        <ColumnGrid>
                            <CardItem title="Nome" value="Nome da pessoa" />
                            <CardItem title="Cargo" value="Cargo da pessoa" />
                            <CardItem title="Visualizações de status" value="3" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Organização" value="Sparco" />
                            <CardItem title="Telefone" value="3134479890" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <Grid display="flex" flexDirection="column" rowGap="5px">
                                <GrayTypography>Relação</GrayTypography>
                                <BlackTypography>Outro</BlackTypography>
                            </Grid>
                            <CardItem title="Email" value="email@email.com" />
                            <CardItem title="Data da última visualização" value="5 de março" />
                        </ColumnGrid>
                    </Grid>
                </Card>
                <Card sx={{ padding: '25px' }}>
                    <TitleTypography>Denunciados</TitleTypography>
                    <Grid
                        marginTop="20px"
                        display="flex"
                        flexDirection="row"
                        columnGap="30px"
                        justifyContent="space-between"
                    >
                        <ColumnGrid>
                            <CardItem title="Informações do denunciado" value="-" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Membros do comitê denunciados" value="-" />
                        </ColumnGrid>
                    </Grid>
                </Card>
                <Card sx={{ padding: '25px' }}>
                    <TitleTypography>Evento</TitleTypography>
                    <Grid
                        marginTop="20px"
                        display="flex"
                        flexDirection="row"
                        columnGap="30px"
                        justifyContent="space-between"
                    >
                        <ColumnGrid>
                            <CardItem title="Tipo" value="-" />
                            <CardItem title="Grau de certeza" value="-" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Data do incidente" value="-" />
                            <CardItem title="Continua ocorrendo" value="-" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Localidade" value="-" />
                            <CardItem title="Testemunhas" value="-" />
                        </ColumnGrid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ReportDetails
