import { ServiceCategorieModel } from '../../model/servicecategorie.model';
import { ServiceModel } from '../../model/services.model'; 
import { apiClient } from '../../constant/apiClient';

const baseUrl = '/api/ServiceCategorieClient';

export const serviceCategorieClientServices = {
  // Get all service categories
  getAll: async (): Promise<ServiceCategorieModel[]> => {
    try {
      const response = await apiClient.get(`${baseUrl}/get-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }
  },

  // Get a service category by ID
  getById: async (id: number): Promise<ServiceCategorieModel> => {
    try {
      const response = await apiClient.get(`${baseUrl}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service category by ID:', error);
      throw error;
    }
  },

  // Get services by category ID
  getServicesByCategoryId: async (categoryId: number): Promise<ServiceModel[]> => {
    try {
      const response = await apiClient.get(`${baseUrl}/get-services-by-category-id/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services by category ID:', error);
      throw error;
    }
  }
};
