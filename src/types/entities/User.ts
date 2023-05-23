import { Role } from 'types/common/role';

import { Base } from './Base';

export type User = Base & {
  name: string;
  email: string;
  phone?: string;
  role: Role;
};
