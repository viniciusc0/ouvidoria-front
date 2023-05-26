import {
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import React, { useState } from 'react'
import { ISelectValue } from 'types/ISelectValue'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
}

function SelectWithCheckboxes({
    label,
    value,
    setValue,
    options,
}: {
    label: string
    value: string[]
    setValue: React.Dispatch<React.SetStateAction<string[]>>
    options: ISelectValue[]
}) {
    const [itemLabel, setItemLabel] = useState<string[]>([])
    const handleChange = (event: SelectChangeEvent<typeof itemLabel>) => {
        const {
            target: { value },
        } = event
        setItemLabel(typeof value === 'string' ? value.split(',') : value)
    }

    function handleOnChange(item: any) {
        let newArray: any
        if (value.find(arrItem => arrItem === item)) {
            newArray = value.filter(value => value !== item)
        } else {
            newArray = value
            newArray.push(item)
        }
        setValue(newArray)
        console.log(newArray)
    }

    return (
        <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    multiple
                    label={label}
                    sx={{ width: '100%' }}
                    value={itemLabel || ''}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {options.map((item, index) => (
                        <MenuItem key={index} value={item.label} onClick={() => handleOnChange(item.value)}>
                            <Checkbox checked={value.findIndex(x => x === item.value) > -1} />
                            <ListItemText primary={item.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default SelectWithCheckboxes
