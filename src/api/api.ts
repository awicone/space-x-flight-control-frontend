import { backend, jsonServer } from './axios';
import { AxiosResponse } from 'axios';
import { Launch } from '../types/Lounch';

const urls = {
  launches: {
    past: '/past',
    upcoming: '/upcoming'
  },
  launch: '/launches',
  booking: '/reserved'
};

export const api = {
  url: backend.defaults.baseURL,
  launches: {
    upcoming: {
      url: urls.launches.upcoming,
      request: async (): Promise<AxiosResponse<Launch[]>> => {
        try {
          return await backend.get(
            urls.launches.upcoming);
        } catch (error: any) {
          return error.response as AxiosResponse;
        }
      }
    },
    past: {
      url: urls.launches.upcoming,
      request: async (): Promise<AxiosResponse<Launch[]>> => {
        try {
          return await backend.get(
            urls.launches.past);
        } catch (error: any) {
          return error.response as AxiosResponse;
        }
      }
    }
  },
  launch: {
    request: async (id: string): Promise<AxiosResponse<Launch>> => {
      try {
        return await backend.get(id);
      } catch (error: any) {
        return error.response as AxiosResponse;
      }
    }
  },
  bookings: {
    myBooking: {
      request: async (): Promise<AxiosResponse<Launch[]>> => {
        try {
          return await jsonServer.get(urls.booking);
        } catch (error: any) {
          return error.response as AxiosResponse;
        }
      }
    },
    book: {
      request: async (id: string): Promise<AxiosResponse<boolean>> => {
        try {
          return await jsonServer.post(urls.booking, {
            id
          });
        } catch (error: any) {
          return error.response as AxiosResponse;
        }
      }
    },
    cancelBooking: {
      request: async (id: string): Promise<AxiosResponse<boolean>> => {
        try {
          return await jsonServer.delete(`${urls.booking}/${id}`);
        } catch (error: any) {
          return error.response as AxiosResponse;
        }
      }
    }
  }
};

export default api;
