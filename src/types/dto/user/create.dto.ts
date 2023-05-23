import { Role } from 'types/common/role';

export type UserCreateDto = Readonly<{
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: Role;
}>;
