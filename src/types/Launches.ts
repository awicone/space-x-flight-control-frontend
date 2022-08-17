import { Launch } from './Lounch';

export type LaunchStatus = 'ended' | 'upcoming' | 'reserved'

export type Launches = {
  [property in string]: Launch[];
};
