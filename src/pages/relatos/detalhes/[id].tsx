// next
import Head from 'next/head'
// @mui
import { Container } from '@mui/material'
// layouts
// components
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BackButton from 'src/components/BackButton'
import ReportHistory from 'src/components/ReportHistory'
import Loading from 'src/components/Loading'
import ReportDetails from 'src/components/ReportDetails'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import ReportMenu from 'src/components/ReportMenu'
import { PostController } from 'controllers/postController'
import { IPost } from 'types/IPost'
import ComplaintController from 'controllers/complaintController'
import { IPostHistory } from 'types/IPostHistory'

// ----------------------------------------------------------------------

Detalhes.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Detalhes() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [page, setPage] = useState<'relato' | 'historico'>('relato')

    const [post, setPost] = useState<IPost>({
        id: '',
        response: {
            nome: '',
            cargo: '',
            email: '',
            empresa: '',
            relacao: '',
            infracao: '',
            telefone: '',
            evidencia: '',
            'area-atuacao': '',
            'tipo-denuncia': {
                group: '',
                label: '',
                value: '',
            },
            'data-ocorrencia': '',
            'autor-ocorrencia': '',
            'local-ocorrencia': '',
            'recorrencia-ocorrencia': '',
            'testemunhas-ocorrencia': '',
            'grau-de-certeza-denuncia': '',
            'especificar-tipo-denuncia': '',
            'nao-testemunhas-ocorrencia': '',
            'sim-testemunhas-ocorrencia': '',
        },
        protocol: '',
        email: '',
        createdAt: '',
        updatedAt: '',
    })

    const [histories, setHistories] = useState<IPostHistory[]>([
        {
            comment: '',
            createdAt: '',
            id: '',
            media: [
                {
                    id: '',
                    formats: '',
                    width: '',
                    height: '',
                    url: '',
                },
            ],
            updatedAt: '',
            user: {
                email: '',
                fullname: '',
                id: '',
                username: '',
            },
        },
    ])

    const getPost = async id => {
        setLoading(true)
        const postController = new PostController()
        try {
            const postData = await postController.getById(id)
            setPost(postData.data)
            const complaintController = new ComplaintController()
            try {
                const response = await complaintController.getHistoryOfComplaint(postData.data.protocol)
                setHistories(response.posthistories)
            } catch (error) {
                enqueueSnackbar('Protocolo não encontrado!', {
                    variant: 'error',
                })
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (query.id && Number(query.id)) {
            getPost(query.id)
        }
    }, [query.id])

    if (loading) return <Loading />

    return (
        <>
            <Head>
                <title>Detalhes do relato</title>
            </Head>
            <BackButton />
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <ReportMenu page={page} setPage={setPage} />

                {page === 'relato' ? <ReportDetails post={post} /> : <ReportHistory histories={histories} />}
            </Container>
        </>
    )
}
function enqueueSnackbar(arg0: string, arg1: { variant: string }) {
    throw new Error('Function not implemented.')
}
