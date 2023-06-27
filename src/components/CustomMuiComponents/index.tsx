import { Grid, Typography } from '@mui/material'
import { ReactNode } from 'react'

export function GrayTypography({ children, ...other }: { children: ReactNode }) {
    return (
        <Typography color="#a7a7a7" {...other}>
            {children}
        </Typography>
    )
}

export function BlackTypography({ children, ...other }: { children: ReactNode }) {
    return (
        <Typography color="#727272" {...other}>
            {children}
        </Typography>
    )
}

export function TitleTypography({ children, ...other }: { children: ReactNode }) {
    return (
        <Typography variant="h5" color="#727272" {...other}>
            {children}
        </Typography>
    )
}

export function ColumnGrid({ children, ...other }: { children: ReactNode }) {
    return (
        <Grid {...other} display="flex" flexDirection="column">
            {children}
        </Grid>
    )
}

export function RowGrid({ children, ...other }: { children: ReactNode }) {
    return (
        <Grid display="flex" flexDirection="row" {...other}>
            {children}
        </Grid>
    )
}

export function CardItem({ title, value }: { title: string; value: string }) {
    return (
        <ColumnGrid sx={{ marginY: '12px', rowGap: '5px' }}>
            <GrayTypography>{title}</GrayTypography>
            <BlackTypography>{value === '' || value === undefined ? '-' : value}</BlackTypography>
        </ColumnGrid>
    )
}
