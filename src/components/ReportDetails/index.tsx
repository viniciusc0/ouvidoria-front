import { Button, Card, Grid } from '@mui/material'
import moment from 'moment'
import { IPost } from 'types/IPost'
import { CardItem, ColumnGrid, GrayTypography, TitleTypography } from '../CustomMuiComponents'

function ReportDetails({ post }: { post: IPost }) {
    const formattedDate = moment(post.response['data-ocorrencia']).format('DD/MM/YYYY')
    const formattedCreatedAt = moment(post.createdAt).format('DD/MM/YYYY HH:mm')

    return (
        <Grid display="flex" justifyContent="space-between">
            <Grid>
                <Card sx={{ padding: '25px', width: '280px' }}>
                    <Grid display="flex" flexDirection="column" rowGap="20px">
                        <CardItem title="Protocolo" value={post.protocol} />
                        <Grid display="flex" flexDirection="column" rowGap="5px" marginY="12px">
                            <GrayTypography>Relatos vinculados</GrayTypography>
                            <Button variant="outlined" color="secondary" sx={{ width: '90px' }}>
                                Selecionar
                            </Button>
                        </Grid>
                        <CardItem title="Data de criação" value={formattedCreatedAt} />
                        <CardItem title="Status" value="Em andamento" />
                        <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
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
                            <CardItem title="Nome" value={post.response.nome} />
                            <CardItem title="Cargo" value={post.response.cargo} />
                            {/* <CardItem title="Visualizações de status" value="3" /> */}
                            <CardItem title="Horário para contato" value={post.response['horario-contato']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Organização" value={post.response.empresa} />
                            <CardItem title="Área de atuação" value={post.response['area-atuacao']} />
                            <CardItem title="Telefone" value="3134479890" />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Relação com a empresa" value={post.response.relacao} />
                            <CardItem title="Email" value={post.response.email} />
                            {/* <CardItem title="Data da última visualização" value="5 de março" /> */}
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
                            <CardItem title="Nome do denunciado" value={post.response['autor-ocorrencia']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Membros do comitê denunciados" value="" />
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
                            <CardItem title="Tipo" value={post.response['tipo-denuncia'].label} />
                            <CardItem title="Infração do código de ética" value={post.response.infracao} />
                            <CardItem title="Grau de certeza" value={post.response['grau-de-certeza-denuncia']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Data do incidente" value={formattedDate} />
                            <CardItem title="Continua ocorrendo" value={post.response['recorrencia-ocorrencia']} />
                        </ColumnGrid>
                        <ColumnGrid>
                            <CardItem title="Localidade" value={post.response['local-ocorrencia']} />
                            <CardItem
                                title="Nome das testemunhas"
                                value={post.response['sim-testemunhas-ocorrencia']}
                            />
                            <CardItem
                                title="Descrição da ocorrência"
                                value={post.response['nao-testemunhas-ocorrencia']}
                            />
                        </ColumnGrid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ReportDetails
