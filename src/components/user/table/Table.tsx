import { useState } from 'react';

import { Button } from 'shared/ui/button/Button';
import { IconButton } from 'shared/ui/icon-button/IconButton';
import { LinkRef } from 'shared/ui/link/Link';
import { Table } from 'shared/ui/table/Table';
import { Typography } from 'shared/ui/typography/Typography';

import { Role } from 'types/common/role';
import { User } from 'types/entities/User';

import { roleOptions } from 'constants/role';

import { color } from 'themes';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const rowTitleList = ['Имя', 'Email', 'Телефон', 'Тип', ''];

const userTabsOptions = [
  {
    label: 'Любой',
    value: '',
  },
  ...roleOptions,
];

export type UserTableProps = {
  users: User[];
  onCreate: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UserTable({ users, onCreate, onEdit, onDelete }: UserTableProps) {
  const [tabsValue, setTabsValue] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changeTab = (value: string) => setTabsValue(value);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const roleLabelByValue = roleOptions.reduce(
    (acc, { value, label }) => ({ ...acc, [value]: label }),
    {} as Record<Role, string>,
  );

  const rows = users
    .filter(({ role }) => role === tabsValue || !tabsValue)
    .map(user => {
      const { uuid, name, email, phone, role } = user;

      return {
        id: uuid,
        cells: [
          name,
          email ? (
            <LinkRef href={`mailto:${email}`}>{email}</LinkRef>
          ) : (
            <Typography variant='body2' color={color.muted}>
              Не указана
            </Typography>
          ),
          phone ? (
            <LinkRef href={`tel:${phone}`}>{phone}</LinkRef>
          ) : (
            <Typography variant='body2' color={color.muted}>
              Не указан
            </Typography>
          ),
          roleLabelByValue[role],
          <>
            <IconButton component='button' onClick={() => onEdit(user)}>
              <EditIcon />
            </IconButton>
            <IconButton component='button' onClick={() => onDelete(user)}>
              <DeleteIcon />
            </IconButton>
          </>,
        ],
      };
    });

  const tabs = {
    value: tabsValue,
    options: userTabsOptions,
    onChange: changeTab,
  };

  return (
    <Table
      title='Список пользователей'
      actions={<Button onClick={onCreate}>Создать</Button>}
      tabs={tabs}
      rowTitleList={rowTitleList}
      rows={rows}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={changePage}
      onRowsPerPageChange={changeRowsPerPage}
    />
  );
}
