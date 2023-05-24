import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import { IPostHistory } from 'types/IPostHistory'
import ComplaintHistoryCard from '../ComplaintHistoryCard'

export function HistoryofOccurencesModal({
    history,
    open,
    setOpen,
}: {
    history: IPostHistory[]
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="scroll-dialog-title">Histórico</DialogTitle>
                <DialogContent sx={{ padding: '0' }}>
                    <Grid display="flex" flexDirection="column" rowGap="25px" p={2} item lg={8} xs={12} margin="0 auto">
                        {history.map((post, index) => (
                            <ComplaintHistoryCard
                                key={index}
                                date={post.createdAt}
                                name={post.user.fullname}
                                comment={post.comment}
                            />
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
