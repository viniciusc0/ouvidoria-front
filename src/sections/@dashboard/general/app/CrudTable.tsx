import { useState } from 'react'
// @mui
import {
    Card,
    CardProps,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material'
// utils
// components
import { useRouter } from 'next/router'
import { CompanyGetProps } from 'services/requests/company/types'
import { DeliverymanGetProps } from 'services/requests/deliveryman/types'
import { UserGetProps } from 'services/requests/user/types'
import Iconify from '../../../../components/iconify'
import MenuPopover from '../../../../components/menu-popover'
import Scrollbar from '../../../../components/scrollbar'
import { TableHeadCustom } from '../../../../components/table'

// ----------------------------------------------------------------------

type RowArrayTypes = any
type RowTypes = UserGetProps | DeliverymanGetProps | CompanyGetProps
type ILabels = {
    id: string
    label: string
}

interface Props extends CardProps {
    title?: string
    subheader?: string
    tableData: RowArrayTypes
    setTableData: (data: any) => void
    tableLabels: ILabels[]
}

export default function CrudTable({ title, subheader, tableData, setTableData, tableLabels, ...other }: Props) {
    const router = useRouter()

    return (
        <Card {...other} sx={{ boxShadow: '1px 1px 10px #ccc', borderRadius: 1 }}>
            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{ minWidth: 720 }}>
                        <TableHeadCustom headLabel={tableLabels} />

                        <TableBody>
                            {tableData.map(row => (
                                <GenericTableRow
                                    key={row.id}
                                    row={row}
                                    setTableData={setTableData}
                                    tableLabels={tableLabels}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
        </Card>
    )
}

// ----------------------------------------------------------------------

type RowProps = {
    row: RowTypes
    setTableData: (data: any) => void
    tableLabels: ILabels[]
}

function GenericTableRow({ row, setTableData, tableLabels }: RowProps) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    const handleEdit = () => {
        handleClosePopover()
        router.push(router.pathname + `/edicao/${row.id}`)
    }

    const handleDelete = () => {
        handleClosePopover()
        setTableData((data: any) => data.filter((item: any) => item.id !== row.id))
        //falta requisição de remoção
    }
    const formatValues = (value: any) => {
        switch (value) {
            case true:
                return 'Ativo'
            case false:
                return 'Inativo'
            default:
                return value.toString()
        }
    }

    const router = useRouter()

    return (
        <>
            <TableRow>
                {Object.keys(row).map(keyRow =>
                    tableLabels.map(tl => tl.id == keyRow && <TableCell> {formatValues(row[keyRow])} </TableCell>),
                )}

                <TableCell align="left">
                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
                <MenuItem onClick={handleEdit}>
                    <Iconify icon="eva:edit-fill" />
                    Editar
                </MenuItem>

                {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" />
                    Excluir
                </MenuItem>
            </MenuPopover>
        </>
    )
}
