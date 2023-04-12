import { useState } from 'react';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import MenuPopover from '../../../../components/menu-popover';
import { TableHeadCustom } from '../../../../components/table';
import { UserGetProps } from 'services/requests/user/interfaces';
import { getShowableItem } from 'src/utils/functions';
import { DeliverymanGetProps } from 'services/requests/deliveryman/interfaces';

// ----------------------------------------------------------------------

type RowArrayTypes = UserGetProps[] | DeliverymanGetProps[];
type RowTypes = UserGetProps | DeliverymanGetProps;

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowArrayTypes;
  tableLabels: any;
}

export default function CrudTable({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  row: RowTypes;
};

function AppNewInvoiceRow({ row }: RowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };


  const handleShare = () => {
    handleClosePopover();
    console.log('SHARE', row.id);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        {
          Object.keys(row).map((key, index) => {
            const res = getShowableItem(row, key);
            if (res === '') return <TableCell key={index} style={{ display: 'none' }} />;
            return <TableCell key={index}>{res}</TableCell>
          })

        }

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleShare}>
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
  );
}
