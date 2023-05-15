// @mui
import { Box, Checkbox, SxProps, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

type Props = {
    order?: 'asc' | 'desc'
    orderBy?: string
    headLabel: any[]
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
    const router = useRouter()

    return (
        <TableHead sx={sx}>
            <TableRow>
                {onSelectAllRows && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                onSelectAllRows(event.target.checked)
                            }
                        />
                    </TableCell>
                )}

                {headLabel.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                    >
                        {onSort ? (
                            <TableSortLabel
                                hideSortIcon
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={() => onSort(headCell.id)}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {headCell.label}

                                {orderBy === headCell.id ? (
                                    <Box sx={{ ...visuallyHidden }}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
