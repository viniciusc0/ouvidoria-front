// next
import Head from 'next/head'
// @mui
import React from 'react'
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

Usuarios.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Usuarios() {
    return (
        <>
            <Head>
                <title>Usuários</title>
            </Head>
        </>
    )
}
