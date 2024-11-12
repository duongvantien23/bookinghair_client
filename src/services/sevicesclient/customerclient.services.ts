import { CustomerModel } from '../../model/customer.model';
import { apiClient } from '../../constant/apiClient';

const API_BASE_URL = '/api/CustomerClient';

export const customerClientServices = {
  // Get all customers
  getAll: async (): Promise<CustomerModel[]> => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/get-all`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching customers list');
    }
  },

  // Get customer by ID
  getById: async (id: number): Promise<CustomerModel> => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching customer by ID');
    }
  },
};
