import { apiAdmin } from '../constant/apiAdmin';
import { CustomerModel } from '../model/customer.model';

const API_BASE_URL = '/api/Customer';

export const customerServices = {
  getAll: async (): Promise<CustomerModel[]> => {
    try {
      const response = await apiAdmin.get(`${API_BASE_URL}/get-all`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching customers list');
    }
  },

  getById: async (id: number): Promise<CustomerModel> => {
    try {
      const response = await apiAdmin.get(`${API_BASE_URL}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching customer by ID');
    }
  },

  create: async (customer: CustomerModel): Promise<void> => {
    try {
      await apiAdmin.post(`${API_BASE_URL}/create`, customer);
    } catch (error) {
      throw new Error('Error creating customer');
    }
  },

  update: async (customer: CustomerModel): Promise<void> => {
    try {
      await apiAdmin.put(`${API_BASE_URL}/update`, customer);
    } catch (error) {
      throw new Error('Error updating customer');
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiAdmin.delete(`${API_BASE_URL}/delete/${id}`);
    } catch (error) {
      throw new Error('Error deleting customer');
    }
  },
};
