import { Grid, TextField } from '@mui/material'
import { WidgetProps } from '@rjsf/utils'
import InputMask from 'react-input-mask'

function TextWidgetWithMask(props: WidgetProps) {
    return (
        // <Grid item xs={props.options.ui != undefined ? props.options.ui.toString() : 4}>
        <Grid item>
            <InputMask
                mask={props.options.mask as string}
                type="text"
                className="custom"
                value={props.value}
                maskPlaceholder={null}
                required={props.required}
                onChange={(event: any) => props.onChange(event.target.value)}
            >
                <TextField id="outlined-basic" label={props.label} placeholder={props.placeholder} />
            </InputMask>
        </Grid>
    )
}

export default TextWidgetWithMask
