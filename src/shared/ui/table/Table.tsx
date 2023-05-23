/* eslint-disable */
import { ChangeEvent, ReactNode } from 'react';

import { LabelDisplayedRowsArgs, TablePagination } from '@mui/material';
import MUITable from '@mui/material/Table';
import MUITableBody from '@mui/material/TableBody';
import MUITableCell from '@mui/material/TableCell';
import MUITableContainer from '@mui/material/TableContainer';
import MUITableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';

import { color } from 'themes';

import { Box } from '../box/Box';
import { Paper } from '../paper/Paper';
import { Tabs, TabsProps } from '../tabs/Tabs';
import { Typography } from '../typography/Typography';

import sx from './Table.styles';

export type Row = {
  id: number | string;
  cells: ReactNode[];
};

type Props<T = string | number> = {
  title: string;
  actions?: ReactNode;
  tabs?: TabsProps<T>;
  rowTitleList: string[];
  rows: Row[];
  rowsCount?: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Table<T = string | number>({
  title,
  actions,
  tabs,
  rowTitleList,
  rows,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  page,
  rowsCount,
  onPageChange,
  onRowsPerPageChange,
}: Props<T>) {
  const shownRows = rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows;

  const getDisplayedRowsLabel = ({ from, to, count }: LabelDisplayedRowsArgs) =>
    `${from}–${to} из ${count !== -1 ? count : `больше, чем ${to}`}`;

  return (
    <Paper sx={sx.wrapper}>
      <Box sx={sx.toolbar}>
        <Typography variant='h5' sx={sx.title}>
          {title}
        </Typography>

        {!!actions && <Box sx={sx.actions}>{actions}</Box>}
      </Box>

      {tabs && <Tabs value={tabs.value} options={tabs.options} onChange={tabs.onChange} />}

      {rows.length ? (
        <MUITableContainer>
          <MUITable sx={sx.table}>
            <MUITableHead sx={sx.head}>
              <MUITableRow>
                {rowTitleList.map(rowTitle => (
                  <MUITableCell key={rowTitle} align='left' sx={{ ...sx.cell, ...sx.headCell }}>
                    {rowTitle}
                  </MUITableCell>
                ))}
              </MUITableRow>
            </MUITableHead>

            <MUITableBody>
              {shownRows.map(row => (
                <MUITableRow key={row.id}>
                  {row.cells.map((cell, i) => (
                    <MUITableCell key={`${row.id}/${i}`} align='left' sx={{ ...sx.cell, ...sx.bodyCell }}>
                      {cell}
                    </MUITableCell>
                  ))}
                </MUITableRow>
              ))}
            </MUITableBody>
          </MUITable>

          {rows.length > 5 && (
            <TablePagination
              labelRowsPerPage='Записей на странице:'
              labelDisplayedRows={getDisplayedRowsLabel}
              rowsPerPageOptions={rowsPerPageOptions}
              component='div'
              count={rowsCount || rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          )}
        </MUITableContainer>
      ) : (
        <Typography variant='h6' color={color.muted}>
          Нет записей
        </Typography>
      )}
    </Paper>
  );
}
