import { DistrictModel } from '../model/districts.model';  // Import model District
import { apiAdmin } from '../constant/apiAdmin';  // Sử dụng apiAdmin

// URL cơ bản cho district API
const baseUrl = '/api/Districts';

export const districtServices = {
    // Lấy tất cả districts
    getAll: async (): Promise<DistrictModel[]> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching districts: ", error);
            throw error;
        }
    },

    // Lấy district theo ID
    getById: async (districtId: number): Promise<DistrictModel> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-by-id/${districtId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching district by ID: ", error);
            throw error;
        }
    },

    // Tạo district mới
    create: async (district: DistrictModel): Promise<void> => {
        try {
            await apiAdmin.post(`${baseUrl}/create`, district);
        } catch (error) {
            console.error("Error creating district: ", error);
            throw error;
        }
    },

    // Cập nhật district
    update: async (district: DistrictModel): Promise<void> => {
        try {
            await apiAdmin.put(`${baseUrl}/update`, district);
        } catch (error) {
            console.error("Error updating district: ", error);
            throw error;
        }
    },

    // Xóa district theo ID
    delete: async (districtId: number): Promise<void> => {
        try {
            await apiAdmin.delete(`${baseUrl}/delete/${districtId}`);
        } catch (error) {
            console.error("Error deleting district: ", error);
            throw error;
        }
    }
};
