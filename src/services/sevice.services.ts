import { ServiceModel } from '../model/services.model';
import { ServiceDetailsModel } from '../model/servicedetail.model';
import { apiAdmin } from '../constant/apiAdmin'; 

const baseUrl = '/api/Service';

export const serviceServices = {
  // Lấy tất cả các dịch vụ
  getAll: async (): Promise<ServiceModel[]> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Lấy dịch vụ theo ID
  getById: async (id: number): Promise<ServiceModel> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  },
 // Lấy danh sách chi tiết dịch vụ theo ID dịch vụ
 getServiceDetailsByServiceId: async (serviceId: number): Promise<ServiceDetailsModel[]> => {
  try {
    const response = await apiAdmin.get(`${baseUrl}/get-service-details-by-service-id/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service details by service ID:', error);
    throw error;
  }
},
  // Tạo mới dịch vụ
  create: async (service: Omit<ServiceModel, 'serviceId'>): Promise<ServiceModel> => {
    try {
      const response = await apiAdmin.post(`${baseUrl}/create`, service);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  // Cập nhật dịch vụ
  update: async (service: ServiceModel): Promise<ServiceModel> => {
    try {
      const response = await apiAdmin.put(`${baseUrl}/update`, service);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  // Xóa dịch vụ theo ID
  delete: async (id: number): Promise<void> => {
    try {
      await apiAdmin.delete(`${baseUrl}/delete/${id}`);
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },
};
