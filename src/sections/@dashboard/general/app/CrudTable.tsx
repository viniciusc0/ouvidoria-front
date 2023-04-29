import { useState } from 'react'
// @mui
import { Box, Card, CardHeader, CardProps, Divider, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
// utils
// components
import { useRouter } from 'next/router'
import { CompanyGetProps } from 'services/requests/company/types'
import { DeliverymanGetProps } from 'services/requests/deliveryman/types'
import { UserGetProps } from 'services/requests/user/types'
import { getShowableItem } from 'src/utils/functions'
import styled from 'styled-components'
import Iconify from '../../../../components/iconify'
import MenuPopover from '../../../../components/menu-popover'
import Scrollbar from '../../../../components/scrollbar'
import { TableHeadCustom } from '../../../../components/table'

// ----------------------------------------------------------------------

type RowArrayTypes = UserGetProps[] | DeliverymanGetProps[] | CompanyGetProps[]
type RowTypes = UserGetProps | DeliverymanGetProps | CompanyGetProps

interface Props extends CardProps {
    title?: string
    subheader?: string
    tableData: RowArrayTypes
    setTableData: (data: any) => void
    tableLabels: any
}

export default function CrudTable({ title, subheader, tableData, setTableData, tableLabels, ...other }: Props) {
    const router = useRouter()

    return (
        <TableCard>
            <Card {...other}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px' }}>
                    <CardHeader title={title} subheader={subheader} sx={{ mb: 2 }} />
                </Box>

                <TableContainer sx={{ overflow: 'unset' }}>
                    <Scrollbar>
                        <Table sx={{ minWidth: 720 }}>
                            <TableHeadCustom headLabel={tableLabels} />

                            <TableBody>
                                {tableData.map(row => (
                                    <GenericTableRow key={row.id} row={row} setTableData={setTableData} />
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Divider />

                {/* <Box sx={{ p: 2, textAlign: 'right' }}>
                    <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
                        View All
                    </Button>
                </Box> */}
            </Card>
        </TableCard>
    )
}

const TableCard = styled.div`
    border: 1.5px solid #c0c0c0;
    border-radius: 15px;
    padding: 5px;
`

// ----------------------------------------------------------------------

type RowProps = {
    row: RowTypes
    setTableData: (data: any) => void
}

function GenericTableRow({ row, setTableData }: RowProps) {
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

    const router = useRouter()

    return (
        <>
            <TableRow>
                {Object.keys(row).map((key, index) => {
                    const res = getShowableItem(row, key)
                    if (res === '') return <TableCell key={index} style={{ display: 'none' }} />
                    return <TableCell key={index}>{res}</TableCell>
                })}

                <TableCell align="right">
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
