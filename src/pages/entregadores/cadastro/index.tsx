// next
import Head from 'next/head'
// @mui
// layouts
// components
import React from 'react'
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Cadastro() {
    return (
        <>
            <Head>
                <title>Cadastro de entregador</title>
            </Head>
        </>
    )
}
