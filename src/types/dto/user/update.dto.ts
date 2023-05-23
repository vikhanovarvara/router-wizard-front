import { Role } from 'types/common/role';

export type UserUpdateDto = Readonly<{
  uuid: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: Role;
}>;
