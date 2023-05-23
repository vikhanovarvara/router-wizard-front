import { Base } from './Base';

export type AppealStatus = 'INITIATED' | 'ON_THE_WAY' | 'IN_EXECUTION' | 'ACCEPTED' | 'EXECUTED' | 'CLOSED';

export type Appeal = Base & {
  name: string;
  email: string;
  phone: string;
  router: string;
  address: string;
  status: AppealStatus;
  description?: string;
};
