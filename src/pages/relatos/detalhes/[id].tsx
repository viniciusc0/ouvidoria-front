// next
import Head from 'next/head'
// @mui
import { Container } from '@mui/material'
// layouts
// components
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BackButton from 'src/components/BackButton'
import Chat from 'src/components/Chat'
import Loading from 'src/components/Loading'
import ReportDetails from 'src/components/ReportDetails'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

Detalhes.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Detalhes() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [page, setPage] = useState<'relato' | 'chat'>('relato')

    const loadData = async id => {
        setLoading(true)

        setLoading(false)
    }
    useEffect(() => {
        if (query.id && Number(query.id)) {
            loadData(query.id)
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
                <div
                    style={{
                        display: 'flex',
                        borderBottom: '2px solid #CCC',
                        marginBottom: '30px',
                    }}
                >
                    <p
                        onClick={() => setPage('relato')}
                        style={{
                            borderBottom: '2px solid #226ba7',
                            color: '#226ba7',
                            margin: 0,
                            marginRight: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Relato
                    </p>
                    <p onClick={() => setPage('chat')} style={{ margin: 0, color: '#a7a7a7', cursor: 'pointer' }}>
                        Chat com manifestante
                    </p>
                </div>

                {page === 'relato' ? <ReportDetails /> : <Chat />}
            </Container>
        </>
    )
}
