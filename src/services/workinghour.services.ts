import axios from 'axios';
import { WorkingHourModel } from '../model/workinghour.model';

const baseUrl = '/api/WorkingHour';

export const workingHourServices = {
  getAllByHairstylist: async (hairstylistId: number): Promise<WorkingHourModel[]> => {
    const response = await axios.get(`${baseUrl}/get-all-by-hairstylist/${hairstylistId}`);
    return response.data;
  },
  
  getById: async (id: number): Promise<WorkingHourModel> => {
    const response = await axios.get(`${baseUrl}/get-by-id/${id}`);
    return response.data;
  },
  
  create: async (workingHour: Omit<WorkingHourModel, 'workingHourId'>): Promise<WorkingHourModel> => {
    const response = await axios.post(`${baseUrl}/create`, workingHour);
    return response.data;
  },
  
  update: async (workingHour: WorkingHourModel): Promise<WorkingHourModel> => {
    const response = await axios.put(`${baseUrl}/update`, workingHour);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/delete/${id}`);
  },

  checkAvailability: async (hairstylistId: number, workDay: string, startTime: string, endTime: string): Promise<boolean> => {
    const response = await axios.get(`${baseUrl}/check-availability`, {
      params: { hairstylistId, workDay, startTime, endTime },
    });
    return response.data;
  },
};
