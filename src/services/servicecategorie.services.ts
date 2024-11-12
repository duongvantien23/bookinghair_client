import { ServiceCategorieModel } from '../model/servicecategorie.model';
import { ServiceModel } from '../model/services.model'; // Import mô hình ServiceModel
import { apiAdmin } from '../constant/apiAdmin';

const baseUrl = '/api/ServiceCategorie';

export const serviceCategorieServices = {
  // Lấy tất cả danh mục dịch vụ
  getAll: async (): Promise<ServiceCategorieModel[]> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }
  },

  // Lấy thông tin danh mục dịch vụ theo ID
  getById: async (id: number): Promise<ServiceCategorieModel> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service category by ID:', error);
      throw error;
    }
  },

  // Lấy danh sách dịch vụ theo ID danh mục
  getServicesByCategoryId: async (categoryId: number): Promise<ServiceModel[]> => {
    try {
      const response = await apiAdmin.get(`${baseUrl}/get-services-by-category-id/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services by category ID:', error);
      throw error;
    }
  },

  // Tạo danh mục dịch vụ mới
  create: async (category: Omit<ServiceCategorieModel, 'categoryId'>): Promise<ServiceCategorieModel> => {
    try {
      const response = await apiAdmin.post(`${baseUrl}/create`, category);
      return response.data;
    } catch (error) {
      console.error('Error creating service category:', error);
      throw error;
    }
  },

  // Cập nhật danh mục dịch vụ
  update: async (category: ServiceCategorieModel): Promise<ServiceCategorieModel> => {
    try {
      const response = await apiAdmin.put(`${baseUrl}/update`, category);
      return response.data;
    } catch (error) {
      console.error('Error updating service category:', error);
      throw error;
    }
  },

  // Xóa danh mục dịch vụ theo ID
  delete: async (id: number): Promise<void> => {
    try {
      await apiAdmin.delete(`${baseUrl}/delete/${id}`);
    } catch (error) {
      console.error('Error deleting service category:', error);
      throw error;
    }
  }
};
