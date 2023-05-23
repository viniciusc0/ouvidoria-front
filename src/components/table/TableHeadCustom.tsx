import { Theme } from '@mui/material/styles'
import {
    Box,
    SxProps,
    TableRow,
    TableCell,
    TableHead,
    TableSortLabel,
} from '@mui/material'
import { TableSchemaColumnProps } from './types/tableTypes'

const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
} as const

type Props = {
    order?: 'asc' | 'desc'
    orderBy?: string
    headLabel: TableSchemaColumnProps[]
    rowCount?: number
    numSelected?: number
    onSort?: (id: string) => void
    onSelectAllRows?: (checked: boolean) => void
    sx?: SxProps<Theme>
}

export default function TableHeadCustom({
    order,
    orderBy,
    rowCount = 0,
    headLabel,
    numSelected = 0,
    onSort,
    onSelectAllRows,
    sx,
}: Props) {
    return (
        <TableHead sx={sx}>
            <TableRow>
                {headLabel.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            width: headCell.width,
                            minWidth: headCell.minWidth,
                        }}
                    >
                        {onSort ? (
                            <TableSortLabel
                                hideSortIcon
                                active={
                                    orderBy != ''
                                        ? orderBy === headCell.id
                                        : false
                                }
                                direction={
                                    orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={() => onSort(headCell.id)}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {headCell.label}

                                {orderBy === headCell.id ? (
                                    <Box sx={{ ...visuallyHidden }}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
