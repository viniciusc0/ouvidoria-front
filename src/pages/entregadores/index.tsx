// next
import Head from 'next/head'
// @mui
import React from 'react'
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

Entregadores.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Entregadores() {
    return (
        <>
            <Head>
                <title>Entregadores</title>
            </Head>
        </>
    )
}
