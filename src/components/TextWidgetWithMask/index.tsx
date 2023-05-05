import { TextField } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'
import { useRef } from 'react'
import InputMask from 'react-input-mask'

function TextWidgetWithMask(props: WidgetProps) {
    const windowSize = useRef([window.innerWidth])

    const calculateTextFieldWidth = () => {
        if (!props.options.ui) {
            return 'auto'
        }
        const screenWidth = windowSize.current[0]
        const ui = props.options.ui as number
        if (screenWidth <= 1200) {
            return `${(ui * 90) / 12}vw`
        }
        return `${(ui * 70) / 12}vw`
    }

    return (
        <InputMask
            mask={props.options.mask as string}
            type="text"
            className="custom"
            value={props.value}
            maskPlaceholder={null}
            required={props.required}
            onChange={(event: any) => props.onChange(event.target.value)}
        >
            <TextField
                id="outlined-basic"
                label={props.label}
                placeholder={props.placeholder}
                sx={{
                    width: calculateTextFieldWidth(),
                    margin: '0 15px 10px 0',
                }}
            />
        </InputMask>
    )
}

export default TextWidgetWithMask
