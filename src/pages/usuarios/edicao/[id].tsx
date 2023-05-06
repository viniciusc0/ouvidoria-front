// next
import Head from 'next/head'
// @mui
// layouts
// components
import React from 'react'
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    return (
        <>
            <Head>
                <title> Edição de usuário</title>
            </Head>
        </>
    )
}
