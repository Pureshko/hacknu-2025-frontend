import axios from 'axios';
import type { Accommodation, AccommodationListResponse, DashboardStats } from '@/types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

export const accommodationApi = {
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    region?: string;
    accommodation_type?: string;
    lead_status?: string;
    min_priority?: number;
  }): Promise<AccommodationListResponse> => {
    const response = await api.get('/accommodations', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Accommodation> => {
    const response = await api.get(`/accommodations/${id}`);
    return response.data;
  },

  startScan: async (region: string = 'Almaty') => {
    const response = await api.post('/scan/start', null, { params: { region } });
    return response.data;
  },

  startGoogleScan: async (region: string = 'Almaty') => {
    const response = await api.post('/scan/google-places', null, { params: { region } });
    return response.data;
  },

  generateOutreach: async (id: number, channel: string) => {
    const response = await api.post(
      `/accommodations/${id}/outreach`,
      null,
      { params: { channel } }
    );
    return response.data;
  },

  getDashboard: async (): Promise<DashboardStats> => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  exportCSV: async () => {
    const response = await api.get('/export/csv', {
      responseType: 'blob',
    });
    return response.data;
  },
};