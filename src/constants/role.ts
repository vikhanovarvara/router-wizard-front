import { Option } from 'types/common/option';
import { Role } from 'types/common/role';

export const roleOptions: Option<Role>[] = [
  {
    label: 'Админ',
    value: 'ADMIN',
  },
  {
    label: 'Специалист',
    value: 'EMPLOYEE',
  },
];
