import { HairStylistModel } from '../model/hairstylist.model';
import { apiAdmin } from '../constant/apiAdmin';  // Đổi apiClient thành apiAdmin

// URL cơ bản cho hairstylist API
const baseUrl = '/api/HairStylist';

export const hairstylistServices = {
    // Lấy tất cả hairstylists
    getAll: async (): Promise<HairStylistModel[]> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching hairstylists: ", error);
            throw error;
        }
    },

    // Lấy hairstylist theo ID
    getById: async (hairstylistId: number): Promise<HairStylistModel> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-by-id/${hairstylistId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching hairstylist by ID: ", error);
            throw error;
        }
    },

    // Tạo hairstylist mới
    create: async (hairstylist: HairStylistModel): Promise<void> => {
        try {
            await apiAdmin.post(`${baseUrl}/create`, hairstylist);
        } catch (error) {
            console.error("Error creating hairstylist: ", error);
            throw error;
        }
    },

    // Cập nhật hairstylist
    update: async (hairstylist: HairStylistModel): Promise<void> => {
        try {
            await apiAdmin.put(`${baseUrl}/update`, hairstylist);
        } catch (error) {
            console.error("Error updating hairstylist: ", error);
            throw error;
        }
    },

    // Xóa hairstylist theo ID
    delete: async (hairstylistId: number): Promise<void> => {
        try {
            await apiAdmin.delete(`${baseUrl}/delete/${hairstylistId}`);
        } catch (error) {
            console.error("Error deleting hairstylist: ", error);
            throw error;
        }
    }
};
