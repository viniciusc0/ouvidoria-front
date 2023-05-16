import { Fab, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import AppBar from 'src/components/ouvidoria/AppBar'
import { ButtonsGroup } from 'src/components/ouvidoria/ButtonsGroup'

function Home() {
    return (
        <>
            <AppBar navItems={['ACESSO DO CLIENTE', 'STATUS DA DENÚNCIA', 'CÓDIGO DE CONDUTA']} />
            <Grid container alignItems="center" justifyContent="center" style={styles.imageContainer}>
                <Grid
                    item
                    sx={{ textAlign: 'center', width: '80%', display: 'flex', flexDirection: 'column', rowGap: '25px' }}
                >
                    <Typography variant="h1" color={'white'}>
                        CANAL CONFIDENCIAL DA PATRUS TRANSPORTES
                    </Typography>
                    <Typography variant="h4" color={'white'} fontWeight="300">
                        Esse é um portal seguro e independente para registro de informações de violação de condutas
                        éticas ou descumprimento das legislações.
                    </Typography>
                    <Typography variant="h4" color={'white'} fontWeight="300">
                        Garantimos o anonimato e segurança da identidade do denunciante.
                    </Typography>
                    <ButtonsGroup />
                </Grid>
            </Grid>
            <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={6} sx={{ padding: '0 20px' }}>
                    <Typography variant="h3" color="#555555" textAlign="center" sx={{ margin: '25px 0' }}>
                        Como funciona
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        Este é um canal exclusivo para que todo o público de relacionamento da Patrus Transportes
                        (colaboradores, clientes, fornecedores, parceiros, prestadores de serviços e sociedade em
                        geral), possa relatar de forma segura e se desejada, anônima, qualquer ação de que viole o
                        Código de Ética e Conduta da Patrus Transportes.
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        Incidentes relacionados a condutas inapropriadas ou que de alguma maneira violem ou possam
                        violar os termos das nossas políticas internas devem ser reportadas nesse site ou pelo telefone
                        visualizar aqui, disponível 24 horas por dia e sete dias por semana. Algumas situações que podem
                        ser registradas são: assédio moral/comportamento inadequado; assédio sexual; corrupção; conflito
                        de interesses; fraude; roubos e furtos; uso indevido de informações privilegiadas ou
                        confidenciais.
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        As informações registradas nesse canal serão recebidas e tratadas por uma empresa independente e
                        especializada que tem por obrigação assegurar o sigilo absoluto e o tratamento adequado das
                        informações, sem conflito de interesses.
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        Caso prefira denunciar via Whatsapp e seja solicitado utilize o código Patrus
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        A Patrus Transportes agradece a sua iniciativa e confiança em utilizar o Canal Confidencial.
                    </Typography>
                    <ButtonsGroup size="small" />
                </Grid>
                <Grid item xs={6}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/ouvidor-digital-br.appspot.com/o/d302435c-c8e5-4d36-bc9c-9f5a59d540d4%2Fpublic%2FsecondarySectionBackground?alt=media&token=097f92fe-77fa-40b1-9e55-4f62cd810b78"
                        alt=""
                        width="100%"
                        height="100%"
                    />
                </Grid>
            </Grid>
            <Grid
                container
                sx={{ backgroundColor: '#666666', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src="https://canal.ouvidordigital.com.br/images/logo-ouvidor-digital-xlg.png"
                        alt=""
                        width="175px"
                        height="100%"
                    />
                </Grid>
                <Grid item xs={6} sx={{ paddingBottom: '25px' }}>
                    <Typography variant="h3" color="white" textAlign="center" sx={{ margin: '25px 0 5px 0' }}>
                        Quem é o ouvidor digital?
                    </Typography>
                    <Typography variant="h6" fontWeight="300" textAlign="center" color="white">
                        O Ouvidor Digital é uma solução para detectar casos de violação de condutas éticas ou
                        descumprimento a legislação, que possam afetar o resultado financeiro, a reputação e o ambiente
                        de trabalho da sua empresa.
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Fab
                        variant="extended"
                        sx={{ width: '280px', backgroundColor: '#444444', fontSize: '17px', fontWeight: '300' }}
                    >
                        Saiba mais
                    </Fab>
                </Grid>
            </Grid>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Typography>© Ouvidor Digital 2023 - Todos os direitos reservados</Typography>
            </div>
        </>
    )
}

const styles = {
    imageContainer: {
        height: 650,
        backgroundImage: `url(${'https://firebasestorage.googleapis.com/v0/b/ouvidor-digital-br.appspot.com/o/d302435c-c8e5-4d36-bc9c-9f5a59d540d4%2Fpublic%2FprimarySectionBackground?alt=media&token=be1242f1-ab27-466a-ac4f-6a47919c0676'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
    },
}

export default Home
