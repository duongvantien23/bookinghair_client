import axios from 'axios';
import { PromotionModel } from '../model/promotion.model';

const baseUrl = '/api/Promotion';

export const promotionServices = {
  getAll: async (): Promise<PromotionModel[]> => {
    const response = await axios.get(`${baseUrl}/get-all`);
    return response.data;
  },

  getById: async (id: number): Promise<PromotionModel> => {
    const response = await axios.get(`${baseUrl}/get-by-id/${id}`);
    return response.data;
  },

  create: async (promotion: Omit<PromotionModel, 'promotionId'>): Promise<PromotionModel> => {
    const response = await axios.post(`${baseUrl}/create`, promotion);
    return response.data;
  },

  update: async (promotion: PromotionModel): Promise<PromotionModel> => {
    const response = await axios.put(`${baseUrl}/update`, promotion);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/delete/${id}`);
  },
};
