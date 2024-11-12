import { ServiceDetailsModel } from '../model/servicedetail.model';
import { apiAdmin } from '../constant/apiAdmin'; // Import apiAdmin

const baseUrl = '/api/ServiceDetail';

export const serviceDetailServices = {
  // Lấy tất cả chi tiết dịch vụ
  getAll: async (): Promise<ServiceDetailsModel[]> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service details:', error);
      throw error;
    }
  },

  // Lấy chi tiết dịch vụ theo ID
  getById: async (id: number): Promise<ServiceDetailsModel> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service detail by ID:', error);
      throw error;
    }
  },

  // Tạo mới chi tiết dịch vụ
  create: async (serviceDetail: Omit<ServiceDetailsModel, 'serviceDetailId'>): Promise<ServiceDetailsModel> => {
    try {
      const response = await apiAdmin.post(`${baseUrl}/create`, serviceDetail);
      return response.data;
    } catch (error) {
      console.error('Error creating service detail:', error);
      throw error;
    }
  },

  // Cập nhật chi tiết dịch vụ
  update: async (serviceDetail: ServiceDetailsModel): Promise<ServiceDetailsModel> => {
    try {
      const response = await apiAdmin.put(`${baseUrl}/update`, serviceDetail);
      return response.data;
    } catch (error) {
      console.error('Error updating service detail:', error);
      throw error;
    }
  },

  // Xóa chi tiết dịch vụ theo ID
  delete: async (id: number): Promise<void> => {
    try {
      await apiAdmin.delete(`${baseUrl}/delete/${id}`);
    } catch (error) {
      console.error('Error deleting service detail:', error);
      throw error;
    }
  },
};
