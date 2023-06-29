import { Dialog, DialogContent, DialogTitle, Grid, InputLabel, TextField } from '@mui/material'
import { useState } from 'react'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'

export function NewCommentModal({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [fileFieldValue, setFileFieldValue] = useState<File>()

    function onSubmit() {}

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'comment',
            label: 'Insira seu comentário',
            // groupKey: 'raleteInfration',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'file',
            label: '',
            // groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Selecione o arquivo</InputLabel>
                        </Grid>
                        <TextField
                            type="file"
                            onChange={e => {
                                const target = e.target as HTMLInputElement
                                const files = target.files as FileList
                                setFileFieldValue(files[0])
                            }}
                        />
                    </Grid>
                )
            },
        },
    ]

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px 18px 5px 18px' }} color="#727272" id="scroll-dialog-title">
                    Cadastrar nova ocorrência
                </DialogTitle>
                <DialogContent sx={{ padding: '0' }}>
                    <Grid
                        display="flex"
                        flexDirection="column"
                        p={2}
                        item
                        lg={8}
                        xs={12}
                        margin="0 auto"
                        minHeight={'auto'}
                        sx={{ minWidth: { xs: '100%', md: '500px' } }}
                    >
                        <ApolloForm
                            schema={formSchema}
                            initialValues={[]}
                            submitButtonText="Enviar"
                            onSubmit={onSubmit}
                            showCancelButtom
                            onCancel={handleClose}
                            cancelButtonTitle="Fechar"
                            defaultExpandedGroup={true}
                        />
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
