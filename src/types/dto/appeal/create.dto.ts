import { AppealStatus } from 'types/entities/Appeal';

export type AppealCreateDto = Readonly<{
  name: string;
  email: string;
  phone: string;
  router: string;
  address: string;
  status?: AppealStatus;
  description?: string;
}>;
