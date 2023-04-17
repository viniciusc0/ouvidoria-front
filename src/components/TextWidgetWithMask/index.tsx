import { TextField } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'
import React from 'react'
import InputMask from "react-input-mask";


function TextWidgetWithMask(props: WidgetProps) {
    return(
        <InputMask
            mask={props.options.mask as string}
            type='text'
            className='custom'
            value={props.value}
            maskPlaceholder={null}
            required={props.required}
            onChange={(event : any) => props.onChange(event.target.value)}
        >
            <TextField
                id="outlined-basic"
                label={props.label}
                placeholder={props.placeholder}
            />
        </InputMask>
    )
}

export default TextWidgetWithMask