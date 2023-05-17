import { Grid } from '@mui/material'
import { OuvidoriaFormSchema } from 'formSchemas/ouvidoriaFormSchema'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import JsonForm from 'src/components/JsonForm'
import AppBar from 'src/components/ouvidoria/AppBar'
import TermosAceite from 'src/components/ouvidoria/TermoAceite'

const Form = ({ values }) => {
    const router = useRouter()
    const id = router.query.id

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {}

    const [termAccepted, setTermAccepted] = useState(false)

    useEffect(() => {
        if (Cookies.get('termoAceito') === 'sim') {
            setTermAccepted(true)
        }
    }, [])

    if (!termAccepted) {
        return (
            <>
                <AppBar />
                <TermosAceite setTermAccepted={setTermAccepted} />
            </>
        )
    }

    return (
        <>
            <AppBar />
            <Grid sx={{ width: '80%', margin: '30px auto' }}>
                <JsonForm
                    schemaForm={OuvidoriaFormSchema}
                    values={values}
                    onSubmit={onSubmit}
                    msgSuccess={'Oba! Salvo com sucesso'}
                />
            </Grid>
        </>
    )
}
export default Form