import { LaunchStatus } from './Launches';

export type CardInfo = {
  id: string,
  name: string,
  details: string,
  success: boolean | null,
  date_local: string,
  status: LaunchStatus,
  loading?: boolean,
  order: number
}
