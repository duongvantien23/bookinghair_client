import { SalonModel } from '../model/salon.model';  // Import model Salon
import { apiAdmin } from '../constant/apiAdmin';  // Sử dụng apiAdmin

// URL cơ bản cho salon API
const baseUrl = '/api/Salon';

export const salonServices = {
    // Lấy tất cả salons
    getAll: async (): Promise<SalonModel[]> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching salons: ", error);
            throw error;
        }
    },

    // Lấy salon theo ID
    getById: async (salonId: number): Promise<SalonModel> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-by-id/${salonId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching salon by ID: ", error);
            throw error;
        }
    },

    // Tạo salon mới
    create: async (salon: SalonModel): Promise<void> => {
        try {
            await apiAdmin.post(`${baseUrl}/create`, salon);
        } catch (error) {
            console.error("Error creating salon: ", error);
            throw error;
        }
    },

    // Cập nhật salon
    update: async (salon: SalonModel): Promise<void> => {
        try {
            await apiAdmin.put(`${baseUrl}/update`, salon);
        } catch (error) {
            console.error("Error updating salon: ", error);
            throw error;
        }
    },

    // Xóa salon theo ID
    delete: async (salonId: number): Promise<void> => {
        try {
            await apiAdmin.delete(`${baseUrl}/delete/${salonId}`);
        } catch (error) {
            console.error("Error deleting salon: ", error);
            throw error;
        }
    }
};
