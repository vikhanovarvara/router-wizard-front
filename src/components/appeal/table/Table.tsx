import { useState } from 'react';

import { Button } from 'shared/ui/button/Button';
import { IconButton } from 'shared/ui/icon-button/IconButton';
import { LinkRef } from 'shared/ui/link/Link';
import { Table } from 'shared/ui/table/Table';

import { Appeal, AppealStatus } from 'types/entities/Appeal';

import { colorByStatus, statusOptions } from 'constants/status';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const rowTitleList = ['Имя', 'Email', 'Телефон', 'Роутер', 'Статус', 'Действия'];

const appealTabsOptions = [
  {
    label: 'Любая',
    value: '',
  },
  ...statusOptions,
];

export type AppealTableProps = {
  appeals: Appeal[];
  // onStatus: (uuid: string) => void;
  onCreate: () => void;
  onEdit: (appeal: Appeal) => void;
  onDelete: (appeal: Appeal) => void;
};

export function AppealTable({ appeals, onCreate, onEdit, onDelete }: AppealTableProps) {
  const [tabsValue, setTabsValue] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changeTab = (value: string) => setTabsValue(value);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const statusLabelByValue = statusOptions.reduce(
    (acc, { value, label }) => ({ ...acc, [value]: label }),
    {} as Record<AppealStatus, string>,
  );

  const rows = appeals
    .filter(({ status }) => status === tabsValue || !tabsValue)
    .map(appeal => {
      const { uuid, email, name, phone, router, status, createdAt } = appeal;

      return {
        id: uuid,
        cells: [
          name,
          <LinkRef href={`mailto:${email}`}>{email}</LinkRef>,
          <LinkRef href={`tel:${phone}`}>{phone}</LinkRef>,
          router,
          <b style={{ color: colorByStatus[status] }}>{statusLabelByValue[status]}</b>,
          <>
            <IconButton onClick={() => onEdit(appeal)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(appeal)}>
              <DeleteIcon />
            </IconButton>
          </>,
        ],
      };
    });

  const tabs = {
    value: tabsValue,
    options: appealTabsOptions,
    onChange: changeTab,
  };

  return (
    <Table
      title='Список заявок'
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
