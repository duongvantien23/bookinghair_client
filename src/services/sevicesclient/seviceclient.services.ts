import { ServiceModel } from '../../model/services.model';
import { ServiceDetailsModel } from '../../model/servicedetail.model';
import { apiClient } from '../../constant/apiClient';

const baseUrl = '/api/ServiceClient';

export const serviceClientServices = {
  // Get all services
  getAll: async (): Promise<ServiceModel[]> => {
    try {
      const response = await apiClient.get(`${baseUrl}/get-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getById: async (id: number): Promise<ServiceModel> => {
    try {
      const response = await apiClient.get(`${baseUrl}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  },

  // Get service details by service ID
  getServiceDetailsByServiceId: async (serviceId: number): Promise<ServiceDetailsModel[]> => {
    try {
      const response = await apiClient.get(`${baseUrl}/get-service-details-by-service-id/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service details by service ID:', error);
      throw error;
    }
  }
};
