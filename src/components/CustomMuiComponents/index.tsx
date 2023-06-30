import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'

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
        <Grid sx={{ display: 'flex', flexDirection: 'column', marginY: '12px', rowGap: '5px' }}>
            <GrayTypography>{title}</GrayTypography>
            <BlackTypography>{value === '' || value === undefined ? '-' : value.replaceAll('-', ' ')}</BlackTypography>
        </Grid>
    )
}

export function EditableCardItem({
    title,
    value,
    filled,
    selectOptions,
}: {
    title: string
    value: string
    filled?: boolean
    selectOptions: string[]
}) {
    const [editMode, setEditMode] = useState(false)

    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string)
    }

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column', marginY: '12px', rowGap: '5px' }}>
            <GrayTypography>{title}</GrayTypography>
            {!editMode ? (
                <Grid display="flex" alignItems="center">
                    {!filled ? (
                        <BlackTypography>
                            {value === '' || value === undefined ? '-' : value.replaceAll('-', ' ')}
                        </BlackTypography>
                    ) : (
                        <Button variant="contained" color="error" sx={{ width: '50px' }}>
                            {value}
                        </Button>
                    )}
                    <div
                        style={{ marginLeft: '5px', display: 'flex', alignItems: 'center' }}
                        onClick={() => setEditMode(true)}
                    >
                        <ModeEditIcon sx={{ color: '#a7a7a7' }} />
                    </div>
                </Grid>
            ) : (
                <FormControl fullWidth>
                    <InputLabel id="select-label" color="secondary">
                        {title}
                    </InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedValue}
                        label="Age"
                        onChange={handleChange}
                    >
                        {selectOptions.map((text, index) => (
                            <MenuItem key={index} value={text}>
                                {text}
                            </MenuItem>
                        ))}
                    </Select>
                    <Grid display="flex" justifyContent="space-around" mt={1}>
                        <Button
                            sx={{ width: '40%' }}
                            variant="outlined"
                            color="secondary"
                            onClick={() => setEditMode(false)}
                        >
                            Cancelar
                        </Button>
                        <Button sx={{ width: '40%' }} variant="outlined" color="secondary">
                            Salvar
                        </Button>
                    </Grid>
                </FormControl>
            )}
        </Grid>
    )
}
