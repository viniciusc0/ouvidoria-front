import { Card, Grid, Typography } from '@mui/material'
import React from 'react'

function ComplaintHistoryCard({ data, text }: { data: string; text: string }) {
    return (
        <Grid item lg={8} xs={12} margin="0 auto">
            <Card>
                <Grid padding="25px">
                    <Grid display="flex" columnGap="5px" alignItems="center">
                        <Typography fontWeight="bold">Data:</Typography>
                        <Typography>{data}</Typography>
                    </Grid>
                    <Typography variant="body1">{text}</Typography>
                </Grid>
            </Card>
        </Grid>
    )
}

export default ComplaintHistoryCard
