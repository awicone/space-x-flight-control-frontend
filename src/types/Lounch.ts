import { LaunchStatus } from './Launches';

export type Launch = {
  id: string,
  name: string,
  order: number,
  details: string,
  success: boolean | null,
  date_local: string,
  status: LaunchStatus,
  links: {
    patch: {
      large: string | null,
      small: string | null
    }
  }
}
