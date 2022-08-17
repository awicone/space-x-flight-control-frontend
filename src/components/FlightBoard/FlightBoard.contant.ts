import { Launches } from '../../types/Launches';
import { Column } from '../../types/ColumnList';

export const initialLists: Column[] = [
  {
    title: 'PAST LAUNCHES',
    status: 'ended'
  },
  {
    title: 'UPCOMING LAUNCHES',
    status: 'upcoming'
  },
  {
    title: 'MY LAUNCHES',
    status: 'reserved'
  }
];

export const initialLaunches: Launches = {
  ended: [
    {
      id: '',
      name: '',
      order: 0,
      details: '',
      success: true,
      date_local: '',
      status: 'ended'
    }
  ],
  upcoming: [
    {
      id: '',
      name: '',
      order: 0,
      details: '',
      success: true,
      date_local: '',
      status: 'upcoming'

    }
  ],
  reserved: [
    {
      id: '',
      name: '',
      order: 0,
      details: '',
      success: true,
      date_local: '',
      status: 'reserved'
    }
  ]
};
