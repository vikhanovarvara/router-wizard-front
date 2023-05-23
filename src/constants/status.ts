import { Option } from 'types/common/option';
import { AppealStatus } from 'types/entities/Appeal';

import { color } from 'themes';

export const statusOptions: Option<AppealStatus>[] = [
  {
    label: 'Ожидает',
    value: 'INITIATED',
  },
  {
    label: 'Принята',
    value: 'ACCEPTED',
  },
  {
    label: 'В пути',
    value: 'ON_THE_WAY',
  },
  {
    label: 'Исполнение',
    value: 'IN_EXECUTION',
  },
  {
    label: 'Закрыта',
    value: 'CLOSED',
  },
  {
    label: 'Выполнена',
    value: 'EXECUTED',
  },
];

export const colorByStatus: Record<AppealStatus, string> = {
  INITIATED: color.muted,
  ACCEPTED: color.primary,
  ON_THE_WAY: color.warning,
  IN_EXECUTION: color.warning,
  CLOSED: color.error,
  EXECUTED: color.success,
};
