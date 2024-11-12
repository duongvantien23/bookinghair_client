import { apiAdmin } from '../constant/apiAdmin'; 
import { PartnerModel } from '../model/partner.model'; 

export const partnerServices = {
  // Lấy tất cả các đối tác
  getAll: async (): Promise<PartnerModel[]> => {
    const response = await apiAdmin.get('/api/Partner/get-all');
    return response.data;
  },

  // Lấy thông tin đối tác theo ID
  getById: async (id: number): Promise<PartnerModel> => {
    const response = await apiAdmin.get(`/api/Partner/get-by-id/${id}`);
    return response.data;
  },

  // Tạo đối tác mới
  create: async (partner: PartnerModel): Promise<any> => {
    const response = await apiAdmin.post('/api/Partner/create', partner);
    return response.data;
  },

  // Cập nhật thông tin đối tác
  update: async (partner: PartnerModel): Promise<any> => {
    const response = await apiAdmin.put('/api/Partner/update', partner);
    return response.data;
  },

  // Xóa đối tác theo ID
  delete: async (id: number): Promise<any> => {
    const response = await apiAdmin.delete(`/api/Partner/delete/${id}`);
    return response.data;
  },
};
