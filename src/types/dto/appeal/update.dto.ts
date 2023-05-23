import { AppealStatus } from 'types/entities/Appeal';

export type AppealUpdateDto = Readonly<{
  uuid: string;
  name?: string;
  email?: string;
  phone?: string;
  router?: string;
  address?: string;
  status?: AppealStatus;
  description?: string;
}>;
