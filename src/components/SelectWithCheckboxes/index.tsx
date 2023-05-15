import {
    Checkbox,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { WidgetProps } from '@rjsf/utils'
import React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
}

type Iitem = {
    label: string
    value: any
}

function SelectWithCheckboxes(props: WidgetProps) {
    const [itemLabel, setItemLabel] = React.useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof itemLabel>) => {
        const {
            target: { value },
        } = event
        setItemLabel(typeof value === 'string' ? value.split(',') : value)
    }

    function handleOnChange(item: any) {
        let newArray: any

        if (props.value.find(arrItem => arrItem.id === item.id)) {
            newArray = props.value.filter(value => value.id !== item.id)
        } else {
            newArray = props.value
            newArray.push(item)
        }

        props.onChange(newArray)
    }

    const items = props.options.enumOptions as Iitem[]

    return (
        <Grid item xs={12}>
            <InputLabel id="demo-multiple-checkbox-label">Empresas</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                sx={{ width: '100%' }}
                value={itemLabel}
                onChange={handleChange}
                input={<OutlinedInput label={props.label} />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} value={item.value.name} onClick={() => handleOnChange(item.value)}>
                        <Checkbox checked={props.value.findIndex(x => x.id === item.value.id) > -1} />
                        <ListItemText primary={item.value.name} />
                    </MenuItem>
                ))}
            </Select>
        </Grid>
    )
}

export default SelectWithCheckboxes
